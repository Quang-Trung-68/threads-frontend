import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
} from "../ui/dropdown-menu";
import { useState } from "react";
import { Switch } from "../ui/switch";
import {
  BookmarkCheck,
  BookmarkX,
  Eye,
  EyeOff,
  Link,
  MessageCircleWarning,
  Save,
  UserLock,
  UserRoundMinus,
  UserRoundX,
} from "lucide-react";
import { Separator } from "@radix-ui/react-dropdown-menu";

const PostOptionsDropdown = ({ id, children }) => {
  const [isSaved, setIsSaved] = useState(false);
  const [isInterested, setIsInterested] = useState(false);

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>{children}</DropdownMenuTrigger>
        <DropdownMenuContent className={"w-fit rounded-3xl border-2 p-2"}>
          <DropdownMenuCheckboxItem
            checked={isSaved}
            className={
              "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
            }
            onCheckedChange={setIsSaved}
          >
            <span>Save</span>
            <span className="flex items-center justify-center">
              {!isSaved ? (
                <BookmarkCheck className="size-5" />
              ) : (
                <BookmarkX className="size-5" />
              )}
            </span>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={isInterested}
            className={
              "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
            }
            onCheckedChange={setIsInterested}
          >
            <span>Not interested</span>
            <span className="flex items-center justify-center">
              {!isInterested ? (
                <Eye className="size-5" />
              ) : (
                <EyeOff className="size-5" />
              )}
            </span>
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            className={
              "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
            }
          >
            <span>Mute</span>
            <span className="flex items-center justify-center">
              <UserRoundMinus className="size-5" />
            </span>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            className={
              "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
            }
          >
            <span>Restrict</span>
            <span className="flex items-center justify-center">
              <UserRoundX className="size-5" />
            </span>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            className={
              "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
            }
          >
            <span className="text-red-500">Block</span>
            <span className="flex items-center justify-center">
              <UserLock className="size-5 text-red-500" />
            </span>
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            className={
              "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
            }
          >
            <span className="text-red-500">Report</span>
            <span className="flex items-center justify-center text-red-500">
              <MessageCircleWarning className="size-5" />
            </span>
          </DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuCheckboxItem
            className={
              "flex w-55 items-center justify-between rounded-xl px-3 py-3.5 text-[15px] font-semibold"
            }
          >
            <span>Copy link</span>
            <span className="flex items-center justify-center">
              <Link className="size-5" />
            </span>
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default PostOptionsDropdown;
