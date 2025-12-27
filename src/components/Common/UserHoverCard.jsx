import { Button } from "@/components/Common/ui/button";
import UserAvatar from "./ui/UserAvatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";

function UserHoverProfileCard({
  name,
  username,
  avatar_url,
  follow_count,
  isFollowing = false,
  onFollow,
  children,
}) {
  return (
    <HoverCard delay={300}>
      <HoverCardTrigger asChild>
        <span>{children}</span>
      </HoverCardTrigger>
      <HoverCardContent className="w-80 rounded-2xl p-6">
        <div className="space-y-4">
          {/* Top info */}
          <div className="flex items-start justify-between gap-3">
            <div className="space-y-1.5">
              <div className="text-lg leading-none font-semibold">{name}</div>
              <div className="text-muted-foreground text-sm">@{username}</div>

              <div className="text-muted-foreground pt-2 text-sm">
                {follow_count} followers
              </div>
            </div>

            {/* Avatar */}
            <UserAvatar username={username} avatar_url={avatar_url} />
          </div>

          {/* Follow button */}
          <Button
            className="h-9 w-full rounded-full text-sm font-semibold"
            variant={isFollowing ? "secondary" : "default"}
            onClick={(e) => {
              e.stopPropagation();
              onFollow?.();
            }}
          >
            {isFollowing ? "Following" : "Follow"}
          </Button>
        </div>
      </HoverCardContent>
    </HoverCard>
  );
}

export default UserHoverProfileCard;
