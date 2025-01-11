import { useEffect, useRef, useState } from "react";
import { observer } from "mobx-react";
import { gameStore } from "../../stores/gameStore";

export const Display = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameStarted, setGameStarted] = useState(false);

  const handleGameStart = () => {
    setGameStarted(true);
  };

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");
    if (!ctx) return;

    gameStore.start(ctx);
  }, [gameStarted]);

  return (
    <div className="bg-surface rounded-lg flex-1 overflow-hidden flex justify-center items-center">
      {gameStarted ? (
        <canvas ref={canvasRef}></canvas>
      ) : (
        <button
          className="bg-surfaceLighter p-4 rounded-lg hover:bg-background"
          onClick={handleGameStart}
        >
          Start game
        </button>
      )}
    </div>
  );
});
