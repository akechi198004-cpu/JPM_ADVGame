import { GameData, ScriptNode } from "../engine/types";
import chapter1 from "./chapter1.json";

// Placeholders for backgrounds and characters.
// We use placeholder images with appropriate text and colors.
export const gameData: GameData = {
  characters: {
    ximen: {
      id: "ximen",
      name: "西门庆",
      color: "#B71C1C", // Dark red
      expressions: {
        normal: "/assets/characters/char_5_green.png?v=14",
        smile: "/assets/characters/char_5_green.png?v=14",
      },
    },
    pan: {
      id: "pan",
      name: "潘金莲",
      color: "#880E4F", // Pink/Purple
      expressions: {
        normal: "/assets/characters/char_1_green.png?v=14",
        shy: "/assets/characters/char_1_green.png?v=14",
        shock: "/assets/characters/char_1_green.png?v=14",
      },
    },
    ping: {
      id: "ping",
      name: "李瓶儿",
      color: "#7B1FA2", // Purple
      expressions: {
        normal: "/assets/characters/char_2_green.png?v=14",
      },
    },
    chunmei: {
      id: "chunmei",
      name: "庞春梅",
      color: "#E65100", // Orange
      expressions: {
        normal: "/assets/characters/char_3_green.png?v=14",
      },
    },
    meng: {
      id: "meng",
      name: "孟玉楼",
      color: "#4E342E", // Brown
      expressions: {
        normal: "/assets/characters/char_4_green.png?v=14",
      },
    },
  },
  backgrounds: {
    hall_day: {
      id: "hall_day",
      name: "西门府大厅 (Hall Day)",
      url: "/assets/backgrounds/bg_hall_day.png?v=11",
    },
    hall_night: {
      id: "hall_night",
      name: "西门府大厅 (Hall Night)",
      url: "/assets/backgrounds/bg_hall_night.png?v=11",
    },
    bedroom_day: {
      id: "bedroom_day",
      name: "红纱卧房 (Bedroom Day)",
      url: "/assets/backgrounds/bg_bedroom_day.png?v=11",
    },
    bedroom_night: {
      id: "bedroom_night",
      name: "红纱卧房 (Bedroom Night)",
      url: "/assets/backgrounds/bg_bedroom_night.png?v=11",
    },
    garden_day: {
      id: "garden_day",
      name: "私家园林 (Garden Day)",
      url: "/assets/backgrounds/bg_garden_day.png?v=11",
    },
    garden_night: {
      id: "garden_night",
      name: "私家园林 (Garden Night)",
      url: "/assets/backgrounds/bg_garden_night.png?v=11",
    },
    street_day: {
      id: "street_day",
      name: "热闹大街 (Street Day)",
      url: "/assets/backgrounds/bg_street_day.png?v=11",
    },
    street_night: {
      id: "street_night",
      name: "灯火长街 (Street Night)",
      url: "/assets/backgrounds/bg_street_night.png?v=11",
    },
    dining_day: {
      id: "dining_day",
      name: "雅致厢房 (Dining Day)",
      url: "/assets/backgrounds/bg_dining_day.png?v=11",
    },
    dining_night: {
      id: "dining_night",
      name: "雅致厢房 (Dining Night)",
      url: "/assets/backgrounds/bg_dining_night.png?v=11",
    },
    courtyard_day: {
      id: "courtyard_day",
      name: "私苑 (Courtyard Day)",
      url: "/assets/backgrounds/bg_courtyard_day.png?v=11",
    },
    courtyard_night: {
      id: "courtyard_night",
      name: "月下庭院 (Courtyard Night)",
      url: "/assets/backgrounds/bg_courtyard_night.png?v=11",
    },
  },
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
  script: chapter1 as Record<string, ScriptNode>,
  startNodeId: "start",
};
