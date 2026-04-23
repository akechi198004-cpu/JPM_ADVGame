import React from "react";
import { GameState, GameData } from "../engine/types";

interface TaskPanelProps {
  state: GameState;
  gameData: GameData;
}

export function TaskPanel({ state, gameData }: TaskPanelProps) {
  const activeTasks = Object.entries(state.tasks)
    .filter(([_, status]) => status === "active")
    .map(([taskId, _]) => gameData.tasks[taskId]);

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
