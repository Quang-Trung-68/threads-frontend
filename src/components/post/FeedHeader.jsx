import { Button } from "@/components/Common/ui/button";
import { PATHS } from "@/configs/paths";
import { NavLink, useLocation } from "react-router";

export default function FeedHeader() {
  const location = useLocation();

  const isForYouActive = location.pathname === PATHS.HOME;
  const isFollowingActive = location.pathname === PATHS.FOLLOWING;

  const isGhostActive = location.pathname === PATHS.GHOST_POSTS;

  return (
    <div className="flex items-center justify-center gap-1 bg-background p-2 text-center text-lg font-bold">
      <NavLink
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "isActive" : ""
        }
        to={PATHS.HOME}
      >
        <Button
          variant={"ghost"}
          className={`h-auto cursor-pointer px-4 py-2 text-[15px] font-bold hover:bg-transparent ${
            isForYouActive ? "text-foreground" : "text-muted-foreground/60 hover:text-foreground"
          }`}
        >
          For you
        </Button>
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "isActive" : ""
        }
        to={PATHS.FOLLOWING}
      >
        <Button
          variant={"ghost"}
          className={`h-auto cursor-pointer px-4 py-2 text-[15px] font-bold hover:bg-transparent ${
            isFollowingActive ? "text-foreground" : "text-muted-foreground/60 hover:text-foreground"
          }`}
        >
          Following
        </Button>
      </NavLink>
      <NavLink
        className={({ isActive, isPending }) =>
          isPending ? "pending" : isActive ? "isActive" : ""
        }
        to={PATHS.GHOST_POSTS}
      >
        <Button
          variant={"ghost"}
          className={`h-auto cursor-pointer px-4 py-2 text-[15px] font-bold hover:bg-transparent ${
            isGhostActive ? "text-foreground" : "text-muted-foreground/60 hover:text-foreground"
          }`}
        >
          Ghost posts
        </Button>
      </NavLink>
    </div>
  );
}
