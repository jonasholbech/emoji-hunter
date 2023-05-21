export const version = 0.1;

const updatesPerSecondLocal = 10;
export const gameState: {
  emojis: number;
  updatesPerSecond: number;
  framerate: number;
  clickValue: number;
} = {
  emojis: 0,
  updatesPerSecond: updatesPerSecondLocal,
  framerate: 1000 / updatesPerSecondLocal,
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
