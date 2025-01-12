import { ReactNode, useState } from "react";

interface Tab<T extends string> {
  title: T;
  children: ReactNode;
}

interface Props<T extends string, U extends T> {
  tabs: Tab<T>[];
  defaultActive?: U;
}

export const Tabs = <T extends string, U extends T>({
  tabs,
  defaultActive,
}: Props<T, U>) => {
  const [activeTab, setActiveTab] = useState(defaultActive || tabs[0].title);
  const activeTabContent = tabs.find(
    (tab) => tab.title === activeTab
  )?.children;

  return (
    <>
      <div className="flex bg-background p-2 rounded-lg">
        {tabs.map((tab) => (
          <button
            key={tab.title}
            className={`py-2 px-4 hover:text-foreground-lighter ${
              activeTab === tab.title ? "bg-surface rounded-lg" : ""
            }`}
            onClick={() => setActiveTab(tab.title)}
          >
            {tab.title}
          </button>
        ))}
      </div>
      {activeTabContent}
    </>
  );
};
