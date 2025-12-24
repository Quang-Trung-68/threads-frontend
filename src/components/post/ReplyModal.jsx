import React, { useRef, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/Common/ui/dialog";
import { Button } from "@/components/Common/ui/button";
import UserAvatar from "@/components/Common/ui/UserAvatar";
import { ScrollArea } from "@/components/Common/ui/scroll-area";
import {
  MoreHorizontal,
  Image as ImageIcon,
  FileText,
  MapPin,
  Smile,
  AlignLeft,
  ChevronRight,
  Grid3x3,
} from "lucide-react";
import NiceModal, { useModal } from "@ebay/nice-modal-react";
import Cookies from "js-cookie";
import { formatTime } from "@/utils/formatTime";
import ReplyOptionsDropdown from "../Common/DropdownMenu/ReplyOptionsDropdown";
import { Textarea } from "../Common/ui/textarea";
import { useCreateReplyMutation } from "@/services/postService";
import { notifySooner } from "@/utils/notifySooner";

const Modal = NiceModal.create(({ id, user, content, updated_at }) => {
  const modal = useModal();

  const [createReplyApi, { isCreateReplyLoading }] = useCreateReplyMutation();

  const handleCancel = () => {
    modal.hide();
  };

  const handlePost = async () => {
    if (replyText.trim()) {
      try {
        const createPromise = createReplyApi({
          postId: id,
          data: {
            content: replyText,
            reply_permission: replyQuote,
            requires_reply_approval: reviewApprove,
          },
        }).unwrap();

        notifySooner.promise(createPromise, {
          loading: "Loading...",
          success: "Replied!",
          error: "Errored to fetch...",
        });

        await createPromise;

        setReplyText("");
        modal.hide();
      } catch (error) {
        console.error("Create reply failed:", error);
      }
      modal.hide();
    }
  };

  const userInfo = JSON.parse(Cookies.get("userInfo") || "{}");
  const usernameAuth = userInfo.username;
  const avatarUrlAuth = userInfo.avatar_url;
  const { username } = user;

  const [replyQuote, setReplyQuote] = useState("everyone");
  const [reviewApprove, setReviewApprove] = useState(false);

  const [replyText, setReplyText] = useState("");
  const textareaRef = useRef(null);

  const handleInput = (e) => {
    setReplyText(e.target.value);
    e.target.style.height = "auto";
    e.target.style.height = `${e.target.scrollHeight}px`;
  };

  return (
    <Dialog open={modal.visible} onOpenChange={handleCancel}>
      <DialogContent
        aria-describedby={undefined}
        showCloseButton={false}
        className="bg-background text-foreground flex h-[90vh] flex-col gap-0 overflow-hidden rounded-2xl p-0 transition-colors sm:h-auto sm:max-h-[85vh] sm:max-w-[600px]"
      >
        {/* --- Header --- */}
        <DialogHeader className="border-border flex flex-row items-center justify-between space-y-0 border-b px-4 py-3">
          <Button
            variant="ghost"
            className="text-foreground h-auto cursor-pointer p-1 text-base font-normal hover:bg-transparent"
            onClick={handleCancel}
          >
            Cancel
          </Button>
          <DialogTitle className="flex-1 text-center text-base font-bold">
            Reply
          </DialogTitle>
          <Button
            variant="ghost"
            size="icon"
            className="text-muted-foreground hover:text-foreground h-auto cursor-pointer p-0 hover:bg-transparent"
          >
            <MoreHorizontal className="h-6 w-6" />
          </Button>
        </DialogHeader>

        {/* --- Body (Scrollable) --- */}
        <ScrollArea className="flex-1 px-4 py-4">
          <div className="flex gap-3">
            {/* Cột trái: Avatar + Đường kẻ nối */}
            <div className="flex shrink-0 flex-col items-center">
              <UserAvatar
                user={{
                  username: user?.username,
                  avatar_url: user?.avatar_url || user?.avatar,
                }}
                className="h-10 w-10"
              />

              {/* Đường kẻ dọc (Thread Line) - dài hơn */}
              <div className="bg-border/50 my-2 w-0.5 flex-1"></div>

              <UserAvatar
                user={{ username: usernameAuth, avatar_url: avatarUrlAuth }}
                className="h-7 w-7 opacity-50"
              />
            </div>

            {/* Cột phải: Nội dung chính */}
            <div className="flex-1 pb-1">
              {/* Original Post Header */}
              <div className="mb-2 flex items-center gap-2">
                <span className="text-[15px] font-semibold">{username}</span>
                <ChevronRight className="text-muted-foreground h-3.5 w-3.5" />
                <span className="text-muted-foreground text-sm font-semibold">
                  工程師日常
                </span>
                <span className="text-muted-foreground text-sm">
                  {formatTime(updated_at)}
                </span>
              </div>

              {/* Original Post Content */}
              <div className="mb-3">
                <p className="text-foreground mb-2 text-[15px] leading-relaxed">
                  {content}
                </p>
              </div>

              {/* Reply Section */}
              <div className="mt-6">
                {/* Reply User Info */}
                <div className="mb-2 flex items-center gap-2">
                  <span className="text-[15px] font-semibold">
                    {usernameAuth}
                  </span>
                  <ChevronRight className="text-muted-foreground h-3.5 w-3.5" />
                  <button className="text-muted-foreground hover:text-foreground text-sm">
                    Add a topic
                  </button>
                </div>

                {/* Reply Text Placeholder */}
                <div className="mb-3">
                  <Textarea
                    ref={textareaRef}
                    value={replyText}
                    onChange={handleInput}
                    rows={1}
                    className={
                      "text-foreground min-h-10 w-full resize-none border-0 bg-transparent p-0.5 shadow-none focus-visible:ring-0 focus-visible:outline-none"
                    }
                    placeholder={`Reply to ${username}...`}
                  />
                </div>

                {/* Action Icons */}
                <div className="text-muted-foreground flex gap-5">
                  <ImageIcon className="hover:text-foreground h-5 w-5 cursor-pointer" />
                  <FileText className="hover:text-foreground h-5 w-5 cursor-pointer" />
                  <Smile className="hover:text-foreground h-5 w-5 cursor-pointer" />
                  <AlignLeft className="hover:text-foreground h-5 w-5 cursor-pointer" />
                  <Grid3x3 className="hover:text-foreground h-5 w-5 cursor-pointer" />
                  <MapPin className="hover:text-foreground h-5 w-5 cursor-pointer" />
                </div>
              </div>

              {/* Add to thread placeholder */}
              <div className="mt-6 flex items-center gap-2">
                <UserAvatar
                  user={{ username: usernameAuth, avatar_url: avatarUrlAuth }}
                  className="h-7 w-7 opacity-50"
                />
                <span className="text-muted-foreground text-sm">
                  Add to thread
                </span>
              </div>
            </div>
          </div>
        </ScrollArea>

        {/* --- Footer --- */}
        <div className="border-border flex items-center justify-between border-t px-4 py-3">
          <ReplyOptionsDropdown
            replyQuote={replyQuote}
            setReplyQuote={setReplyQuote}
            reviewApprove={reviewApprove}
            setReviewApprove={setReviewApprove}
          >
            <button
              className={`flex cursor-pointer items-center gap-2 text-sm font-semibold transition-colors ${reviewApprove ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}
            >
              <Grid3x3 className="h-4 w-4" />
              <span>Reply options</span>
            </button>
          </ReplyOptionsDropdown>

          <Button
            className="bg-primary text-primary-foreground cursor-pointer rounded-full px-6 py-2 text-sm font-semibold transition-colors hover:opacity-90"
            onClick={handlePost}
            disable={isCreateReplyLoading}
          >
            Post
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
});

export const ReplyModal = {
  open: (props) => NiceModal.show(Modal, props),
  close: () => NiceModal.hide(Modal),
};
