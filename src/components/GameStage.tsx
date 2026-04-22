import React from "react";
import { GameData, GameState } from "../engine/types";

interface GameStageProps {
  state: GameState;
  gameData: GameData;
}

export function GameStage({ state, gameData }: GameStageProps) {
  const bg = state.currentBg ? gameData.backgrounds[state.currentBg] : null;

  return (
    <div className="absolute inset-0 overflow-hidden bg-black flex items-end justify-center">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-1000 opacity-90"
        style={{
          backgroundImage: bg ? `url(${bg.url})` : "none",
        }}
      ></div>

      {/* Characters */}
      <div className="relative w-full h-full flex justify-center items-end px-20 z-20">
        {Object.values(state.activeCharacters).map((charState) => {
          const charDef = gameData.characters[charState.characterId];
          if (!charDef) return null;

          const imgUrl =
            charDef.expressions[charState.expression] ||
            charDef.expressions["normal"];

          let positionStyle: React.CSSProperties = { left: "50%", transform: "translateX(-75%)" };
          if (charState.position === "left") {
            positionStyle = { left: "25%", transform: "translateX(-75%)" };
          } else if (charState.position === "right") {
            positionStyle = { left: "75%", transform: "translateX(-75%)" };
          }

          return (
            <div
              key={charState.characterId}
              className="absolute bottom-0 transition-all duration-500 z-20 pointer-events-none"
              style={positionStyle}
            >
              <img
                src={imgUrl}
                alt={charDef.name}
                className="max-h-[68vh] max-w-none object-contain drop-shadow-[0_10px_35px_rgba(0,0,0,0.5)]"
                style={{ 
                  clipPath: "inset(0 0 0 50%)",
                  WebkitMaskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)",
                  maskImage: "linear-gradient(to bottom, rgba(0,0,0,1) 85%, rgba(0,0,0,0) 100%)"
                }}
              />
            </div>
          );
        })}
      </div>
      
      {/* Stage bottom gradient for blending */}
      <div className="absolute bottom-0 left-0 w-full h-[40%] bg-gradient-to-t from-[#0a0807] to-transparent pointer-events-none z-30"></div>
    </div>
  );
}
