import { useEffect, useState } from "react";

import NavigateInHome from "@/components/Navigation/NavigateInHome";
import PostLists from "@/components/Posts/PostLists";
import { Spinner } from "@/components/ui/spinner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import useAuth from "@/hooks/useAuth";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(
          "https://jsonplaceholder.typicode.com/posts",
        );
        if (!response.ok) throw new Error("Failed to fetch posts");

        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    fetchPosts();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <div>
          <NavigateInHome />
        </div>
        {loading ? (
          <div className="flex h-dvh w-dvw items-center justify-center">
            <Spinner />
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between p-5">
              <div className="flex items-center justify-center gap-2">
                <div>
                  <Avatar className={"size-9"}>
                    <AvatarImage
                      src="https://github.com/shadcn.png"
                      alt="@dqt_2309"
                    />
                    <AvatarFallback>QT</AvatarFallback>
                  </Avatar>
                </div>
                <div>
                  <Input
                    type={"text"}
                    className={
                      "border-0 p-0.5 text-gray-500 shadow-none focus:ring-0 focus:ring-offset-0 focus-visible:ring-0 focus-visible:ring-offset-0 focus-visible:outline-none"
                    }
                    placeholder={`What's news ?`}
                  />
                </div>
              </div>
              <div>
                <Button
                  variant="ghost"
                  className={
                    "cursor-pointer rounded-3xl bg-black font-semibold text-white"
                  }
                >
                  Post
                </Button>
              </div>
            </div>
            <PostLists isPermitDetailPost={true} posts={posts} />
          </div>
        )}
      </div>
    </>
  );
}
