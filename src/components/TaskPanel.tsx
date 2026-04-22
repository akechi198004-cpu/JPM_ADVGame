/**
 * 任务面板组件 (TaskPanel Component)
 *
 * 负责在 UI 上渲染当前激活状态的任务列表。
 */
import React from "react";
import { GameState, GameData } from "../engine/types";

interface TaskPanelProps {
  // 当前游戏状态，包含任务状态
  state: GameState;
  // 游戏静态数据，包含任务的定义
  gameData: GameData;
}

/**
 * TaskPanel 组件
 *
 * @param {TaskPanelProps} props - 组件属性
 * @returns {JSX.Element | null} 渲染的任务面板，如果没有激活任务则返回 null
 */
export function TaskPanel({ state, gameData }: TaskPanelProps) {
  // 过滤并映射出所有状态为 "active"（激活）的任务
  const activeTasks = Object.entries(state.tasks)
    .filter(([_, status]) => status === "active")
    .map(([taskId, _]) => gameData.tasks[taskId]);

  // BUG: gameData.tasks[taskId] 可能为 undefined（如果在脚本中设置了任务但在数据配置中忘记定义）。
  // 建议在这里加一个过滤以过滤掉 undefined 的项，或者确保数据绝对安全。

  // 如果没有激活的任务，不渲染任何内容
  if (activeTasks.length === 0) return null;

  return (
    <div className="absolute top-6 right-6 w-56 flex flex-col gap-4 z-40 pointer-events-none">
      <div className="bg-[#1a1412]/90 border border-[#4a3728] p-4 text-[#e2d5c5]">
        <div className="text-[10px] tracking-widest text-[#8b6e4e] uppercase mb-3 border-b border-[#4a3728] pb-1">
          当前任务 ({activeTasks.length})
        </div>
        <ul className="text-[11px] space-y-3 leading-relaxed">
          {activeTasks.map((task) => (
            <li key={task.id} className="flex gap-2 items-start">
              <span className="text-[#d4af37] mt-[2px]">●</span>
              <div className="flex flex-col">
                <span className="font-bold">{task.name}</span>
                <span className="opacity-60 text-[10px]">{task.description}</span>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
