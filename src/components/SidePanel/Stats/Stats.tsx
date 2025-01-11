import { observer } from "mobx-react";
import { statsStore } from "../../../stores/statsStore";
import { Stat } from "./Stat";

export const Stats = observer(() => {
  const { topScore } = statsStore;

  return (
    <>
      <h1 className="text-3xl mt-4 mb-2">Stats</h1>
      <Stat label="Top score">{Math.floor(topScore)}</Stat>
    </>
  );
});
