import { PATHS } from "@/configs/paths.js";
import { LAYOUTS } from "@/configs/layouts.js";

import Home from "@pages/Home";
import Search from "@pages/Search";
import Create from "@components/Create";
import Notification from "@pages/Notifications";
import NotFound from "@pages/NotFound";
import Profile from "@pages/Profile";
import { Heart as HeartIcon, House as HouseIcon, Plus as PlusIcon, User as UserIcon } from "lucide-react";
import { Search as SearchIcon } from "lucide-react";

export const ROUTES = [
  {
    layout: LAYOUTS.DEFAULT,
    children: [
      {
        path: PATHS.HOME,
        title: "Home",
        element: Home,
        isShowInNav: true,
        icon: HouseIcon,
        isFill:true
      },
      {
        path: PATHS.SEARCH,
        title: "Search",
        element: Search,
        isShowInNav: true,
        icon: SearchIcon,
        isFill:false
      },
      {
        path: null,
        title: "Create",
        element: Create,
        isShowInNav: true,
        icon: PlusIcon,
        isFill:false
      },
      {
        path: PATHS.NOTIFICATIONS,
        title: "Notifications",
        element: Notification,
        isShowInNav: true,
        icon:HeartIcon,
        isFill:true
      },
      {
        path: PATHS.PROFILE,
        title: "Profile",
        element: Profile,
        isShowInNav: true,
        icon:UserIcon,
        isFill:true
      },
    ],
  },
  {
    layout: LAYOUTS.NO_LAYOUT,
    children: [
      {
        path: PATHS.NOT_FOUND,
        title: "Not Found",
        element: NotFound,
        isShowInNav: false,
      },
    ],
  },
];
