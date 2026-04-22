import { Condition, GameState } from "./types";

export function evaluateConditions(
  conditions: Condition[],
  state: GameState,
): boolean {
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

    if (cond.operator === "==") {
      if (actualValue != cond.value) return false;
    } else if (cond.operator === "!=") {
      if (actualValue == cond.value) return false;
    } else if (cond.operator === ">") {
      if (actualValue <= cond.value) return false;
    } else if (cond.operator === ">=") {
      if (actualValue < cond.value) return false;
    } else if (cond.operator === "<") {
      if (actualValue >= cond.value) return false;
    } else if (cond.operator === "<=") {
      if (actualValue > cond.value) return false;
    } else if (!cond.operator && cond.type === "flag") {
      // Default to checking if flag is true if no operator
      if (!actualValue) return false;
    }
  }

  return true;
}
