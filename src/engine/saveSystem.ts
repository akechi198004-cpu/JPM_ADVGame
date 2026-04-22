/**
 * 存档系统 (Save System)
 *
 * 负责将游戏状态序列化并保存到本地存储 (localStorage)，以及从中反序列化加载状态。
 */
import { GameState } from "./types";

// 用于在 localStorage 中存储存档的键名
const SAVE_KEY = "jin_ping_mei_save";

/**
 * 保存游戏状态到本地存储
 *
 * @param {GameState} state - 当前的游戏状态
 * @returns {boolean} 是否保存成功
 */
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

/**
 * 从本地存储加载游戏状态
 *
 * @returns {GameState | null} 成功时返回反序列化后的游戏状态对象，如果没有存档或出错则返回 null
 */
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
