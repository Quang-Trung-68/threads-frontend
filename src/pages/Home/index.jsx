import { Button } from "@/components/ui/button";
import ForYou from "../ForYou/ForYou";
import Following from "../Following/Following";
import PostItem from "@/components/PostItem/PostItem";

import { mockPosts } from "@/mockDatas/mockPosts.js";

import { NavLink } from "react-router";
import NavigateInHome from "@/components/Navigation/NavigateInHome";
import PostLists from "@/components/Posts/PostLists";
import { useEffect, useState } from "react";
import { Spinner } from "@/components/ui/spinner";

export default function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);

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
        throw new error();
      } finally {
        setLoading(false);
      }
    };
    setLoading(true);
    fetchPosts();
  }, []);

  return (
    <>
      <div>
        <div>
          <NavigateInHome />
        </div>
        {loading ? (
          <div className="flex h-dvh w-dvw items-center justify-center gap-4">
            <Spinner />
          </div>
        ) : (
          <div>
            <PostLists posts={posts} />
          </div>
        )}
      </div>
    </>
  );
}
