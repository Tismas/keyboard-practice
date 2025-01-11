import { initializeEventListeners, resize } from "./events";
import { updateGame } from "./game";

export const updateGameConfig = (
  ctx: CanvasRenderingContext2D,
  initialized: boolean,
  targetSpeed: number,
  wordsPool: string[]
) => {
  initializeEventListeners(ctx);
  resize(ctx);
  updateGame(ctx, initialized, targetSpeed, wordsPool);
};
