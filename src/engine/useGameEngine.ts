import { useState, useCallback, useEffect } from "react";
import { GameData, GameState, ScriptNode, Effect } from "./types";
import { evaluateConditions } from "./conditionEvaluator";
import {
  saveGame as saveGameToStorage,
  loadGame as loadGameFromStorage,
} from "./saveSystem";

function createInitialState(data: GameData): GameState {
  return {
    flags: {},
    vars: {},
    affinity: {},
    tasks: {},
    currentNodeId: data.startNodeId,
    currentBg: null,
    activeCharacters: {},
  };
}

export function useGameEngine(gameData: GameData) {
  const [state, setState] = useState<GameState>(() =>
    createInitialState(gameData),
  );
  const [currentNode, setCurrentNode] = useState<ScriptNode | null>(null);

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

  // Main advancement logic
  const advance = useCallback(
    (nextNodeId?: string) => {
      let currentId = nextNodeId;
      let node: ScriptNode | undefined;
      let isInstant = true;

      // We process instant nodes synchronously in state updates
      setState((prev) => {
        let nextState = { ...prev };
        if (nextNodeId) nextState.currentNodeId = nextNodeId;

        currentId = nextState.currentNodeId;
        node = gameData.script[currentId];

        while (node) {
          // Evaluate based on type
          if (node.type === "scene") {
            nextState.currentBg = node.backgroundId;
            if (node.next) currentId = node.next;
            else {
              node = undefined;
              break;
            }
          } else if (node.type === "show") {
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
            const newChars = { ...nextState.activeCharacters };
            delete newChars[node.characterId];
            nextState.activeCharacters = newChars;
            if (node.next) currentId = node.next;
            else {
              node = undefined;
              break;
            }
          } else if (node.type === "task") {
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
            const result = evaluateConditions(node.conditions, nextState);
            currentId = result ? node.trueNext : node.falseNext;
          } else {
            // It's a wait node (say, narration, choice, end)
            isInstant = false;
            break;
          }
          nextState.currentNodeId = currentId;
          node = gameData.script[currentId];
        }

        nextState.currentNodeId = currentId;
        return nextState;
      });
    },
    [gameData],
  );

  // Synchronize currentNode with state.currentNodeId
  useEffect(() => {
    setCurrentNode(gameData.script[state.currentNodeId] || null);
  }, [state.currentNodeId, gameData]);

  // Initialization: start execution from startNodeId
  useEffect(() => {
    // Only init once on mount (advance from current state's node)
    advance(state.currentNodeId);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleNext = useCallback(() => {
    if (!currentNode) return;
    if (currentNode.type === "say" || currentNode.type === "narration") {
      if (currentNode.next) advance(currentNode.next);
    }
  }, [currentNode, advance]);

  const makeChoice = useCallback(
    (nextId: string, effects?: Effect[]) => {
      if (effects) applyEffects(effects);
      advance(nextId);
    },
    [advance, applyEffects],
  );

  const saveConfig = useCallback(() => {
    saveGameToStorage(state);
  }, [state]);

  const loadConfig = useCallback(() => {
    const loaded = loadGameFromStorage();
    if (loaded) {
      // Restore state
      setState(loaded);
      // Wait for next render then trigger advance to resolve instant nodes
      setTimeout(() => advance(loaded.currentNodeId), 0);
    }
  }, [advance]);

  const resetGame = useCallback(() => {
    const initial = createInitialState(gameData);
    setState(initial);
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
