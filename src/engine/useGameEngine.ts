/**
 * 游戏引擎主逻辑 (Game Engine Hook)
 *
 * 核心的 React Hook，用于管理整个交互叙事的状态机、剧本执行流、状态更新和存档读取。
 */
import { useState, useCallback, useEffect } from "react";
import { GameData, GameState, ScriptNode, Effect } from "./types";
import { evaluateConditions } from "./conditionEvaluator";
import {
  saveGame as saveGameToStorage,
  loadGame as loadGameFromStorage,
} from "./saveSystem";

/**
 * 根据静态游戏数据创建一个初始的游戏状态
 *
 * @param {GameData} data - 游戏的静态配置数据
 * @returns {GameState} 初始化的游戏状态
 */
function createInitialState(data: GameData): GameState {
  return {
    flags: {},
    vars: {},
    affinity: {},
    tasks: {},
    currentNodeId: data.startNodeId, // 从配置的起始节点开始
    currentBg: null,
    activeCharacters: {},
  };
}

/**
 * 核心游戏引擎 Hook
 *
 * @param {GameData} gameData - 包含剧本、角色、背景等在内的游戏静态数据
 */
export function useGameEngine(gameData: GameData) {
  // 维护游戏整体动态状态（受选项和特效影响）
  const [state, setState] = useState<GameState>(() =>
    createInitialState(gameData),
  );
  // 当前正在执行的脚本节点（如对话、选择）
  const [currentNode, setCurrentNode] = useState<ScriptNode | null>(null);

  /**
   * 应用选择产生的一系列副作用（修改状态变量）
   */
  const applyEffects = useCallback((effects: Effect[]) => {
    setState((prev) => {
      const nextState = { ...prev };
      nextState.flags = { ...prev.flags };
      nextState.vars = { ...prev.vars };
      nextState.affinity = { ...prev.affinity };
      nextState.tasks = { ...prev.tasks };

      for (const effect of effects) {
        if (effect.type === "setFlag") {
          nextState.flags[effect.key] = effect.value;
        } else if (effect.type === "setVar") {
          nextState.vars[effect.key] = effect.value;
        } else if (effect.type === "addAffinity") {
          nextState.affinity[effect.key] =
            (nextState.affinity[effect.key] || 0) + effect.value;
        } else if (effect.type === "setTaskState") {
          nextState.tasks[effect.key] = effect.value;
        }
      }
      return nextState;
    });
  }, []);

  /**
   * 引擎的主要推进逻辑
   * 处理从当前节点向下执行的过程，对于“瞬时节点”（如逻辑判断、显示人物、切换场景），引擎会连续执行直至遇到需要等待用户输入的节点（如对话、选择）。
   */
  const advance = useCallback(
    (nextNodeId?: string) => {
      let currentId = nextNodeId;
      let node: ScriptNode | undefined;
      let isInstant = true; // 标志是否还在连续执行瞬时节点

      // 在状态更新的闭包内同步处理一系列的瞬时节点
      setState((prev) => {
        let nextState = { ...prev };
        if (nextNodeId) nextState.currentNodeId = nextNodeId;

        currentId = nextState.currentNodeId;
        node = gameData.script[currentId];

        // 循环执行节点，直到遇到需要等待的节点或者结束
        while (node) {
          // 根据节点类型进行不同处理
          if (node.type === "scene") {
            // 场景切换
            nextState.currentBg = node.backgroundId;
            if (node.next) currentId = node.next;
            else {
              node = undefined;
              break;
            }
          } else if (node.type === "show") {
            // 显示或更新角色立绘
            nextState.activeCharacters = {
              ...nextState.activeCharacters,
              [node.characterId]: {
                characterId: node.characterId,
                expression: node.expression,
                position: node.position || "center",
              },
            };
            if (node.next) currentId = node.next;
            else {
              node = undefined;
              break;
            }
          } else if (node.type === "hide") {
            // 隐藏角色立绘
            const newChars = { ...nextState.activeCharacters };
            delete newChars[node.characterId];
            nextState.activeCharacters = newChars;
            if (node.next) currentId = node.next;
            else {
              node = undefined;
              break;
            }
          } else if (node.type === "task") {
            // 任务状态更新
            nextState.tasks = {
              ...nextState.tasks,
              [node.taskId]: node.taskState,
            };
            if (node.next) currentId = node.next;
            else {
              node = undefined;
              break;
            }
          } else if (node.type === "if") {
            // 逻辑条件判断分支
            const result = evaluateConditions(node.conditions, nextState);
            currentId = result ? node.trueNext : node.falseNext;
          } else {
            // 到达了需要等待玩家操作的节点 (如 say, narration, choice, end)
            isInstant = false;
            break; // 停止自动推进
          }
          nextState.currentNodeId = currentId;
          node = gameData.script[currentId];
        }

        // 保存推进后最终停留的节点 ID
        nextState.currentNodeId = currentId;
        return nextState;
      });
    },
    [gameData],
  );

  // 同步 currentNode 引用对象以供 UI 渲染使用
  useEffect(() => {
    setCurrentNode(gameData.script[state.currentNodeId] || null);
  }, [state.currentNodeId, gameData]);

  // 初始化：在组件挂载时从初始状态的节点开始执行
  useEffect(() => {
    // 只在挂载时执行一次
    advance(state.currentNodeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /**
   * 处理“下一步”点击事件（用于对话、旁白等）
   */
  const handleNext = useCallback(() => {
    if (!currentNode) return;
    if (currentNode.type === "say" || currentNode.type === "narration") {
      if (currentNode.next) advance(currentNode.next);
    }
  }, [currentNode, advance]);

  /**
   * 处理玩家做出的分支选择
   */
  const makeChoice = useCallback(
    (nextId: string, effects?: Effect[]) => {
      // 如果选项附带效果，则先应用效果修改状态
      if (effects) applyEffects(effects);
      // 推进到选项指向的下一个节点
      advance(nextId);
    },
    [advance, applyEffects],
  );

  /**
   * 触发存档操作
   */
  const saveConfig = useCallback(() => {
    saveGameToStorage(state);
  }, [state]);

  /**
   * 触发读档操作
   */
  const loadConfig = useCallback(() => {
    const loaded = loadGameFromStorage();
    if (loaded) {
      // 恢复保存的状态
      setState(loaded);
      // 等待下一次渲染周期后，触发 advance 解析当前节点（处理读取后直接就是瞬时节点的情况）
      setTimeout(() => advance(loaded.currentNodeId), 0);
    }
  }, [advance]);

  /**
   * 重置游戏到最初状态
   */
  const resetGame = useCallback(() => {
    const initial = createInitialState(gameData);
    setState(initial);
    // 等待下一次渲染周期后，重新从头推进
    setTimeout(() => advance(initial.currentNodeId), 0);
  }, [gameData, advance]);

  return {
    state,
    currentNode,
    handleNext,
    makeChoice,
    saveGame: saveConfig,
    loadGame: loadConfig,
    resetGame,
  };
}
