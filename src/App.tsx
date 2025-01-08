import { Display } from "./components/Display/Display";
import { SidePanel } from "./components/SidePanel/SidePanel";

export const App = () => {
  return (
    <main className="bg-background text-foreground w-[100vw] h-[100vh] p-4 flex gap-4">
      <Display />
      <SidePanel />
    </main>
  );
};
