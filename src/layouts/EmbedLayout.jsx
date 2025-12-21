import { Outlet } from "react-router";

export default function EmbedLayout() {
  return (
    <>
      <div className="w-full">
        <Outlet />
      </div>
    </>
  );
}
