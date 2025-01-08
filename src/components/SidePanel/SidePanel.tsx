import { Config } from "./Config/Config";
import { Stats } from "./Stats/Stats";

export const SidePanel = () => {
  return (
    <div className="bg-surface p-4 rounded-lg min-w-[320px] w-[20%]">
      <Config />
      <Stats />
    </div>
  );
};
