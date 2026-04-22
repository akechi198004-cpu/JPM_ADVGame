import { GameState } from "./types";

const SAVE_KEY = "jin_ping_mei_save";

export function saveGame(state: GameState) {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(SAVE_KEY, serialized);
    return true;
  } catch (err) {
    console.error("Failed to save game", err);
    return false;
  }
}

export function loadGame(): GameState | null {
  try {
    const serialized = localStorage.getItem(SAVE_KEY);
    if (!serialized) return null;
    return JSON.parse(serialized) as GameState;
  } catch (err) {
    console.error("Failed to load game", err);
    return null;
  }
}
