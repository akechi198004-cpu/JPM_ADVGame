/**
 * 条件评估器 (Condition Evaluator)
 *
 * 负责评估剧本中的逻辑条件（如 `if` 节点或选项的显示条件），判断它们是否满足当前游戏状态。
 */
import { Condition, GameState } from "./types";

/**
 * 评估一组条件是否全部满足当前状态 (AND 逻辑)
 *
 * @param {Condition[]} conditions - 需要评估的条件数组
 * @param {GameState} state - 游戏当前状态
 * @returns {boolean} 如果没有条件或者所有条件都满足返回 true，否则返回 false
 */
export function evaluateConditions(
  conditions: Condition[],
  state: GameState,
): boolean {
  // 如果没有条件，默认认为是满足的
  if (!conditions || conditions.length === 0) return true;

  for (const cond of conditions) {
    let actualValue: any;

    if (cond.type === "flag") {
      actualValue = state.flags[cond.key] || false;
    } else if (cond.type === "var") {
      actualValue = state.vars[cond.key] || 0;
    } else if (cond.type === "affinity") {
      actualValue = state.affinity[cond.key] || 0;
    }

    // 执行运算符比较
    if (cond.operator === "==") {
      if (actualValue != cond.value) return false;
    } else if (cond.operator === "!=") {
      if (actualValue == cond.value) return false;
    } else if (cond.operator === ">") {
      if (actualValue <= cond.value) return false; // 注意：要求 >，所以 <= 时失败
    } else if (cond.operator === ">=") {
      if (actualValue < cond.value) return false;
    } else if (cond.operator === "<") {
      if (actualValue >= cond.value) return false;
    } else if (cond.operator === "<=") {
      if (actualValue > cond.value) return false;
    } else if (!cond.operator && cond.type === "flag") {
      // 默认情况：如果是 flag 类型且没有提供运算符，检查该标志是否为 true
      if (!actualValue) return false;
    }
  }

  // 如果所有条件都通过，则返回 true
  return true;
}
