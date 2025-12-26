import { useState, useRef } from "react";
import { Plus, LayoutGrid, Heart, Search as SearchIcon, Users, Home as HomeIcon } from "lucide-react";
import { Button } from "@/components/Common/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/Common/ui/dropdown-menu";
import { useDragSwap } from "@/hooks/useDragSwap";
import DeckColumn from "./DeckColumn";
import { v4 as uuidv4 } from 'uuid'; // We might need a unique ID generator, using random/date for now if lib not avail

export default function Deck() {
  // Initial columns
  const [columns, setColumns] = useState([
    { id: 'init-home', type: 'HOME', title: 'Home' }
  ]);

  const { getItemProps, getHandleProps, containerRef } = useDragSwap({
    items: columns,
    onReorder: setColumns,
    gap: 16, // gap-4 equivalent
    direction: "horizontal",
  });

  const addColumn = (type, title) => {
    const newColumn = {
      id: `col-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type,
      title
    };
    setColumns([...columns, newColumn]);
  };

  const removeColumn = (id) => {
    setColumns(columns.filter(col => col.id !== id));
  };

  return (
    <div className="bg-muted/20 flex h-screen w-full flex-col overflow-hidden">
        {/* Deck Header (Optional, maybe just a small bar or integrated) */}
        {/* User didn't ask for a global header, but we need a way to go back to main app potentially, or this is a standalone view. 
            The requirement says "ban đầu trang đấy chỉ có 1 trang Home...". 
            We assume it's a full page.
        */}
        
        {/* Horizontal Scroll Container */}
        <div className="flex h-full w-full overflow-x-auto overflow-y-hidden p-4">
            <div 
                ref={containerRef}
                className="flex h-full gap-4"
                style={{ width: 'max-content' }} // Ensure it expands
            >
                {columns.map((col) => (
                    <div 
                        key={col.id} 
                        {...getItemProps(col)}
                        className="h-full bg-transparent" // wrapper
                    >
                        <DeckColumn 
                            id={col.id}
                            type={col.type} 
                            title={col.title}
                            onRemove={removeColumn}
                            dragHandleProps={getHandleProps(col.id)}
                        />
                    </div>
                ))}

                {/* Add Column Button/Area */}
                <div className="flex h-full w-[100px] shrink-0 items-center justify-center">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" className="bg-background border-border flex h-full w-full flex-col gap-2 rounded-xl py-8 opacity-50 hover:opacity-100">
                                <Plus className="size-8" />
                                <span className="font-semibold">Add Column</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-56" align="start">
                            <DropdownMenuItem onClick={() => addColumn('HOME', 'Home')}>
                                <HomeIcon className="size-4" /> Home
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => addColumn('ACTIVITY', 'Activity')}>
                                <Heart className="size-4" /> Activity
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => addColumn('SEARCH', 'Search')}>
                                <SearchIcon className="size-4" /> Search
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => addColumn('FOLLOWING', 'Following')}>
                                <Users className="size-4" /> Following
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </div>
    </div>
  );
}
