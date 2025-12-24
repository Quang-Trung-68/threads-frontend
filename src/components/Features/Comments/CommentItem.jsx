import UserAvatar from "@/components/Common/ui/UserAvatar";
import { Ellipsis as MoreIcon } from "lucide-react";
import { Card } from "@/components/Common/ui/card";
import ReplyModal from "@/components/Common/Modals/QuickReplyModal";
import { useRef } from "react";
import InteractionBar from "@/components/post/InteractionBar";

function CommentItem({
  user,
  content,
  id,
  updated_at,
  likes_count,
  replies_count,
  reposts_and_quotes_count,
  is_liked_by_auth,
  is_reposted_by_auth,
}) {
  const { username, avatar_url } = user;
  // const navigate = useNavigate();

  // const handleToUserProfile = () => {
  //   navigate(`/@${userId}`);
  // };
  const urlImage =
    "https://picsum.photos/600/400?random=" + Math.floor(Math.random() * 10);

  const ReplyModalRef = useRef(null);
  const toggleReplyModal = () => {
    ReplyModalRef.current?.toggle();
  };
  return (
    <Card className="flex flex-col rounded-none border-b p-3 md:p-6">
      <div className="flex gap-2">
        <div>
          <UserAvatar user={{ username, avatar_url }} className="size-9" />
        </div>

        <div className="flex flex-1 flex-col gap-2">
          <div className="content flex justify-between">
            <div className="flex-1">
              <div className="username flex items-center gap-2">
                <div className="font-semibold">{username}</div>
                <div className="text-sm text-gray-500">{"10h"}</div>
              </div>
              {content && <div className="body mt-1">{content}</div>}
            </div>
            <div>
              <MoreIcon className="size-5 text-gray-500" />
            </div>
          </div>

          {/* Interaction Bar */}
          <div>
            <InteractionBar
              id={id}
              user={user}
              content={content}
              updated_at={updated_at}
              likes_count={likes_count}
              replies_count={replies_count}
              reposts_and_quotes_count={reposts_and_quotes_count}
              toggleReplyModal={toggleReplyModal}
              is_liked_by_auth={is_liked_by_auth}
              is_reposted_by_auth={is_reposted_by_auth}
            />
          </div>
        </div>
      </div>
      <ReplyModal ref={ReplyModalRef} />
    </Card>
  );
}

export default CommentItem;
