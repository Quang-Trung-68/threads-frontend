import { Button } from "@/components/Common/ui/button";
import { PATHS } from "@/configs/paths";
import { NavLink } from "react-router";
import { useTranslation } from "react-i18next";
import { CircleEllipsis } from "lucide-react";

export default function FeedHeader() {
  const { t } = useTranslation(["feed", "common"]);

  return (
    <div className="flex items-center justify-between px-2 py-2 text-lg font-bold">
      <div className="w-10 px-4 py-3"></div>
      <div className="flex items-center justify-center gap-1">
        <NavLink
          to={PATHS.HOME}
          className={({ isActive }) => "flex-1 md:flex-none"}
        >
          {({ isActive }) => (
            <Button
              variant={"ghost"}
              className={`h-auto w-full cursor-pointer rounded-none bg-transparent px-4 py-3 text-[15px] font-bold transition-all hover:bg-transparent md:w-auto ${
                isActive
                  ? "border-b-2 border-foreground text-foreground md:border-0"
                  : "text-muted-foreground/60 hover:text-foreground"
              }`}
            >
              {t("feed:forYou")}
            </Button>
          )}
        </NavLink>
        <NavLink
          to={PATHS.FOLLOWING}
          className={({ isActive }) => "flex-1 md:flex-none"}
        >
          {({ isActive }) => (
            <Button
              variant={"ghost"}
              className={`h-auto w-full cursor-pointer rounded-none bg-transparent px-4 py-3 text-[15px] font-bold transition-all hover:bg-transparent md:w-auto ${
                isActive
                  ? "border-b-2 border-foreground text-foreground md:border-0"
                  : "text-muted-foreground/60 hover:text-foreground"
              }`}
            >
              {t("feed:following")}
            </Button>
          )}
        </NavLink>
        <NavLink
          to={PATHS.GHOST_POSTS}
          className={({ isActive }) => "hidden md:block"}
        >
          {({ isActive }) => (
            <Button
              variant={"ghost"}
              className={`h-auto cursor-pointer bg-transparent px-4 py-3 text-[15px] font-bold hover:bg-transparent ${
                isActive ? "text-foreground" : "text-muted-foreground/60 hover:text-foreground"
              }`}
            >
              {t("feed:ghostPosts")}
            </Button>
          )}
        </NavLink>
      </div>
      <div className="flex w-10 justify-center">
        <CircleEllipsis
          className="cursor-pointer shadow-2xl shadow-gray-400 hover:scale-110"
          strokeWidth={1.1}
        />
      </div>
    </div>
  );
}
