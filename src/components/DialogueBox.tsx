/**
 * 对话框组件 (DialogueBox Component)
 *
 * 负责渲染人物对话或故事旁白，支持点击继续功能。
 */
import React from "react";

interface DialogueBoxProps {
  // 说话者的名称（可选，如果是旁白则没有）
  speakerName?: string;
  // 说话者的主题颜色（目前可能未使用在 UI 上，但为扩展预留）
  speakerColor?: string;
  // 要显示的文本内容
  text: string;
  // 点击对话框时触发的事件（通常是推进到下一句）
  onClick: () => void;
  // 是否为旁白（旁白没有说话者，且样式不同）
  isNarration?: boolean;
}

/**
 * DialogueBox 组件
 *
 * @param {DialogueBoxProps} props - 组件属性
 * @returns {JSX.Element} 渲染的对话框
 */
export function DialogueBox({
  speakerName,
  speakerColor,
  text,
  onClick,
  isNarration,
}: DialogueBoxProps) {
  return (
    <div
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 w-[90%] max-w-[900px] h-36 z-40 cursor-pointer"
      onClick={onClick}
    >
      {!isNarration && speakerName && (
        <div className="absolute -top-7 left-8 bg-[#3d0c0c] border-x border-t border-[#8b6e4e] px-8 py-1 z-10 w-fit">
          <span className="text-sm tracking-[0.2em] font-bold text-white">
            {speakerName}
          </span>
        </div>
      )}

      <div className="w-full h-full bg-[#1a1412]/95 border border-[#4a3728] p-8 flex flex-col justify-between shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
        <div
          className={`text-lg leading-relaxed tracking-wide ${isNarration ? "text-[#8b6e4e] italic text-center opacity-80" : "text-[#e2d5c5]"} font-serif`}
        >
          {text}
        </div>

        <div className="flex justify-end">
          <div className="w-3 h-3 bg-[#d4af37] rotate-45 animate-pulse mt-1"></div>
        </div>
      </div>
    </div>
  );
}
