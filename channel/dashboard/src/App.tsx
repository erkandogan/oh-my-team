import Sidebar from "@/components/Sidebar";
import TopBar from "@/components/TopBar";
import Workspace from "@/components/Workspace";
import CommandPalette from "@/components/CommandPalette";

export default function App() {
  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-hidden">
          <Workspace />
        </main>
      </div>
      <CommandPalette />
    </div>
  );
}
