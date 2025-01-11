import { gameStore } from "../../stores/gameStore";
import { statsStore } from "../../stores/statsStore";
import { Config } from "./Config/Config";
import { observer } from "mobx-react";

export const SidePanel = observer(() => {
  const { currentSpeed } = gameStore;
  const { score, topScore, streakWithoutMistake, longestStreakWithoutMistake } =
    statsStore;

  return (
    <div className="bg-surface p-4 rounded-lg min-w-[320px] w-[20%] overflow-auto">
      <div className="flex flex-wrap gap-1 text-lg">
        Current speed: {Math.floor(currentSpeed)} characters per minute
      </div>
      <div className="flex flex-wrap gap-1 text-lg">
        Score: {Math.floor(score)}
      </div>
      <div className="flex flex-wrap gap-1 text-lg">
        Top score: {Math.floor(topScore)}
      </div>
      <div className="flex flex-wrap gap-1 text-lg">
        Streak without mistake: {Math.floor(streakWithoutMistake)}
      </div>
      <div className="flex flex-wrap gap-1 text-lg">
        Longest streak without mistake:{" "}
        {Math.floor(longestStreakWithoutMistake)}
      </div>

      <Config />
    </div>
  );
});
