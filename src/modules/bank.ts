import { observer } from "./observer";
import { elements, gameState } from "./config";
import { powerUps } from "./store";
import { round } from "./utils";

//TODO: any?
const totalBoosters: any[] = [];
const powerupBoosters: any[] = [];

export const init = () => {
  observer.subscribe("TICK", x);
};
export const withdraw = (amount: number): void => {
  gameState.emojis -= amount;
  memoization.invalid = true;
  transaction();
};
export const deposit = (amount: number): void => {
  gameState.emojis += amount;
  transaction();
};
function transaction(): void {
  updateEmojis();
  observer.publish("NEW_BALANCE", gameState.emojis);
}
function updateEmojis(): void {
  (elements.emojicount as HTMLElement).textContent = round(
    gameState.emojis,
    1,
    true
  ).toString();
}
export const addBooster = (type: string, callback: Function): void => {
  if (type === "totalBooster") {
    totalBoosters.push(callback);
  } else if (type === "powerupBooster") {
    powerupBoosters.push(callback);
  }
};
interface Accumulated {
  [key: string]: number;
}

function x(): void {
  if (memoization.invalid) {
    console.log("recalculating store");
    buildMemoizationStore();
  }

  deposit(memoization.total);
}

declare global {
  interface Window {
    memoization: {
      invalid: boolean;
      total: number;
      accumulated: Accumulated;
    };
  }
}

export const memoization: {
  invalid: boolean;
  total: number;
  accumulated: Accumulated;
} = {
  invalid: false,
  total: 0,
  accumulated: {},
};
window.memoization = memoization;
function appendToMemoizationCache(key: string, value: number): void {
  memoization.accumulated[key] += value;
}

function buildMemoizationStore() {
  let total = 0;
  //reset all memoization
  powerUps.forEach((el) => {
    memoization.accumulated[el.name] = 0;
  });
  powerUps.forEach((el) => {
    memoization.accumulated[el.name] += el.count * el.value;
  });

  powerupBoosters.forEach((cb) => {
    cb(total, powerUps, appendToMemoizationCache);
  });
  for (const property in memoization.accumulated) {
    total += memoization.accumulated[property];
  }
  totalBoosters.forEach((cb) => {
    total += cb(total, powerUps);
  });
  memoization.total = total / gameState.updatesPerSecond;
  memoization.invalid = false;
  observer.publish("CACHE_REVALIDATED", gameState.emojis);
}
