import React, { useState } from "react";
import { GameState, GameData } from "../engine/types";

interface MenuProps {
  onSave: () => void;
  onLoad: () => void;
  onReset: () => void;
}

export function Menu({ onSave, onLoad, onReset }: MenuProps) {
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
