/**
 * 游戏引擎类型定义 (Game Engine Types)
 *
 * 包含所有用于状态、数据结构和脚本节点的 TypeScript 接口和类型定义。
 */

// 比较运算符
export type Operator = "==" | "!=" | ">" | ">=" | "<" | "<=";

// 游戏逻辑条件定义
export interface Condition {
  type: "flag" | "var" | "affinity"; // 条件类型（标记、变量、好感度）
  key: string;                       // 数据键名
  operator?: Operator;               // 操作符（可选）
  value?: any;                       // 用于比较的值
}

// 效果定义（修改状态）
export interface Effect {
  type: "setFlag" | "setVar" | "addAffinity" | "setTaskState"; // 效果类型
  key: string;                                                // 目标数据键名
  value: any;                                                 // 要设置的值或增量
}

// 脚本节点的种类枚举
export type NodeType =
  | "scene"      // 切换场景
  | "show"       // 显示角色立绘
  | "hide"       // 隐藏角色立绘
  | "say"        // 角色对话
  | "narration"  // 故事旁白
  | "choice"     // 玩家选择
  | "if"         // 条件分支
  | "task"       // 任务更新
  | "end";       // 结局

// 基础节点定义，所有剧本节点都继承此结构
export interface BaseNode {
  id: string;      // 节点唯一 ID
  type: NodeType;  // 节点类型
  next?: string;   // 下一节点 ID（可选）
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

// 游戏静态数据配置接口
export interface GameData {
  characters: Record<string, CharacterDef>; // 所有的角色定义
  backgrounds: Record<string, BackgroundDef>; // 所有的背景定义
  tasks: Record<string, TaskDef>;           // 所有的任务定义
  script: Record<string, ScriptNode>;       // 剧本节点字典
  startNodeId: string;                      // 游戏的起始节点 ID
}

// 游戏动态状态接口（会被存档系统保存）
export interface GameState {
  flags: Record<string, boolean>;            // 布尔类型的标记（如已触发事件）
  vars: Record<string, number | string>;     // 变量（如金钱，日期）
  affinity: Record<string, number>;          // 人物好感度
  tasks: Record<string, "active" | "completed" | "failed">; // 任务进度状态
  currentNodeId: string;                     // 当前停留的剧本节点 ID
  currentBg: string | null;                  // 当前背景 ID
  activeCharacters: Record<                  // 屏幕上目前活跃（显示）的角色信息
    string,
    {
      characterId: string;
      expression: string;
      position: "left" | "center" | "right";
    }
  >;
}
