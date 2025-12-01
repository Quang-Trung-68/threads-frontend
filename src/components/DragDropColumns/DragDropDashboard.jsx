import React, { useState } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
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
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";

import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

// --- 1. CONFIG & UTILS ---
const COLUMN_TYPES = [
  { type: "news", label: "📰 Tin tức" },
  { type: "chart", label: "📊 Biểu đồ" },
  { type: "profile", label: "👤 Hồ sơ" },
];

const generateId = () =>
  `col-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

// --- 2. NỘI DUNG CÁC TRANG ---
const HomeContent = ({ type, onNavigate }) => {
  const handleViewDetail = (id, name) => {
    // Truyền state khi navigate
    onNavigate("/detail", { userId: id, userName: name });
  };

  let content = <p>Nội dung mặc định</p>;
  if (type === "news")
    content = (
      <div className="text-orange-700">
        <h3 className="mb-2 text-lg font-bold">📰 News Feed</h3>
        <button
          onClick={() => handleViewDetail(101, "Tin A")}
          className="mb-2 rounded bg-orange-500 px-3 py-1 text-white hover:bg-orange-600"
        >
          Xem chi tiết Tin A
        </button>
        <button
          onClick={() => handleViewDetail(102, "Tin B")}
          className="mb-2 ml-2 rounded bg-orange-500 px-3 py-1 text-white hover:bg-orange-600"
        >
          Xem chi tiết Tin B
        </button>
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <p key={i}>Danh sách tin tức mới nhất...</p>
          ))}
      </div>
    );
  if (type === "chart")
    content = (
      <div className="text-blue-600">
        <h3 className="mb-2 text-lg font-bold">📊 Analytics</h3>
        {Array(10)
          .fill(0)
          .map((_, i) => (
            <p key={i}>Biểu đồ thống kê...</p>
          ))}
      </div>
    );
  if (type === "profile")
    content = (
      <div className="text-green-600">
        <h3 className="mb-2 text-lg font-bold">👤 User Profile</h3>
        <p>Thông tin người dùng...</p>
      </div>
    );
  if (type === "default")
    content = (
      <div className="text-purple-600">
        <h3 className="mb-2 text-lg font-bold">🏠 Cột Mặc định</h3>
        <p>Cột này luôn xuất hiện đầu tiên.</p>
      </div>
    );

  return <div>{content}</div>;
};

const DetailContent = ({ currentPath, state }) => {
  const [data, setData] = React.useState(null);
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    // Giả lập API call với state nhận được
    if (state?.userId) {
      setLoading(true);
      // Fake async API call
      setTimeout(() => {
        setData({
          id: state.userId,
          name: state.userName,
          email: `user${state.userId}@example.com`,
          details: "Chi tiết được load từ API...",
        });
        setLoading(false);
      }, 800);
    }
  }, [state?.userId]);

  return (
    <div className="text-sm">
      <h3 className="mb-2 text-lg font-bold">Chi tiết</h3>
      <p>
        Đang xem chi tiết tại: <b>{currentPath}</b>
      </p>

      {state && (
        <div className="mt-4 rounded border border-blue-200 bg-blue-50 p-3">
          <p className="font-semibold text-blue-700">📦 State nhận được:</p>
          <pre className="mt-1 text-xs">{JSON.stringify(state, null, 2)}</pre>
        </div>
      )}

      {loading && <p className="mt-4 text-gray-500">⏳ Loading data...</p>}

      {data && !loading && (
        <div className="mt-4 rounded border border-green-200 bg-green-50 p-3">
          <p className="font-semibold text-green-700">✅ Data từ API:</p>
          <p className="mt-1 text-xs">ID: {data.id}</p>
          <p className="text-xs">Name: {data.name}</p>
          <p className="text-xs">Email: {data.email}</p>
          <p className="text-xs">Details: {data.details}</p>
          <p className="mt-1 text-xs">ID: {data.id}</p>
          <p className="text-xs">Name: {data.name}</p>
          <p className="text-xs">Email: {data.email}</p>
          <p className="text-xs">Details: {data.details}</p>
          <p className="mt-1 text-xs">ID: {data.id}</p>
          <p className="text-xs">Name: {data.name}</p>
          <p className="text-xs">Email: {data.email}</p>
          <p className="text-xs">Details: {data.details}</p>
          <p className="mt-1 text-xs">ID: {data.id}</p>
          <p className="text-xs">Name: {data.name}</p>
          <p className="text-xs">Email: {data.email}</p>
          <p className="text-xs">Details: {data.details}</p>
          <p className="mt-1 text-xs">ID: {data.id}</p>
          <p className="text-xs">Name: {data.name}</p>
          <p className="text-xs">Email: {data.email}</p>
          <p className="text-xs">Details: {data.details}</p>
          <p className="mt-1 text-xs">ID: {data.id}</p>
          <p className="text-xs">Name: {data.name}</p>
          <p className="text-xs">Email: {data.email}</p>
          <p className="text-xs">Details: {data.details}</p>
        </div>
      )}
    </div>
  );
};

const InfoContent = () => (
  <div className="text-gray-500">
    <h3 className="mb-2 text-lg font-bold">Thông tin</h3>
    <p>Thông tin thêm về widget này.</p>
  </div>
);

// --- 3. COLUMN CONTENT WITH ROUTING ---
const InnerColumnContent = ({ type, navigation, onNavigate }) => {
  const current = navigation.history[navigation.currentIndex];
  const currentPath = current.path;
  const currentState = current.state;

  const canGoBack = navigation.currentIndex > 0;
  const canGoForward = navigation.currentIndex < navigation.history.length - 1;

  const handleNavigate = (path, state = null) => {
    onNavigate("push", path, state);
  };

  const handleBack = () => {
    if (canGoBack) onNavigate("back");
  };

  const handleForward = () => {
    if (canGoForward) onNavigate("forward");
  };

  const NavLink = ({ to, children }) => {
    const isActive = currentPath === to;
    return (
      <button
        onClick={() => handleNavigate(to)}
        className={`mr-1.5 cursor-pointer text-xs font-semibold no-underline transition-colors ${
          isActive
            ? "text-blue-800 underline"
            : "text-blue-600 hover:text-blue-800"
        }`}
      >
        {children}
      </button>
    );
  };

  return (
    <div className="flex h-full flex-col bg-white">
      {/* Navigation Bar */}
      <div className="border-b border-gray-200 bg-gray-50 p-2.5">
        <div className="mb-2 flex items-center gap-2">
          <button
            onClick={handleBack}
            disabled={!canGoBack}
            className="rounded bg-gray-200 px-2 py-1 text-xs hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
            title="Back"
          >
            ← Back
          </button>
          <button
            onClick={handleForward}
            disabled={!canGoForward}
            className="rounded bg-gray-200 px-2 py-1 text-xs hover:bg-gray-300 disabled:cursor-not-allowed disabled:opacity-40"
            title="Forward"
          >
            Forward →
          </button>
        </div>
        <div className="text-sm">
          <NavLink to="/">Main</NavLink>
          {" • "}
          <NavLink to="/detail">Detail</NavLink>
          {" • "}
          <NavLink to="/info">Info</NavLink>
        </div>
        <div className="mt-1 text-xs text-gray-400">
          Current: {currentPath} ({navigation.currentIndex + 1}/
          {navigation.history.length})
        </div>
      </div>

      {/* Content Area */}
      <SimpleBar className="max-h-120 flex-1">
        <div className="p-4">
          {currentPath === "/" && (
            <HomeContent type={type} onNavigate={handleNavigate} />
          )}
          {currentPath === "/detail" && (
            <DetailContent currentPath={currentPath} state={currentState} />
          )}
          {currentPath === "/info" && <InfoContent />}
        </div>
      </SimpleBar>
    </div>
  );
};

// --- 4. SORTABLE COLUMN COMPONENT ---
const SortableColumn = ({
  id,
  type,
  index,
  navigation,
  onNavigate,
  onRemove,
}) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const canRemove = index !== 0;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`relative h-150 max-w-100 min-w-100 flex-1 flex-col gap-2 rounded-lg border border-gray-200 bg-white ${
        isDragging ? "opacity-80 shadow-2xl" : "shadow-md"
      }`}
    >
      <div
        {...attributes}
        {...listeners}
        className="flex cursor-grab items-center justify-between bg-linear-to-r from-blue-500 to-blue-600 px-4 py-2.5 text-white select-none"
      >
        <span className="font-bold">:: Widget {index + 1}</span>

        {canRemove && (
          <button
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => onRemove(id)}
            className="cursor-pointer border-none bg-transparent px-1.5 py-0 text-base leading-none text-white transition-colors hover:text-red-200"
            title="Đóng cột này"
          >
            ✕
          </button>
        )}
      </div>

      <div className="relative w-100 flex-1">
        <InnerColumnContent
          type={type}
          navigation={navigation}
          onNavigate={(action, path, state) =>
            onNavigate(id, action, path, state)
          }
        />
      </div>
    </div>
  );
};

// --- 5. COMPONENT NÚT THÊM (+) & MENU ---
const AddColumnButton = ({ onAdd }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="h-12 w-12 rounded-full border-2 border-dashed border-gray-400 hover:border-blue-600 hover:text-blue-600"
        >
          <span className="text-2xl">+</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-44">
        <DropdownMenuLabel className="text-xs text-gray-500">
          THÊM CỘT
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {COLUMN_TYPES.map((item) => (
          <DropdownMenuItem
            key={item.type}
            onClick={() => onAdd(item.type)}
            className="cursor-pointer"
          >
            {item.label}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

// --- 6. COMPONENT CHÍNH (APP) ---
export default function DragDropDashboard() {
  const [columns, setColumns] = useState([
    {
      id: "col-default",
      type: "default",
      navigation: {
        history: [{ path: "/", state: null }],
        currentIndex: 0,
      },
    },
  ]);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    }),
  );

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (active.id !== over.id) {
      setColumns((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleAddColumn = (type) => {
    const newCol = {
      id: generateId(),
      type,
      navigation: {
        history: [{ path: "/", state: null }],
        currentIndex: 0,
      },
    };
    setColumns([...columns, newCol]);
  };

  const handleRemoveColumn = (idToRemove) => {
    setColumns(columns.filter((col) => col.id !== idToRemove));
  };

  const handleNavigate = (columnId, action, path, state = null) => {
    setColumns((prevColumns) =>
      prevColumns.map((col) => {
        if (col.id !== columnId) return col;

        const nav = col.navigation;

        if (action === "push") {
          // Thêm trang mới vào history với state
          const newHistory = [
            ...nav.history.slice(0, nav.currentIndex + 1),
            { path, state },
          ];
          return {
            ...col,
            navigation: {
              history: newHistory,
              currentIndex: newHistory.length - 1,
            },
          };
        } else if (action === "back") {
          // Quay lại trang trước
          return {
            ...col,
            navigation: {
              ...nav,
              currentIndex: Math.max(0, nav.currentIndex - 1),
            },
          };
        } else if (action === "forward") {
          // Đi tới trang tiếp theo
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
  };

  return (
    <div className="">
      <div className="max-h-dvh">
        <SimpleBar>
          <div className="flex items-center justify-center-safe">
            <DndContext
              sensors={sensors}
              collisionDetection={closestCenter}
              onDragEnd={handleDragEnd}
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
            </DndContext>

            <div className="ml-2.5">
              <AddColumnButton onAdd={handleAddColumn} />
            </div>
          </div>
        </SimpleBar>
      </div>
    </div>
  );
}
