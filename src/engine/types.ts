export type Operator = "==" | "!=" | ">" | ">=" | "<" | "<=";

export interface Condition {
  type: "flag" | "var" | "affinity";
  key: string;
  operator?: Operator;
  value?: any;
}

export interface Effect {
  type: "setFlag" | "setVar" | "addAffinity" | "setTaskState";
  key: string;
  value: any;
}

export type NodeType =
  | "scene"
  | "show"
  | "hide"
  | "say"
  | "narration"
  | "choice"
  | "if"
  | "task"
  | "end";

export interface BaseNode {
  id: string;
  type: NodeType;
  next?: string;
}

export interface SceneNode extends BaseNode {
  type: "scene";
  backgroundId: string;
}

export interface ShowNode extends BaseNode {
  type: "show";
  characterId: string;
  expression: string;
  position?: "left" | "center" | "right";
}

export interface HideNode extends BaseNode {
  type: "hide";
  characterId: string;
}

export interface SayNode extends BaseNode {
  type: "say";
  characterId: string;
  text: string;
}

export interface NarrationNode extends BaseNode {
  type: "narration";
  text: string;
}

export interface ChoiceOption {
  text: string;
  effects?: Effect[];
  next: string;
  conditions?: Condition[];
}

export interface ChoiceNode extends BaseNode {
  type: "choice";
  options: ChoiceOption[];
}

export interface IfNode extends BaseNode {
  type: "if";
  conditions: Condition[];
  trueNext: string;
  falseNext: string;
}

export interface TaskNode extends BaseNode {
  type: "task";
  taskId: string;
  taskState: "active" | "completed" | "failed";
}

export interface EndNode extends BaseNode {
  type: "end";
  endingId: string;
}

export type ScriptNode =
  | SceneNode
  | ShowNode
  | HideNode
  | SayNode
  | NarrationNode
  | ChoiceNode
  | IfNode
  | TaskNode
  | EndNode;

export interface CharacterDef {
  id: string;
  name: string;
  color: string;
  expressions: Record<string, string>;
}

export interface BackgroundDef {
  id: string;
  name: string;
  url: string;
}

export interface TaskDef {
  id: string;
  name: string;
  description: string;
}

export interface GameData {
  characters: Record<string, CharacterDef>;
  backgrounds: Record<string, BackgroundDef>;
  tasks: Record<string, TaskDef>;
  script: Record<string, ScriptNode>;
  startNodeId: string;
}

export interface GameState {
  flags: Record<string, boolean>;
  vars: Record<string, number | string>;
  affinity: Record<string, number>;
  tasks: Record<string, "active" | "completed" | "failed">;
  currentNodeId: string;
  currentBg: string | null;
  activeCharacters: Record<
    string,
    {
      characterId: string;
      expression: string;
      position: "left" | "center" | "right";
    }
  >;
}
