import { observer } from "mobx-react";
import { gameStore } from "../../../stores/gameStore";
import { statsStore } from "../../../stores/statsStore";
import { PropsWithChildren } from "react";

interface StatProps {
  label: string;
}

const Stat = ({ label, children }: PropsWithChildren<StatProps>) => {
  return (
    <div className="flex justify-between text-lg">
      <span className="text-foreground-lighter">{label}:</span>{" "}
      <span>{children}</span>
    </div>
  );
};

const Divider = () => {
  return <div className="my-4"></div>;
};

export const Stats = observer(() => {
  const { currentSpeed } = gameStore;
  const { score, topScore, streakWithoutMistake, longestStreakWithoutMistake } =
    statsStore;

  const worstCharacters = statsStore.getWorstCharacters();
  const bestCharacters = statsStore.getBestCharacters();

  return (
    <>
      <h1 className="text-3xl mt-4 mb-2">Stats</h1>
      <Stat label="Current speed">
        {Math.floor(currentSpeed)} characters per minute
      </Stat>

      <Divider />

      <Stat label="Score">{Math.floor(score)}</Stat>
      <Stat label="Top score">{Math.floor(topScore)}</Stat>

      <Divider />

      <Stat label="Streak without mistake">
        {Math.floor(streakWithoutMistake)}
      </Stat>
      <Stat label="Longest streak without mistake">
        {Math.floor(longestStreakWithoutMistake)}
      </Stat>

      <Divider />

      {bestCharacters.length > 0 ? (
        <>
          <h3 className="text-xl mt-4 mb-2">Best characters</h3>
          {bestCharacters.map(({ correctPercentage, character }) => (
            <Stat key={character} label={character}>
              {Math.round(correctPercentage)}%
            </Stat>
          ))}
        </>
      ) : null}

      {worstCharacters.length > 0 ? (
        <>
          <h3 className="text-xl mt-4 mb-2">Worst characters</h3>
          {worstCharacters.map(({ correctPercentage, character }) => (
            <Stat key={character} label={character}>
              {Math.round(correctPercentage)}%
            </Stat>
          ))}
        </>
      ) : null}
    </>
  );
});
