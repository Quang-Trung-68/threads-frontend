import { useLikePostMutation } from "@/services/postService";
import {
  Heart as LikeIcon,
  MessageCircle as ReplyIcon,
  Repeat2 as Repeat2Icon,
  Send as SendIcon,
} from "lucide-react";
import { useState, useEffect } from "react";

const InteractionBar = ({
  id,
  toggleReplyModal,
  likes_count,
  replies_count,
  reposts_and_quotes_count,
  is_liked_by_auth,
}) => {
  const [likePostApi, { isLoading }] = useLikePostMutation();
  const [interactionsCount, setInteractionsCount] = useState({
    is_liked_by_auth,
    likes_count,
    replies_count,
    reposts_and_quotes_count,
  });

  // Sync state with props when data is refetched or changes
  useEffect(() => {
    setInteractionsCount((prev) => ({
      ...prev,
      is_liked_by_auth,
      likes_count,
      replies_count,
      reposts_and_quotes_count,
    }));
  }, [is_liked_by_auth, likes_count, replies_count, reposts_and_quotes_count]);

  const handleLikeCount = async (e) => {
    e.stopPropagation(); // Prevent card click
    if (isLoading) return; // Prevent spamming

    // Optimistic Update
    const isLiked = interactionsCount.is_liked_by_auth;
    const newIsLiked = !isLiked;
    const newCount = interactionsCount.likes_count + (newIsLiked ? 1 : -1);

    setInteractionsCount({
      ...interactionsCount,
      is_liked_by_auth: newIsLiked,
      likes_count: newCount,
    });

    try {
      const response = await likePostApi({ id });
      if (!response.data.success) {
        // Revert on failure (optional, depending on API behavior, usually throws error or returns success:false)
        setInteractionsCount({
          ...interactionsCount,
          is_liked_by_auth: isLiked,
          likes_count: interactionsCount.likes_count,
        });
      }
    } catch (error) {
      console.error(error);
      // Revert on error
      setInteractionsCount({
        ...interactionsCount,
        is_liked_by_auth: isLiked,
        likes_count: interactionsCount.likes_count,
      });
    }
  };

  return (
    <>
      <div className="flex gap-4 text-gray-600">
        <div
          onClick={handleLikeCount}
          className={`likes_count flex cursor-pointer items-center gap-1 rounded-2xl p-2 hover:bg-gray-100 ${
            interactionsCount.is_liked_by_auth
              ? "text-red-500"
              : "hover:text-red-500"
          }`}
        >
          <LikeIcon
            className={`size-4.5 ${interactionsCount.is_liked_by_auth ? "fill-current" : ""}`}
          />
          <span className="text-sm">{interactionsCount.likes_count}</span>
        </div>

        <div
          onClick={(e) => {
            e.stopPropagation();
            toggleReplyModal();
          }}
          className="replies_count flex cursor-pointer items-center gap-1 rounded-2xl p-2 hover:bg-gray-100 hover:text-blue-500"
        >
          <ReplyIcon className="size-4.5" />
          <span className="text-sm">{interactionsCount.replies_count}</span>
        </div>

        <div className="replies_count flex cursor-pointer items-center gap-1 rounded-2xl p-2 hover:bg-gray-100 hover:text-green-500">
          <Repeat2Icon className="size-4.5" />
          <span className="text-sm">
            {interactionsCount.reposts_and_quotes_count}
          </span>
        </div>

        <div className="flex cursor-pointer items-center gap-1 rounded-2xl p-2 hover:bg-gray-100 hover:text-purple-500">
          <SendIcon className="size-4.5" />
          {/* <span className="text-sm">{1}</span> */}
        </div>
      </div>
    </>
  );
};

export default InteractionBar;
