import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import "dayjs/locale/vi";

dayjs.extend(relativeTime);

function formatTime(dateString, lang) {
  const date = dayjs(dateString);
  const diffDays = dayjs().diff(date, "day");
  
  date.locale(lang);

  if (diffDays >= 28) {
    return date.format("MMM D");
  }

  // Current logic
  console.log(`[${lang}] Current: ${date.fromNow()}`);
  
  // Desired logic check
  // English: 3d
  // Vietnamese: 3n
}

// Mock test
const now = dayjs();
const threeDaysAgo = now.subtract(3, 'day');

formatTime(threeDaysAgo, 'en');
formatTime(threeDaysAgo, 'vi');
