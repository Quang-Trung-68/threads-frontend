import resetPasswordSchema from "@/schemas/resetPasswordSchema";

import {
  useResetPasswordMutation,
  useValidateResetTokenQuery,
} from "@/services/authService";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, useSearchParams } from "react-router";
import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";

import { Eye, EyeOff } from "lucide-react";
import { useDebouncedField } from "@/hooks/useDebouncedField";
import { Spinner } from "@/components/Common/ui/spinner";
import { notifySooner } from "@/utils/notifySooner";

export default function ResetPassword() {
  const { t } = useTranslation(["auth"]);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    mode: "onChange",
  });

  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const [status, setStatus] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isValidToken, setIsValidToken] = useState(false);

  const navigate = useNavigate();

  const [resetPasswordApi, { isLoading, isSuccess }] =
    useResetPasswordMutation();
  const {
    data: validTokenData,
    isError: isErrorValidToken,
    isLoading: isLoadingValidToken,
    isSuccess: isSuccessValidToken,
  } = useValidateResetTokenQuery({ token });

  useEffect(() => {
    if (validTokenData) {
      if (validTokenData.valid && isSuccessValidToken) {
        setIsValidToken(true);
        setStatus(t("auth:enterNewPassword"));
      } else if (!validTokenData.valid || isErrorValidToken) {
        setIsValidToken(false);
        setStatus(
          t("auth:tokenInvalid"),
        );
      }
    }
  }, [validTokenData, isSuccessValidToken, isErrorValidToken]);

  const onSubmit = async (credentials) => {
    try {
      await resetPasswordApi(credentials);
      setStatus(t("auth:resetSuccess"));
      navigate("/login", {
        state: {
          message: t("auth:createNewPasswordSuccess"),
        },
      });
    } catch (error) {
      notifySooner.error(t("auth:registerError"));
      console.log(error);
    }
  };

  // Debounced input
  const passwordChange = useDebouncedField(setValue, "password", 800);
  const passwordConfirmationChange = useDebouncedField(
    setValue,
    "password_confirmation",
    800,
  );

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-background text-foreground">
      {/* Main register container */}
      <div className="z-10 w-full max-w-md">
        <div className="mb-2 min-h-[80vh] text-center">
          <h1 className="mb-8 text-2xl font-semibold">{t("auth:resetPassword")}</h1>
          <div className="mb-8 text-sm text-primary italic">{status}</div>
          {isLoadingValidToken && (
            <div className="flex flex-col items-center justify-center gap-4">
              <span>{t("auth:checkingInfo")}</span>
              <Spinner />
            </div>
          )}
          {isSuccessValidToken && isValidToken && (
            <div>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                {/* Token */}
                <div className="text-left">
                  <input
                    type="text"
                    hidden
                    {...register("token")}
                    defaultValue={token}
                    className="w-full rounded-xl border border-border bg-muted px-4 py-3 transition-colors focus:border-ring focus:outline-none"
                  />
                  {errors.token && (
                    <span className="mt-1 block text-sm text-red-500">
                      {errors.token.message}
                    </span>
                  )}
                </div>

                {/* Password */}
                <div className="text-left">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder={t("auth:password")}
                      {...register("password")}
                      onChange={(e) => passwordChange(e.target.value)}
                      className="w-full rounded-xl border border-border bg-muted px-4 py-3 transition-colors focus:border-ring focus:outline-none"
                    />
                    <span
                      className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                  </div>
                  {errors.password && (
                    <span className="mt-1 block text-sm text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </div>

                {/* Confirm Password */}
                <div className="text-left">
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      placeholder={t("auth:confirmPassword")}
                      {...register("password_confirmation")}
                      onChange={(e) =>
                        passwordConfirmationChange(e.target.value)
                      }
                      className="w-full rounded-xl border border-border bg-muted px-4 py-3 transition-colors focus:border-ring focus:outline-none"
                    />
                    <span
                      className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </span>
                  </div>
                  {errors.password_confirmation && (
                    <span className="mt-1 block text-sm text-red-500">
                      {errors.password_confirmation.message}
                    </span>
                  )}
                </div>

                <button
                  type="submit"
                  className="mt-6 w-full cursor-pointer rounded-xl bg-primary py-3 font-medium text-primary-foreground transition-colors hover:bg-primary/90"
                  disabled={isLoading || isSuccess}
                >
                  {t("auth:resetPassword")}
                </button>
              </form>

              <div className="my-6 flex items-center gap-4">
                <div className="h-px flex-1 bg-border"></div>
                <span className="text-sm text-muted-foreground">{t("auth:or")}</span>
                <div className="h-px flex-1 bg-border"></div>
              </div>

              <div className="mt-2">
                <button
                  onClick={() => navigate("/login")}
                  className="cursor-pointer text-sm text-muted-foreground hover:text-foreground"
                >
                  <span className="cursor-pointer font-medium">
                    {t("auth:backToLogin")}
                  </span>
                </button>
              </div>
            </div>
          )}
          {isSuccessValidToken && !isValidToken && (
            <div>
              <div className="mt-2">
                <button
                  onClick={() => navigate("/login")}
                  className="w-full cursor-pointer rounded-2xl bg-primary py-3 text-sm text-primary-foreground hover:bg-primary/90"
                >
                  <span className="cursor-pointer font-medium">
                    {t("auth:backToLogin")}
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
