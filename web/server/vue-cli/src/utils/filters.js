import { format, fromUnixTime as fromUnixTimestamp } from "date-fns";

export function truncate(text, stop, clamp) {
  if (!text) return "";

  return text.slice(0, stop) + (stop < text.length ? clamp || "..." : "");
}

export function prettifyDate(date) {
  return date.split(/[.]+/)[0];
}

export function fromUnixTime(
  timestamp,
  dateFormat = "yyyy-MM-dd HH:mm:ss"
) {
  return format(fromUnixTimestamp(timestamp), dateFormat);
}