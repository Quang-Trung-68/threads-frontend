import { Instagram } from "lucide-react";
import { useNavigate } from "react-router";
import { useTranslation } from "react-i18next";

export default function LoginActonCard() {
  const navigate = useNavigate();
  const { t } = useTranslation(["auth"]);

  const handleUserLogin = () => {
    navigate("/login");
  };

  const handleLoginInstagram = () => {
    return;
  };

  return (
    <div className="flex w-85 items-center justify-center">
      <div className="w-full max-w-md rounded-3xl border border-border bg-muted px-6 py-8 shadow-sm">
        {/* Title */}
        <h1 className="mb-3 text-center text-xl font-bold text-foreground">
          {t("auth:loginOrSignup")}
        </h1>

        {/* Subtitle */}
        <p className="mb-8 text-center text-muted-foreground">
          {t("auth:loginModalDescription")}
        </p>

        {/* Instagram Login Button */}
        <button
          onClick={handleLoginInstagram}
          className="mb-4 flex w-full cursor-pointer items-center justify-center gap-3 rounded-xl border border-border bg-card px-6 py-4 transition-colors hover:bg-accent"
        >
          <Instagram className="h-6 w-6" strokeWidth={2} />
          <div className="flex flex-col items-start">
            <span className="text-muted-foreground">{t("auth:continueWithInstagram")}</span>
            <span className="font-semibold text-foreground">dqt_2309</span>
          </div>
        </button>

        {/* Alternative Login Link */}
        <button
          onClick={handleUserLogin}
          className="w-full cursor-pointer py-3 text-center text-muted-foreground transition-colors hover:text-foreground"
        >
          {t("auth:loginWithUsername")}
        </button>
      </div>
    </div>
  );
}
