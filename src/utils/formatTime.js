import dayjs from "@/lib/dayjs";

export function formatTime(dateString) {
  const date = dayjs(dateString);
  const diffDays = dayjs().diff(date, "day");

  if (diffDays >= 28) {
    return date.format("MMM D");
  }

  return date.fromNow();
}
