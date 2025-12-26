import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import updateLocale from "dayjs/plugin/updateLocale";

import "dayjs/locale/vi";

dayjs.extend(relativeTime);
dayjs.extend(updateLocale);

dayjs.updateLocale("en", {
  relativeTime: {
    future: "in %s",
    past: "%s",
    s: "now",
    m: "1m",
    mm: "%dm",
    h: "1h",
    hh: "%dh",
    d: "1d",
    dd: "%dd",
    M: "1mo",
    MM: "%dmo",
    y: "1y",
    yy: "%dy",
  },
});

dayjs.updateLocale("vi", {
  relativeTime: {
    future: "trong %s",
    past: "%s",
    s: "vừa xong",
    m: "1p",
    mm: "%dp",
    h: "1g",
    hh: "%dg",
    d: "1n",
    dd: "%dn",
    M: "1th",
    MM: "%dth",
    y: "1năm",
    yy: "%dnăm",
  },
});

export default dayjs;
