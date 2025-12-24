import { Spinner } from "@/components/Common/ui/spinner";
import CommentItem from "@/components/Features/Comments/CommentItem";
import PostCard from "@/components/post/PostCard";
import {
  useGetRepliesQuery,
  useGetSinglePostQuery,
} from "@/services/postService";
import { useParams } from "react-router-dom";

export default function PostDetail() {
  const { postId } = useParams();
  console.log(postId);

  const { data: post, isLoading: isPostLoading } = useGetSinglePostQuery({
    postId,
  });
  const { data: replies, isLoading: isRepliesLoading } = useGetRepliesQuery({
    postId,
  });
  const repliesData = replies?.data;
  const pagination = replies?.pagination;

  if (isPostLoading || isRepliesLoading) return <Spinner />;

  return (
    <>
      <div>
        <PostCard isPermitDetailPost={false} {...post} />
      </div>
      <div>
        {repliesData.map((comment) => (
          <CommentItem key={comment.id} {...comment} />
        ))}
      </div>
    </>
  );
}
