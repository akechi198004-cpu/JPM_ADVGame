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
        normal: "/assets/characters/char_5.png",
        smile: "/assets/characters/char_5.png",
      },
    },
    pan: {
      id: "pan",
      name: "潘金莲",
      color: "#880E4F", // Pink/Purple
      expressions: {
        normal: "/assets/characters/char_1.png",
        shy: "/assets/characters/char_1.png",
        shock: "/assets/characters/char_1.png",
      },
    },
    ping: {
      id: "ping",
      name: "李瓶儿",
      color: "#7B1FA2", // Purple
      expressions: {
        normal: "/assets/characters/char_2.png",
      },
    },
    chunmei: {
      id: "chunmei",
      name: "庞春梅",
      color: "#E65100", // Orange
      expressions: {
        normal: "/assets/characters/char_3.png",
      },
    },
    meng: {
      id: "meng",
      name: "孟玉楼",
      color: "#4E342E", // Brown
      expressions: {
        normal: "/assets/characters/char_4.png",
      },
    },
  },
  backgrounds: {
    street: {
      id: "street",
      name: "清河县大街 (Street)",
      url: "/assets/backgrounds/bg_1.png",
    },
    pharmacy: {
      id: "pharmacy",
      name: "生药铺 (Pharmacy)",
      url: "/assets/backgrounds/bg_2.png",
    },
    house_interior: {
      id: "house_interior",
      name: "金莲闺阁 (House)",
      url: "/assets/backgrounds/bg_3.png",
    },
    tavern: {
      id: "tavern",
      name: "酒楼 (Tavern)",
      url: "/assets/backgrounds/bg_4.png",
    },
    ending_bg: {
      id: "ending_bg",
      name: "结局幕布 (Ending Room)",
      url: "/assets/backgrounds/bg_5.png",
    },
    extra_bg: {
      id: "extra_bg",
      name: "附加场景 (Extra Scene)",
      url: "/assets/backgrounds/bg_6.png",
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
