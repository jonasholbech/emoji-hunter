import { deposit } from "./bank";
import { elements, gameState } from "./config";

export const init = () => {
  (elements.bigemoji as HTMLElement).addEventListener("click", () => {
    deposit(gameState.clickValue);
  });
};
