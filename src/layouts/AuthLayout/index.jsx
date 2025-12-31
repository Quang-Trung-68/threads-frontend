import { Outlet } from "react-router-dom";
import AuthMenu from "@/components/Features/auth/AuthMenu";
import { Menu } from "lucide-react";
import authBg from "@/assets/threads-auth-bg.png";
import QRCode from "react-qr-code";

export default function AuthLayout() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background p-4 text-foreground transition-colors duration-300">
      {/* Background Image */}
      <div className="absolute top-0 left-0 w-full overflow-hidden flex justify-center">
        <img
          src={authBg}
          alt="Threads Auth Background"
          className="max-w-none w-[120%] -translate-y-[30%] object-cover opacity-100 dark:opacity-80"
        />
      </div>

      {/* Appearance Toggle Button */}
      <div className="absolute bottom-4 left-4 z-50 lg:bottom-8 lg:left-8">
        <AuthMenu>
          <button className="flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-muted-foreground hover:bg-accent hover:text-accent-foreground transition-colors shadow-sm">
            <Menu className="h-5 w-5" />
          </button>
        </AuthMenu>
      </div>

      {/* Main Content Wrapper */}
      <div className="z-10 flex min-h-[90vh] w-full max-w-md flex-col justify-between">
        <div className="mt-24">
          <Outlet />
        </div>

        {/* Footer */}
        <div className="space-x-3 text-center text-xs text-muted-foreground">
          <span>© 2025</span>
          <a href="#" className="hover:underline">
            Threads Terms
          </a>
          <a href="#" className="hover:underline">
            Privacy Policy
          </a>
          <a href="#" className="hover:underline">
            Cookies Policy
          </a>
          <a href="#" className="hover:underline">
            Report a problem
          </a>
        </div>
      </div>

      {/* QR Code section */}
      <div className="absolute right-8 bottom-8 hidden lg:block hover:scale-110 duration-300 cursor-pointer ">
        <div className="mb-2 text-center text-sm text-muted-foreground font-semibold">
          Scan to get the app
        </div>
        <div className="overflow-hidden rounded-xl border-2 border-border bg-white p-4 shadow-lg transition-transform  origin-bottom-right">
          <QRCode
            value="https://threads.net"
            size={150}
            bgColor="#FFFFFF"
            fgColor="#000000"
            className="h-auto w-auto max-w-[120px]"
            viewBox={`0 0 150 150`}
          />
        </div>
      </div>
    </div>
  );
}
