import { Button } from "@/components/ui/button";
import { useState } from "react";
import ForYou from "../ForYou/ForYou";
import Following from "../Following/Following";

const NavInHome = ({ page, setPage }) => {
  return (
    <div className="flex items-center justify-center">
      <Button
        onClick={() => setPage("forYou")}
        className={`transition-all text-[#b8b8b8] flex-1 border-b-2 rounded-b-none rounded-t-none cursor-pointer  ${
          page === "forYou" ? " border-black text-black" : ""
        } `}
        variant={"ghost"}
      >
        For you
      </Button>
      <Button
        onClick={() => setPage("following")}
        className={`transition-all  text-[#b8b8b8] flex-1 border-b-2 rounded-b-none rounded-t-none cursor-pointer ${
          page !== "forYou" ? " border-black text-black" : ""
        } `}
        variant={"ghost"}
      >
        Following
      </Button>
    </div>
  );
};

export default function Home() {
  const [page, setPage] = useState("forYou");
  if (page === "forYou")
    return (
      <>
        <div>
          <div>
            <NavInHome page={page} setPage={setPage} />
          </div>

          <div>
            <ForYou />
          </div>
        </div>
      </>
    );
  else {
    return (
      <>
        <div>
          <div>
            <NavInHome page={page} setPage={setPage} />
          </div>
          <div>
            <Following />
          </div>
        </div>
      </>
    );
  }
}
