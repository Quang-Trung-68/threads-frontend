import { MemoryRouter, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { X, GripVertical, ArrowLeft } from "lucide-react";
import { Button } from "@/components/Common/ui/button";

// Import Pages
import Home from "@/pages/Home";
import Activity from "@/pages/Activity";
import Search from "@/pages/Search";
import Following from "@/pages/Following";
import PostDetail from "@/pages/PostDetail";
import UserProfile from "@/pages/UserProfile";

const COMPONENT_MAP = {
  HOME: Home,
  ACTIVITY: Activity,
  SEARCH: Search,
  FOLLOWING: Following,
};



export default function DeckColumn({ id, type, title, onRemove, dragHandleProps }) {
  const Component = COMPONENT_MAP[type] || Home;

  return (
    <div className="bg-background border-border relative flex h-full w-[420px] shrink-0 flex-col overflow-hidden rounded-xl border opacity-100 shadow-sm transition-opacity">
        {/* Header / Drag Handle Area */}
        {/* We overlay a drag handle on top or place it in a header */}
        <div className="bg-muted/30 border-b-border flex items-center justify-between border-b px-2 py-2">
            <div 
                {...dragHandleProps} 
                className="hover:bg-accent flex h-8 w-8 cursor-grab active:cursor-grabbing items-center justify-center rounded-md"
            >
                <GripVertical size={16} className="text-muted-foreground" />
            </div>
            
            <span className="text-sm font-semibold">{title}</span>

            <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={() => onRemove(id)}
            >
                <X size={16} className="text-muted-foreground" />
            </Button>
        </div>

      <div className="relative flex-1 overflow-hidden">
        <MemoryRouter initialEntries={["/"]}>
          <Routes>
            <Route path="/" element={<Component />} />
            {/* We pass isDeck=true to these components so they can adjust their UI if needed (e.g. hide their own headers if inconsistent, though plan says we keep them) */}
            {/* Actually, existing PostDetail has a back button logic dependent on window.history. 
                We might rely on our overlay DeckBackButton or let them handle it. 
                The plan was to modify them. Let's try passing the prop. 
            */}
            <Route path="/:username/post/:postId" element={<PostDetail isDeck={true} />} />
            <Route path="/:username" element={<UserProfile isDeck={true} />} />
          </Routes>
        </MemoryRouter>
      </div>
    </div>
  );
}
