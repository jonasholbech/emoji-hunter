import { observer } from "./observer";
import { elements, gameState } from "./config";
import { powerUps, PowerUp } from "./store";
import { withdraw, addBooster } from "./bank";
import { Upgrade } from "./types";

export const upgrades: Upgrade[] = [
  {
    //all upgrades with "mouse" are handles in "buy"
    id: 1,
    cost: 100,
    name: "Reinforced index finger",
    description: "The mouse and 👍 are <strong>twice</strong> as efficient",
    key: "👍",
    modifier: 2,
    type: "instant",
  },
  {
    id: 2,
    cost: 500,
    name: "Carpal tunnel prevention cream",
    description: "The mouse and 👍 are <strong>twice</strong> as efficient",
    key: "👍",
    modifier: 2,
    type: "instant",
  },
  {
    id: 3,
    cost: 1000,
    name: "Forwards from ❤️",
    description: "❤️ are <strong>twice</strong> as efficient",
    key: "❤️",
    modifier: 2,
    type: "instant",
  },
  {
    id: 4,
    cost: 5000,
    name: "Steel-plated rolling pins",
    description: "❤️ are <strong>twice</strong> as efficient",
    key: "❤️",
    modifier: 2,
    type: "instant",
  },
  {
    id: 5,
    cost: 10000,
    name: "Ambidextrous",
    description: "The mouse and 👍 are <strong>twice</strong> as efficient",
    key: "👍",
    modifier: 2,
    type: "instant",
  },
  {
    id: 6,
    cost: 11000,
    name: "Cheap Hoes",
    description: "💩 are <strong>twice</strong> as efficient",
    key: "💩",
    modifier: 2,
    type: "instant",
  },
  {
    id: 7,
    cost: 55000,
    name: "Dunno",
    description: "💩 are <strong>twice</strong> as efficient",
    key: "💩",
    modifier: 2,
    type: "instant",
  },
  {
    id: 8,
    cost: 50000,
    name: "Steel-plated rolling pins",
    description: "❤️ are <strong>twice</strong> as efficient",
    key: "❤️",
    modifier: 2,
    type: "instant",
  },
  {
    id: 9,
    cost: 55000,
    name: "Steel-plated rolling pins",
    description: "💩 gives +1%cps for each ❤️",
    key: "❤️",
    modifier: 2,
    type: "powerupBooster",
    callback: (_total: number, powerups: PowerUp[], cb: Function) => {
      const poop = powerups.find((pu: PowerUp) => pu.name === "💩");
      if (!poop) {
        if (!poop) {
          throw new ReferenceError("💩 not found.");
        }
      }
      const hearts = powerups.find((pu: PowerUp) => pu.name === "❤️");
      if (hearts?.count) {
        const boost = poop.count * poop.value * hearts.count * 0.01;
        cb("💩", boost);
      }
    },
  },
  {
    id: 10,
    //TODO: clicks er stadig ikke boostet
    cost: 100000,
    name: "Carpal tunnel prevention cream",
    description:
      "The mouse and 👍 gains +0.1 for each non cursor building owned",
    key: "👍",
    modifier: 1,
    type: "powerupBooster",
    callback: (_total: number, powerups: PowerUp[], cb: Function) => {
      let totalCount = 0;
      powerups.forEach((pu) => {
        if (pu.name !== "👍") {
          totalCount += pu.count;
        }
      });
      const boost = powerUps[0].count * totalCount * 0.1;
      cb("👍", boost);
    },
  },
  {
    id: 11,
    cost: 120000,
    name: "Dunno",
    description: "💩 are <strong>twice</strong> as efficient",
    key: "💩",
    modifier: 2,
    type: "instant",
  },
  {
    id: 12,
    cost: 600000,
    name: "Dunno",
    description: "💩 are <strong>twice</strong> as efficient",
    key: "💩",
    modifier: 2,
    type: "instant",
  },
  {
    id: 13,
    cost: 550000,
    name: "Dunno",
    description: "💩 are <strong>twice</strong> as efficient",
    key: "💩",
    modifier: 2,
    type: "instant",
  },
  {
    id: 14,
    cost: 600000,
    name: "Dunno",
    description: "🤗 are <strong>twice</strong> as efficient",
    key: "🤗",
    modifier: 2,
    type: "instant",
  },
  {
    id: 15,
    cost: 999999,
    name: "Dunno",
    description: "Emoji production multiplier <strong>+1%</strong>",
    key: "🤗",
    modifier: 1,
    type: "totalBooster",
    callback: (total: number, _powerups: PowerUp[]) => {
      return total * 0.01;
    },
  },
  {
    id: 16,
    cost: 1300000,
    name: "Dunno",
    description: "🔥 are <strong>twice</strong> as efficient",
    key: "🔥",
    modifier: 2,
    type: "instant",
  },
];

export const init = () => {
  observer.subscribe("NEW_BALANCE", update);
};
function update(total: number): void {
  if (!elements.upgrades) {
    throw new ReferenceError("elements.upgrades not found.");
  }

  upgrades.forEach((upgrade: Upgrade) => {
    const shownButtons =
      elements?.upgrades?.querySelectorAll("button").length || 0;

    let btn: HTMLButtonElement | null =
      elements?.upgrades?.querySelector(`button[data-id="${upgrade.id}"]`) ||
      null;

    if (!btn) {
      if (shownButtons < 4) {
        btn = document.createElement("button");
        btn.textContent = upgrade.key + " " + upgrade.cost;
        btn.dataset.id = upgrade.id.toString();
        btn.title = upgrade.description;
        btn.addEventListener("click", (): void => {
          //NOTE: har jeg råd? hvis jeg stoler på buttons disabled state er alt godt

          if (upgrade.key === "👍") {
            gameState.clickValue *= 2;
          }
          let index = powerUps.findIndex((pu) => pu.name === upgrade.key);
          powerUps[index].value *= upgrade.modifier;
          if (upgrade.type !== "instant" && upgrade.callback) {
            addBooster(upgrade.type, upgrade.callback);
          }
          let thisIndex = upgrades.findIndex((up) => up.id === upgrade.id);
          upgrades.splice(thisIndex, 1);

          elements.upgrades &&
            elements.upgrades.removeChild(btn as HTMLButtonElement);

          withdraw(upgrade.cost);
        });
        elements.upgrades && elements.upgrades.appendChild(btn);
      }
    }
    if (btn) {
      btn.disabled = total < upgrade.cost;
    }
  });
}
