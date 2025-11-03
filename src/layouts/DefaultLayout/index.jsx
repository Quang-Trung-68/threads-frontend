import { Outlet } from "react-router";
import Header from "@components/Header";
import Navigation from "@/components/Navigation";

export default function DefaultLayout() {
  return (
    <div className="relative">
      <Header />
      <main>
        <Outlet />
      </main>
      <Navigation />
    </div>
  );
}
