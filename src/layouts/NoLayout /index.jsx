import { NavLink, Outlet } from "react-router";
import { PATHS } from "@/configs/paths";

export default function NoLayout() {
  return (
    <>
      <Outlet />
      <div className="back-to-home">
        <NavLink to={PATHS.HOME}>VỀ TRANG CHỦ</NavLink>
      </div>
    </>
  );
}
