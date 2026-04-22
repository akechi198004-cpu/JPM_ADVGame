/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { useGameEngine } from "./engine/useGameEngine";
import { gameData } from "./data/gameConfig";
import { GameStage } from "./components/GameStage";
import { DialogueBox } from "./components/DialogueBox";
import { ChoicePanel } from "./components/ChoicePanel";
import { TaskPanel } from "./components/TaskPanel";
import { Menu } from "./components/Menu";
import { SayNode, NarrationNode, ChoiceNode, EndNode } from "./engine/types";

export default function App() {
  const [appState, setAppState] = useState<'idle' | 'loading' | 'playing'>('idle');
  const [loadProgress, setLoadProgress] = useState(0);

  const {
    state,
    currentNode,
    handleNext,
    makeChoice,
    saveGame,
    loadGame,
    resetGame,
  } = useGameEngine(gameData);

  const startGame = () => {
    setAppState('loading');
    
    const urls: string[] = [];
    Object.values(gameData.backgrounds).forEach(bg => {
      if (bg?.url) urls.push(bg.url);
    });
    Object.values(gameData.characters).forEach(char => {
      if (char?.expressions) {
        Object.values(char.expressions).forEach(url => {
          if (url) urls.push(url);
        });
      }
    });
    
    const uniqueUrls = Array.from(new Set(urls));
    let loaded = 0;
    
    if (uniqueUrls.length === 0) {
      setAppState('playing');
      return;
    }

    uniqueUrls.forEach(url => {
      const img = new Image();
      img.onload = img.onerror = () => {
        loaded++;
        setLoadProgress(loaded / uniqueUrls.length);
        if (loaded === uniqueUrls.length) {
          setTimeout(() => setAppState('playing'), 400); // Smooth transition
        }
      };
      img.src = url;
    });
  };

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
        {/* App Views based on State */}
        {appState === 'idle' && (
          <div 
            className="absolute inset-0 z-50 bg-[#0a0807] cursor-pointer group"
            onClick={startGame}
          >
            {/* The beautiful image provided by the user. If missing, just black background. */}
            <div 
              className="absolute inset-0 bg-cover bg-center transition-transform duration-[20s] ease-out group-hover:scale-105"
              style={{ backgroundImage: "url('/assets/backgrounds/title_bg.png')" }}
            >
              {/* Optional: subtle scanline overlay or particle effect can go here in the future */}
            </div>

            {/* Fallback instruction text if image hasn't loaded yet. Since CSS backgroundImage won't throw an error to React directly, we put this behind the image using negative z-index so if image loads it completely covers this text. Note: since div has no bg color, if image fails, this text is visible! */}
            <div className="absolute inset-0 flex flex-col items-center justify-center -z-10 mix-blend-screen text-center px-4">
              <h1 className="text-4xl font-serif text-[#d4af37] mb-4 tracking-[0.2em] opacity-80">
                黑神话 · 潘金莲
              </h1>
              <p className="text-[#8b6e4e] tracking-widest text-sm mb-8 opacity-60">
                (请将您刚才的标题画面图上传至左侧 public/assets/backgrounds 目录，并命名为 title_bg.png)
              </p>
            </div>

            {/* Subtle invisible hover flash to provide click feedback */}
            <div className="absolute inset-0 bg-white opacity-0 transition-opacity duration-500 group-hover:opacity-5"></div>
          </div>
        )}

        {appState === 'loading' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0a0807] z-50">
            <h1 className="text-2xl font-serif text-[#d4af37] mb-16 tracking-[0.3em]">
              资源加载中
            </h1>
            <div className="w-1/2 max-w-md h-1.5 bg-[#1a1412] border border-[#4a3728] overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-[#8b6e4e] to-[#d4af37] transition-all duration-300" 
                style={{ width: `${Math.round(loadProgress * 100)}%` }} 
              />
            </div>
            <div className="mt-6 text-[#8b6e4e] text-sm tracking-widest font-mono">
              {Math.round(loadProgress * 100)}%
            </div>
          </div>
        )}

        {appState === 'playing' && (
          <>
            {/* Visual Stage */}
            <GameStage state={state} gameData={gameData} />

            {/* Task Indicators */}
            <TaskPanel state={state} gameData={gameData} />

            {/* System Menu */}
            <Menu onSave={saveGame} onLoad={loadGame} onReset={() => { resetGame(); setAppState('idle'); }} />

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
                  onClick={() => { resetGame(); setAppState('idle'); }}
                  className="px-8 py-3 bg-[#1a1412] border border-[#4a3728] text-[#8b6e4e] hover:bg-[#2a1e1a] hover:text-[#d4af37] transition-all text-sm tracking-widest"
                >
                  返回标题
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
