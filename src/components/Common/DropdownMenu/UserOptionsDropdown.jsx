import { Check, Ghost, Monitor, Moon, Sun } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuShortcut,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubTrigger,
  DropdownMenuPortal,
  DropdownMenuSubContent,
} from "../ui/dropdown-menu";
import useAuth from "@/hooks/useAuth";
import { useTheme } from "next-themes";

const UserOptionsDropdown = ({ children }) => {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();

  const ThemeItem = ({ value, label, icon: Icon }) => (
    <DropdownMenuItem
      className={"w-40 rounded-xl px-3 py-3.5 text-[15px] font-semibold"}
      onClick={() => setTheme(value)}
    >
      {label}
      <DropdownMenuShortcut className="flex items-center gap-2">
        {theme === value && <Check className="size-4 text-primary" />}
        <Icon className="size-5" />
      </DropdownMenuShortcut>
    </DropdownMenuItem>
  );

  if (!user)
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className={"w-fit rounded-3xl border-2 p-2"}>
          <DropdownMenuGroup>
            <DropdownMenuSub className={"rounded-3xl"}>
              <DropdownMenuSubTrigger
                className={
                  "w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
                }
              >
                Appearance
              </DropdownMenuSubTrigger>
              <DropdownMenuPortal>
                <DropdownMenuSubContent className={"rounded-3xl"}>
                  <ThemeItem value="light" label="Light" icon={Sun} />
                  <ThemeItem value="dark" label="Dark" icon={Moon} />
                  <ThemeItem value="system" label="Auto" icon={Monitor} />
                </DropdownMenuSubContent>
              </DropdownMenuPortal>
            </DropdownMenuSub>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              className={
                "w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
            >
              Report a problem
            </DropdownMenuItem>
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    );

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
      <DropdownMenuContent className={"w-fit rounded-3xl border-2 p-2"}>
        <DropdownMenuGroup>
          <DropdownMenuSub>
            <DropdownMenuSubTrigger
              className={
                "w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
            >
              Appearance
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className={"rounded-3xl"}>
                <ThemeItem value="light" label="Light" icon={Sun} />
                <ThemeItem value="dark" label="Dark" icon={Moon} />
                <ThemeItem value="system" label="Auto" icon={Monitor} />
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem
            className={"w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"}
          >
            Insights
          </DropdownMenuItem>
          <DropdownMenuItem
            className={"w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"}
          >
            Settings
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuSub className={"rounded-3xl"}>
            <DropdownMenuSubTrigger
              className={
                "w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
              }
            >
              Feeds
            </DropdownMenuSubTrigger>
            <DropdownMenuPortal>
              <DropdownMenuSubContent className={"rounded-3xl"}>
                <DropdownMenuItem
                  className={
                    "w-40 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
                  }
                >
                  For you
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={
                    "w-40 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
                  }
                >
                  Following
                </DropdownMenuItem>
                <DropdownMenuItem
                  className={
                    "w-40 rounded-xl px-3 py-3.5 text-[15px] font-semibold"
                  }
                >
                  Ghost posts
                  <DropdownMenuShortcut>
                    <Ghost className="size-5" />
                  </DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuSubContent>
            </DropdownMenuPortal>
          </DropdownMenuSub>
          <DropdownMenuItem
            className={"w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"}
          >
            Saved
          </DropdownMenuItem>
          <DropdownMenuItem
            className={"w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"}
          >
            Linked
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className={"w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"}
          >
            Report a problem
          </DropdownMenuItem>
          <DropdownMenuItem
            className={"w-50 rounded-xl px-3 py-3.5 text-[15px] font-semibold"}
          >
            <span className="text-red-500">Log out</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserOptionsDropdown;
