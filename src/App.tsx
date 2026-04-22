/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { useGameEngine } from "./engine/useGameEngine";
import { gameData } from "./data/gameConfig";
import { GameStage } from "./components/GameStage";
import { DialogueBox } from "./components/DialogueBox";
import { ChoicePanel } from "./components/ChoicePanel";
import { TaskPanel } from "./components/TaskPanel";
import { Menu } from "./components/Menu";
import { SayNode, NarrationNode, ChoiceNode, EndNode } from "./engine/types";

export default function App() {
  const {
    state,
    currentNode,
    handleNext,
    makeChoice,
    saveGame,
    loadGame,
    resetGame,
  } = useGameEngine(gameData);

  // Derive dialogue box props
  let dialogueProps = null;
  let choiceProps = null;
  let isEnd = false;

  if (currentNode) {
    if (currentNode.type === "say") {
      const node = currentNode as SayNode;
      const charDef = gameData.characters[node.characterId];
      dialogueProps = {
        speakerName: charDef?.name || "Unknown",
        speakerColor: charDef?.color,
        text: node.text,
        isNarration: false,
      };
    } else if (currentNode.type === "narration") {
      const node = currentNode as NarrationNode;
      dialogueProps = {
        text: node.text,
        isNarration: true,
      };
    } else if (currentNode.type === "choice") {
      const node = currentNode as ChoiceNode;
      choiceProps = {
        options: node.options,
      };
    } else if (currentNode.type === "end") {
      isEnd = true;
    }
  }

  return (
    <div className="min-h-screen bg-[#0a0807] text-[#e2d5c5] font-serif relative overflow-hidden select-none flex items-center justify-center">
      <div className="absolute inset-0 bg-gradient-to-b from-[#2a211e] to-[#120f0d]">
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'radial-gradient(#4a3728 1px, transparent 1px)', backgroundSize: '24px 24px' }}></div>
      </div>
      
      {/* Top Decor Bar */}
      <div className="absolute top-0 left-0 w-full h-10 bg-[#1a1412] border-b border-[#4a3728] flex items-center justify-between px-6 text-[11px] uppercase tracking-[0.2em] z-[1]">
        <div className="flex gap-6">
          <span>金瓶梅：第一章</span>
          <span className="text-[#8b6e4e]">|</span>
          <span>清河县</span>
        </div>
      </div>

      {/* 16:9 container */}
      <div className="relative w-full max-w-7xl aspect-[16/9] bg-[#14100e] border border-[#4a3728] shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden z-10 m-4 mt-12">
        {/* Visual Stage */}
        <GameStage state={state} gameData={gameData} />

        {/* Task Indicators */}
        <TaskPanel state={state} gameData={gameData} />

        {/* System Menu */}
        <Menu onSave={saveGame} onLoad={loadGame} onReset={resetGame} />

        {/* Dialogue UI */}
        {dialogueProps && (
          <DialogueBox {...dialogueProps} onClick={handleNext} />
        )}

        {/* Choice UI */}
        {choiceProps && (
          <ChoicePanel options={choiceProps.options} onSelect={makeChoice} />
        )}

        {/* End Screen overlay if game is over */}
        {isEnd && (
          <div className="absolute inset-0 bg-[#0a0807]/95 flex flex-col items-center justify-center z-[100] backdrop-blur-sm">
            <h1 className="text-5xl font-serif text-[#d4af37] mb-8 tracking-[0.3em]">
              终 (Fin)
            </h1>
            <button
              onClick={resetGame}
              className="px-8 py-3 bg-[#1a1412] border border-[#4a3728] text-[#8b6e4e] hover:bg-[#2a1e1a] hover:text-[#d4af37] transition-all text-sm tracking-widest"
            >
              返回标题
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
