import { Plus, MessageSquare } from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

export const ChatSidebar = () => {
  return (
    <aside className="hidden md:flex w-64 flex-col bg-sidebar border-r border-sidebar-border">
      <div className="p-3">
        <button className="w-full flex items-center gap-3 px-3 py-3 rounded-lg border border-sidebar-border hover:bg-sidebar-accent transition-colors text-sm text-sidebar-foreground">
          <Plus size={16} />
          New chat
        </button>
      </div>
      
      <div className="flex-1 overflow-y-auto px-3">
        <div className="text-xs text-muted-foreground px-3 py-2">Today</div>
        <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-sidebar-accent text-sidebar-accent-foreground text-sm">
          <MessageSquare size={16} />
          <span className="truncate">Let me ask for you...</span>
        </div>
      </div>
      
      <div className="p-3 border-t border-sidebar-border">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 px-3 py-2 text-sm text-sidebar-foreground">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-primary-foreground font-medium">
              U
            </div>
            <span>User</span>
          </div>
          <ThemeToggle />
        </div>
      </div>
    </aside>
  );
};
