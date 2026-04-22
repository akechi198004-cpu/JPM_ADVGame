/**
 * 游戏静态数据配置 (Game Data Configuration)
 *
 * 包含所有角色、背景、任务的静态定义，以及引入的剧本节点（从 JSON 加载）。
 */
import { GameData, ScriptNode } from "../engine/types";
// 引入第一章的剧本数据
import chapter1 from "./chapter1.json";

// 导出整个游戏的静态配置数据，供游戏引擎使用
export const gameData: GameData = {
  // --- 角色定义 ---
  characters: {
    ximen: {
      id: "ximen",
      name: "西门庆",
      color: "#B71C1C", // Dark red
      expressions: {
        normal: "/assets/characters/char_5_green.png?v=10",
        smile: "/assets/characters/char_5_green.png?v=10",
      },
    },
    pan: {
      id: "pan",
      name: "潘金莲",
      color: "#880E4F", // Pink/Purple
      expressions: {
        normal: "/assets/characters/char_1_green.png?v=10",
        shy: "/assets/characters/char_1_green.png?v=10",
        shock: "/assets/characters/char_1_green.png?v=10",
      },
    },
    ping: {
      id: "ping",
      name: "李瓶儿",
      color: "#7B1FA2", // Purple
      expressions: {
        normal: "/assets/characters/char_2_green.png?v=10",
      },
    },
    chunmei: {
      id: "chunmei",
      name: "庞春梅",
      color: "#E65100", // Orange
      expressions: {
        normal: "/assets/characters/char_3_green.png?v=10",
      },
    },
    meng: {
      id: "meng",
      name: "孟玉楼",
      color: "#4E342E", // Brown
      expressions: {
        normal: "/assets/characters/char_4_green.png?v=10",
      },
    },
  },
  // --- 场景背景定义 ---
  backgrounds: {
    hall_day: {
      id: "hall_day",
      name: "西门府大厅 (Hall Day)",
      url: "/assets/backgrounds/bg_hall_day.png",
    },
    hall_night: {
      id: "hall_night",
      name: "西门府大厅 (Hall Night)",
      url: "/assets/backgrounds/bg_hall_night.png",
    },
    bedroom_day: {
      id: "bedroom_day",
      name: "红纱卧房 (Bedroom Day)",
      url: "/assets/backgrounds/bg_bedroom_day.png",
    },
    bedroom_night: {
      id: "bedroom_night",
      name: "红纱卧房 (Bedroom Night)",
      url: "/assets/backgrounds/bg_bedroom_night.png",
    },
    garden_day: {
      id: "garden_day",
      name: "私家园林 (Garden Day)",
      url: "/assets/backgrounds/bg_garden_day.png",
    },
    garden_night: {
      id: "garden_night",
      name: "私家园林 (Garden Night)",
      url: "/assets/backgrounds/bg_garden_night.png",
    },
    street_day: {
      id: "street_day",
      name: "热闹大街 (Street Day)",
      url: "/assets/backgrounds/bg_street_day.png",
    },
    street_night: {
      id: "street_night",
      name: "灯火长街 (Street Night)",
      url: "/assets/backgrounds/bg_street_night.png",
    },
    dining_day: {
      id: "dining_day",
      name: "雅致厢房 (Dining Day)",
      url: "/assets/backgrounds/bg_dining_day.png",
    },
    dining_night: {
      id: "dining_night",
      name: "雅致厢房 (Dining Night)",
      url: "/assets/backgrounds/bg_dining_night.png",
    },
    courtyard_day: {
      id: "courtyard_day",
      name: "私苑 (Courtyard Day)",
      url: "/assets/backgrounds/bg_courtyard_day.png",
    },
    courtyard_night: {
      id: "courtyard_night",
      name: "月下庭院 (Courtyard Night)",
      url: "/assets/backgrounds/bg_courtyard_night.png",
    },
  },
  // --- 任务定义 ---
  tasks: {
    task_meet_pan: {
      id: "task_meet_pan",
      name: "邂逅佳人",
      description: "在清河县大街闲逛，也许会有意想不到的奇遇。",
    },
    task_invite: {
      id: "task_invite",
      name: "入府一叙",
      description: "潘金莲邀请你入府喝茶，或许能结识府上其他姐妹。",
    },
  },
  // --- 剧本数据 ---
  // 将导入的 chapter1 JSON 断言为引擎所需的剧本节点结构
  script: chapter1 as Record<string, ScriptNode>,
  // 剧本的入口节点 ID
  startNodeId: "start",
};
