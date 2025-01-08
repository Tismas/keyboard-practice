import { Stat } from "./Stat";

export const Stats = () => {
  return (
    <>
      <h1 className="text-3xl mt-4 mb-2">Stats</h1>
      <Stat label="Current speed">0</Stat>
      <Stat label="Target maintained for">0s</Stat>
      <Stat label="Best typing speed today">0</Stat>
      <Stat label="Best typing speed all time">0</Stat>
    </>
  );
};
