import { gameStore } from "../../stores/gameStore";
import { Config } from "./Config/Config";
import { observer } from "mobx-react";
import { Stats } from "./Stats/Stats";

export const SidePanel = observer(() => {
  const { currentSpeed, score } = gameStore;

  return (
    <div className="bg-surface p-4 rounded-lg min-w-[320px] w-[20%] overflow-auto">
      <div className="flex flex-wrap gap-1 text-lg">
        Score: {Math.floor(score)}
      </div>
      <div className="flex flex-wrap gap-1 text-lg">
        Current speed: {currentSpeed} characters per minute
      </div>

      <Config />
      <Stats />
    </div>
  );
});
