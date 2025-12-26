import { useTranslation } from "react-i18next";

export default function NotFound() {
  const { t } = useTranslation(["auth"]);
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-background text-foreground p-4 text-center">
      <h1 className="text-4xl font-bold mb-4">{t("auth:notFoundTitle")} 😓</h1>
      <p className="text-muted-foreground mb-2">{t("auth:notFoundMessage")}</p>
      <p className="text-muted-foreground">
        {t("auth:notFoundTip")}
      </p>
    </div>
  );
}
