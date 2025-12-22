import { Plus } from "lucide-react";
import { CreatePostModal } from "@/components/post/CreatePostModal";

export default function AddPostButton() {
  const handleClick = () => {
    CreatePostModal.open({});
  };

  return (
    <div
      onClick={handleClick}
      className="fixed right-6 bottom-6 z-50 hidden md:flex w-20 h-18 cursor-pointer items-center justify-center rounded-2xl border border-border bg-card shadow-xl transition-all duration-300 hover:scale-110 hover:shadow-2xl"
    >
      <Plus size={28} className="text-foreground" strokeWidth={2.5} />
    </div>
  );
}
