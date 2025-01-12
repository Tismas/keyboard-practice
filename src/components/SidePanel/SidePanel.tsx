import { Tabs } from "../ui/Tabs";
import { Config } from "./Config/Config";
import { observer } from "mobx-react";
import { Stats } from "./Stats/Stats";

export const SidePanel = observer(() => {
  return (
    <div className="bg-surface p-4 rounded-lg min-w-[320px] w-[20%] overflow-auto">
      <Tabs
        tabs={[
          { title: "Config", children: <Config /> },
          { title: "Stats", children: <Stats /> },
        ]}
        defaultActive="Config"
      />
    </div>
  );
});
