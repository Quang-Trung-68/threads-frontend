import dayjs from "@/lib/dayjs";
import i18next from "i18next";
import "dayjs/locale/vi";

export function formatTime(dateString) {
  const date = dayjs(dateString);
  const diffDays = dayjs().diff(date, "day");
  
  const currentLang = i18next.language;
  const locale = currentLang?.startsWith("vi") ? "vi" : "en";
  const localizedDate = date.locale(locale);

  if (diffDays >= 28) {
    return localizedDate.format("MMM D");
  }

  return localizedDate.fromNow();
}
