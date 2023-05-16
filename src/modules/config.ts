export const version = 0.1;

export const gameState: {
  emojis: number;
  updatesPerSecond: number;
  framerate: number;
  clickValue: number;
} = {
  emojis: 100000000,
  updatesPerSecond: 10,
  framerate: 1000 / 10, //TODO: not DRY
  clickValue: 1,
};
export const elements: {
  bigemoji: HTMLDivElement | null;
  emojicount: HTMLDivElement | null;
  upgrades: HTMLDivElement | null;
  powerups: HTMLDivElement | null;
  emojilist: HTMLElement | null;
} = {
  bigemoji: document.querySelector("#bigemoji"),
  emojicount: document.querySelector("#emojicount"),
  upgrades: document.querySelector("#upgrades"),
  powerups: document.querySelector("#powerups"),
  emojilist: document.querySelector("#emojilist ul"),
};
