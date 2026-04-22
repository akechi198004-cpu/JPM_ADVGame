/**
 * 选择面板组件 (ChoicePanel Component)
 *
 * 负责渲染供玩家选择的选项，并处理选择事件。
 */
import React from "react";
import { ChoiceOption } from "../engine/types";

interface ChoicePanelProps {
  // 供选择的选项列表
  options: ChoiceOption[];
  // 选择某个选项时的回调函数
  onSelect: (nextId: string, effects?: any[]) => void;
}

/**
 * ChoicePanel 组件
 *
 * @param {ChoicePanelProps} props - 组件属性
 * @returns {JSX.Element} 渲染的选择面板
 */
export function ChoicePanel({ options, onSelect }: ChoicePanelProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm z-50">
      <div className="flex flex-col gap-3 w-[400px]">
        {options.map((opt, index) => (
          <button
            key={index}
            onClick={() => onSelect(opt.next, opt.effects)}
            className="bg-[#1a1412]/90 border border-[#4a3728] py-3 px-6 text-sm text-[#e2d5c5] hover:bg-[#2a1e1a] transition-all text-center tracking-widest hover:border-[#8b6e4e] hover:shadow-[0_0_15px_rgba(139,110,78,0.2)] font-serif"
          >
            {opt.text}
          </button>
        ))}
      </div>
    </div>
  );
}
