import { handleKeyDown } from "./game";

let eventListenersInitialized = false;
export const initializeEventListeners = (ctx: CanvasRenderingContext2D) => {
  if (eventListenersInitialized) return;

  window.addEventListener("resize", () => resize(ctx));
  window.addEventListener("keydown", handleKeyDown);
  eventListenersInitialized = true;
};

export const resize = (ctx: CanvasRenderingContext2D) => {
  const parent = ctx.canvas.parentElement;
  if (!parent) return;

  ctx.canvas.width = parent.clientWidth;
  ctx.canvas.height = parent.clientHeight;
};
