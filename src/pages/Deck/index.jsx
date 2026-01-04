import React, { useState, useCallback, useMemo } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragOverlay,
  defaultDropAnimationSideEffects,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/Common/ui/dropdown-menu";
import { Button } from "@/components/Common/ui/button";
import { Grid2X2Plus } from "lucide-react";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

// --- IMPORT CÁC PAGE CỦA BẠN ---
// TODO: Thay đổi đường dẫn import cho phù hợp với cấu trúc project của bạn
import Home from "@pages/Home";
import PostDetail from "@pages/PostDetail";
import UserProfile from "@pages/UserProfile";
import Search from "@pages/Search";
import Activity from "@/pages/Activity";
import Following from "@/pages/Following";
import GhostPosts from "@/pages/GhostPosts";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router";
import { Tooltip } from "@/components/Common/Tooltip";
// ... các page khác

// --- PLACEHOLDER COMPONENTS (XÓA KHI ĐÃ IMPORT ĐÚNG) ---
// const Posts = ({ onNavigate, state }) => (
//   <div>
//     <h3 className="mb-4 text-lg font-bold">📝 Posts</h3>
//     {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].map((id) => (
//       <div
//         key={id}
//         className="mb-3 cursor-pointer rounded border p-3 hover:bg-gray-50"
//         onClick={() => onNavigate("PostDetail", { postId: id })}
//       >
//         <h4 className="font-semibold">Post Title {id}</h4>
//         <p className="text-sm text-gray-600">Click to view detail...</p>
//       </div>
//     ))}
//   </div>
// );

// const PostDetail = ({ onNavigate, state }) => (
//   <div>
//     <button
//       onClick={() => onNavigate("Posts")}
//       className="mb-4 text-sm text-blue-600 hover:underline"
//     >
//       ← Back to Posts
//     </button>
//     <h3 className="mb-4 text-lg font-bold">📄 Post Detail #{state?.postId}</h3>
//     <div className="mb-4 rounded border p-3">
//       <p className="mb-2">Post content here...</p>
//       <p className="text-sm text-gray-600">Author: John Doe</p>
//     </div>
//     <button
//       onClick={() =>
//         onNavigate("UserProfile", { userId: 123, userName: "John Doe" })
//       }
//       className="rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
//     >
//       View Author Profile
//     </button>
//   </div>
// );

// const UserProfile = ({ onNavigate, state }) => (
//   <div>
//     <h3 className="mb-4 text-lg font-bold">👤 User Profile</h3>
//     {state && (
//       <div className="mb-4 rounded border border-blue-200 bg-blue-50 p-3">
//         <p className="font-semibold">User ID: {state.userId}</p>
//         <p className="font-semibold">Name: {state.userName}</p>
//       </div>
//     )}
//     <div className="space-y-2">
//       <p>
//         Email: {state?.userName?.toLowerCase().replace(" ", ".")}@example.com
//       </p>
//       <p>Bio: Software developer and content creator</p>
//     </div>
//     <button
//       onClick={() => onNavigate("Posts")}
//       className="mt-4 rounded bg-gray-500 px-4 py-2 text-white hover:bg-gray-600"
//     >
//       View Posts
//     </button>
//   </div>
// );

// const Search = ({ onNavigate, state }) => (
//   <div>
//     <h3 className="mb-4 text-lg font-bold">🔍 Search</h3>
//     <input
//       type="text"
//       placeholder="Search..."
//       className="mb-4 w-full rounded border px-3 py-2"
//     />
//     <div className="space-y-2">
//       {[1, 2, 3].map((id) => (
//         <div
//           key={id}
//           className="cursor-pointer rounded border p-2 hover:bg-gray-50"
//           onClick={() => onNavigate("PostDetail", { postId: id + 100 })}
//         >
//           Search Result {id}
//         </div>
//       ))}
//     </div>
//   </div>
// );
// --- END PLACEHOLDER COMPONENTS ---

// --- 1. CONFIG & UTILS ---
// Định nghĩa các loại column và component khởi tạo của chúng
const COLUMN_TYPES = [
  {
    type: "home",
    label: "📝 Home",
    initialComponent: "Home",
  },
  {
    type: "following",
    label: "📝 Following",
    initialComponent: "Following",
  },
  {
    type: "ghostPosts",
    label: "📝 Ghost posts",
    initialComponent: "GhostPosts",
  },
  {
    type: "search",
    label: "🔍 Search",
    initialComponent: "Search",
  },
  {
    type: "activity",
    label: "🔍 Activity",
    initialComponent: "Activity",
  },
  {
    type: "profile",
    label: "👤 Profile",
    initialComponent: "UserProfile",
  },
];

// Registry chứa TẤT CẢ các component có thể render
// Mỗi column có thể navigate đến bất kỳ component nào trong registry này
const COMPONENT_REGISTRY = {
  Home: Home,
  PostDetail,
  UserProfile,
  Search,
  Activity,
  Following,
  GhostPosts,
  // Thêm các component khác ở đây
};

const generateId = () =>
  `col-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// --- 2. COLUMN CONTENT (CHỈ RENDER NỘI DUNG) ---
const InnerColumnContent = React.memo(
  ({
    type,
    idColumn,
    navigation,
    onNavigate,
    dragHandleProps,
    onRemoveColumn,
    canRemove,
  }) => {
    const current = navigation.history[navigation.currentIndex];
    const currentComponentName = current.componentName;
    const currentState = current.state;

    const handleNavigate = useCallback(
      (componentName, state = null) => {
        onNavigate("push", componentName, state);
      },
      [onNavigate],
    );

    // Lấy component từ registry
    const CurrentComponent = COMPONENT_REGISTRY[currentComponentName];

    return (
      <div className="flex h-full flex-col bg-white">
        {/* Content Area - Render Component động */}
        <SimpleBar className="h-screen max-w-160 min-w-105 flex-1">
          <div>
            {CurrentComponent ? (
              <CurrentComponent
                idColumn={idColumn}
                type={type}
                onNavigate={handleNavigate}
                state={currentState}
                navigation={navigation}
                dragHandleProps={dragHandleProps}
                onRemoveColumn={onRemoveColumn}
                canRemove={canRemove}
              />
            ) : (
              <div className="text-center text-red-600">
                <h3 className="text-lg font-bold">⚠️ Component not found</h3>
                <p className="mt-2 text-sm">
                  Component "{currentComponentName}" không tồn tại
                </p>
                <button
                  onClick={() => handleNavigate("Home")}
                  className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-600"
                >
                  Go to Home
                </button>
              </div>
            )}
          </div>
        </SimpleBar>
      </div>
    );
  },
);

// --- 3. SORTABLE COLUMN COMPONENT ---
const SortableColumn = React.memo(
  ({
    id,
    type,
    index,
    navigation,
    onNavigate,
    onRemove,
    isOverlay = false,
  }) => {
    const {
      attributes,
      listeners,
      setNodeRef,
      transform,
      transition,
      isDragging,
    } = useSortable({ id: id, disabled: isOverlay });

    const style = {
      transform: CSS.Transform.toString(transform),
      transition: isDragging ? "none" : transition,
      zIndex: isDragging ? 50 : "auto",
      opacity: isDragging ? 0.3 : 1,
      willChange: "transform",
    };

    const overlayStyle = {
      zIndex: 100,
      opacity: 0.9,
      cursor: "grabbing",
    };

    const canRemove = index !== 0;

    const dragHandleProps = {
      attributes,
      listeners,
    };

    return (
      <div
        ref={setNodeRef}
        style={isOverlay ? overlayStyle : style}
        className={`relative flex h-full max-w-160 min-w-105 flex-col overflow-hidden bg-[#fafafa] ${
          !isOverlay && isDragging ? "" : "shadow-md"
        }`}
      >
        <div className="relative flex-1 bg-[#fafafa]">
          <InnerColumnContent
            navigation={navigation}
            onNavigate={(action, componentName, state) =>
              onNavigate(id, action, componentName, state)
            }
            canRemove={canRemove}
            onRemoveColumn={() => onRemove(id)}
            dragHandleProps={dragHandleProps}
            type={type}
          />
        </div>
      </div>
    );
  },
);

// --- 4. COMPONENT NÚT THÊM (+) & MENU ---
const AddColumnButton = ({ onAdd }) => {
  const { t } = useTranslation(["common"]);

  return (
    <DropdownMenu modal={false}>
      <DropdownMenuTrigger asChild>
        <span className="size-4">
          <Button
            variant="outline"
            size="icon"
            className="h-8 w-8 cursor-pointer rounded-full border-2 border-gray-300 text-gray-300 hover:border-black hover:text-black"
          >
            <Grid2X2Plus className="size-4" />
          </Button>
        </span>
      </DropdownMenuTrigger>
      <DropdownMenuContent className={"w-fit rounded-3xl border-2 p-2"}>
        <DropdownMenuGroup>
          <DropdownMenuItem
            className={"w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"}
            onClick={() => onAdd("search")}
          >
            {t("common:search")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className={"w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"}
            onClick={() => onAdd("activity")}
          >
            {t("common:activity")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className={"w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"}
            onClick={() => onAdd("profile")}
          >
            {t("common:profile")}
          </DropdownMenuItem>
          <DropdownMenuItem
            className={"w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"}
          >
            {t("common:insights")}
          </DropdownMenuItem>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              className={
                "w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
            >
              {t("common:feeds")}
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent>
                <DropdownMenuItem
                  className={
                    "w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
                  }
                  onClick={() => onAdd("home")}
                >
                  {t("common:forYou")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={
                    "w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
                  }
                  onClick={() => onAdd("following")}
                >
                  {t("common:following")}
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={
                    "w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
                  }
                  onClick={() => onAdd("ghostPosts")}
                >
                  {t("common:ghostPosts")}
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// --- 5. COMPONENT CHÍNH (APP) ---
export default function Deck() {
  const { t } = useTranslation(["tooltip"]);

  const location = useLocation();
  const pageType = location?.state?.pageType ?? "activity";

  const [columns, setColumns] = useState([
    {
      id: "col-default",
      type: "home",
      navigation: {
        history: [{ componentName: "Home", state: null }],
        currentIndex: 0,
      },
    },
    {
      id: "col-default-2",
      type: pageType,
      navigation: {
        history: [
          {
            componentName:
              COLUMN_TYPES[
                COLUMN_TYPES.findIndex((col) => col.type === pageType)
              ].initialComponent,
            state: null,
          },
        ],
        currentIndex: 0,
      },
    },
  ]);

  const [activeId, setActiveId] = useState(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragStart = useCallback((event) => {
    setActiveId(event.active.id);
  }, []);

  const handleDragEnd = useCallback((event) => {
    const { active, over } = event;
    if (active && over && active.id !== over.id) {
      setColumns((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
    setActiveId(null);
  }, []);

  const handleDragCancel = useCallback(() => {
    setActiveId(null);
  }, []);

  const handleAddColumn = useCallback((type) => {
    // Tìm component khởi tạo từ config
    const columnConfig = COLUMN_TYPES.find((ct) => ct.type === type);
    const initialComponent = columnConfig?.initialComponent || "Home";

    const newCol = {
      id: generateId(),
      type,
      navigation: {
        history: [{ componentName: initialComponent, state: null }],
        currentIndex: 0,
      },
    };
    setColumns((prev) => [...prev, newCol]);
  }, []);

  const handleRemoveColumn = useCallback((idToRemove) => {
    setColumns((prev) => prev.filter((col) => col.id !== idToRemove));
  }, []);

  const handleNavigate = useCallback(
    (columnId, action, componentName, state = null) => {
      setColumns((prevColumns) =>
        prevColumns.map((col) => {
          if (col.id !== columnId) return col;

          const nav = col.navigation;

          if (action === "push") {
            // Thêm component mới vào history với state
            const newHistory = [
              ...nav.history.slice(0, nav.currentIndex + 1),
              { componentName, state },
            ];
            return {
              ...col,
              navigation: {
                history: newHistory,
                currentIndex: newHistory.length - 1,
              },
            };
          } else if (action === "back") {
            // Quay lại component trước
            return {
              ...col,
              navigation: {
                ...nav,
                currentIndex: Math.max(0, nav.currentIndex - 1),
              },
            };
          } else if (action === "forward") {
            // Đi tới component tiếp theo
            return {
              ...col,
              navigation: {
                ...nav,
                currentIndex: Math.min(
                  nav.history.length - 1,
                  nav.currentIndex + 1,
                ),
              },
            };
          }

          return col;
        }),
      );
    },
    [],
  );

  const activeColumn = useMemo(
    () => columns.find((col) => col.id === activeId),
    [columns, activeId],
  );

  const dropAnimationConfig = {
    sideEffects: defaultDropAnimationSideEffects({
      styles: {
        active: {
          opacity: "0.5",
        },
      },
    }),
  };

  return (
    <div className="bg-muted/20 flex h-screen w-full flex-col overflow-hidden">
      <div className="max-h-dvh">
        <SimpleBar>
          <div className="flex items-center justify-center-safe gap-4">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragStart={handleDragStart}
              onDragEnd={handleDragEnd}
              onDragCancel={handleDragCancel}
            >
              <SortableContext
                items={columns.map((c) => c.id)}
                strategy={horizontalListSortingStrategy}
              >
                {columns.map((col, index) => (
                  <SortableColumn
                    key={col.id}
                    id={col.id}
                    type={col.type}
                    index={index}
                    navigation={col.navigation}
                    onNavigate={handleNavigate}
                    onRemove={handleRemoveColumn}
                  />
                ))}
              </SortableContext>

              <DragOverlay dropAnimation={dropAnimationConfig}>
                {activeId && activeColumn ? (
                  <SortableColumn
                    id={activeColumn.id}
                    type={activeColumn.type}
                    index={columns.findIndex((c) => c.id === activeId)}
                    navigation={activeColumn.navigation}
                    onNavigate={handleNavigate}
                    onRemove={handleRemoveColumn}
                    isOverlay
                  />
                ) : null}
              </DragOverlay>
            </DndContext>

            <Tooltip label={t("tooltip:addColumn")}>
              <div className="ml-1.5">
                <AddColumnButton onAdd={handleAddColumn} />
              </div>
            </Tooltip>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
}
