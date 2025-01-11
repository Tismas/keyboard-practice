import { useEffect, useRef } from "react";
import { useConfigStore } from "../../stores/configStore";
import { updateGameConfig } from "./game/main";

export const Display = () => {
  const targetSpeed = useConfigStore((state) => state.targetSpeed);
  const wordsPool = useConfigStore((state) => state.wordsPool);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const initialized = useRef(false);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;
    updateGameConfig(ctx, initialized.current, targetSpeed, wordsPool);

    initialized.current = true;
  }, [targetSpeed, wordsPool]);

  return (
    <div className="bg-surface rounded-lg flex-1 overflow-hidden">
      <canvas ref={canvasRef}></canvas>
    </div>
  );
};
