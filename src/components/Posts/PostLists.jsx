import PostItem from "../PostItem/PostItem";

const PostLists = ({posts}) => {
  return (
    <div>
      {posts.map((post) => {
        return <PostItem key={post.id} {...post} />;
      })}
    </div>
  );
};

export default PostLists;