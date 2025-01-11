import { gameStore } from "../../stores/gameStore";
import { statsStore } from "../../stores/statsStore";
import { Config } from "./Config/Config";
import { observer } from "mobx-react";

export const SidePanel = observer(() => {
  const { currentSpeed, score } = gameStore;
  const { topScore } = statsStore;

  return (
    <div className="bg-surface p-4 rounded-lg min-w-[320px] w-[20%] overflow-auto">
      <div className="flex flex-wrap gap-1 text-lg">
        Score: {Math.floor(score)}
      </div>
      <div className="flex flex-wrap gap-1 text-lg">
        Top score: {Math.floor(topScore)}
      </div>
      <div className="flex flex-wrap gap-1 text-lg">
        Current speed: {currentSpeed} characters per minute
      </div>

      <Config />
    </div>
  );
});
