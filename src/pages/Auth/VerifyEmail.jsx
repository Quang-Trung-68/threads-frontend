import { Spinner } from "@/components/Common/ui/spinner";
import { useVerifyEmailMutation } from "@/services/authService";
import { notifySooner } from "@/utils/notifySooner";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";

export default function VerifyEmail() {
  const { t } = useTranslation(["auth", "common"]);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState(t("auth:verifyingEmail"));
  const [verifyEmailApi, { isError, isLoading }] = useVerifyEmailMutation();

  const onVerifyEmail = useCallback(
    async function onVerifyEmail() {
      try {
        const response = await verifyEmailApi({ token });
        notifySooner.success(t("auth:verifySuccess"));
        setStatus(t("auth:verifySuccess"));
      } catch (error) {
        console.log(error);
        notifySooner.error(t("auth:verifyError"));
        setStatus(t("auth:verifyError"));
      }
    },
    [token, verifyEmailApi],
  );

  useEffect(() => {
    try {
      onVerifyEmail();
    } catch (error) {
      console.log(error);
    }
  }, [onVerifyEmail]);

  return (
    <div className="text-foreground mb-8 flex flex-col items-center justify-between text-center transition-colors">
      <h1 className="mb-8 text-2xl font-semibold">{status}</h1>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="w-full">
          <div className="my-6 flex items-center gap-4">
            <div className="bg-border h-px flex-1"></div>
            <span className="text-muted-foreground text-sm">{t("auth:nextStep")}</span>
            <div className="bg-border h-px flex-1"></div>
          </div>

          <div className="mt-8">
            <button
              onClick={() => navigate("/")}
              className={`${isLoading ? "cursor-not-allowed opacity-50" : "cursor-pointer"} bg-primary text-primary-foreground rounded-2xl px-8 py-4 text-sm font-semibold transition-all hover:opacity-90`}
              disabled={isLoading}
            >
              {isLoading ? t("common:loading") : t("auth:goToThreads")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
