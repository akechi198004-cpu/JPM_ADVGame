/**
 * 系统菜单组件 (Menu Component)
 *
 * 提供保存游戏、读取进度和重置游戏的系统级功能。
 */
import React, { useState } from "react";
import { GameState, GameData } from "../engine/types";

interface MenuProps {
  // 触发保存游戏的回调函数
  onSave: () => void;
  // 触发读取进度的回调函数
  onLoad: () => void;
  // 触发重置游戏的回调函数
  onReset: () => void;
}

/**
 * Menu 组件
 *
 * @param {MenuProps} props - 组件属性
 * @returns {JSX.Element} 渲染的系统菜单面板
 */
export function Menu({ onSave, onLoad, onReset }: MenuProps) {
  // 控制菜单展开/收起的状态
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="absolute top-4 right-4 z-[100]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-black/50 text-white px-4 py-2 rounded-t hover:bg-black/80 border border-yellow-700/50 backdrop-blur-sm"
      >
        系统菜单
      </button>

      {isOpen && (
        <div className="bg-black/80 backdrop-blur-sm border border-yellow-700/50 rounded-b rounded-l shadow-xl overflow-hidden flex flex-col w-32">
          <button
            onClick={() => {
              onSave();
              setIsOpen(false);
              alert("存档成功！");
            }}
            className="px-4 py-3 text-left text-white hover:bg-yellow-900/50 hover:text-yellow-400 transition-colors"
          >
            保存游戏
          </button>
          <button
            onClick={() => {
              onLoad();
              setIsOpen(false);
            }}
            className="px-4 py-3 text-left text-white hover:bg-yellow-900/50 hover:text-yellow-400 transition-colors"
          >
            读取进度
          </button>
          <button
            onClick={() => {
              if (confirm("确定要返回标题画面吗？未保存的进度将丢失。")) {
                onReset();
                setIsOpen(false);
              }
            }}
            className="px-4 py-3 text-left text-red-300 hover:bg-red-900/50 hover:text-red-100 transition-colors border-t border-yellow-700/20"
          >
            重置游戏
          </button>
        </div>
      )}
    </div>
  );
}
