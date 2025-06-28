export function formatDate(date: string, includeRelative = false) {
  const currentDate = new Date();
  if (!date.includes("T")) {
    date = `${date}T00:00:00`;
  }
  const targetDate = new Date(date);

  const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
  const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
  const daysAgo = currentDate.getDate() - targetDate.getDate();

  let formattedDate = "";

  if (yearsAgo > 0) {
    formattedDate = `${yearsAgo}y ago`;
  } else if (monthsAgo > 0) {
    formattedDate = `${monthsAgo}mo ago`;
  } else if (daysAgo > 0) {
    formattedDate = `${daysAgo}d ago`;
  } else {
    formattedDate = "Today";
  }

  const fullDate = targetDate.toLocaleString("en-us", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  if (!includeRelative) {
    return fullDate;
  }

  return `${fullDate} (${formattedDate})`;
}

/**
 * A function to format the date and time with appropriate granularity.
 * This function takes a date string and returns a more intuitive, human-readable format.
 * Example: 2022-03-28T00:00:00.000Z => '2 weeks ago'
 * @param date the date string to be formatted
 * @returns the formatted date
 */
export function formatDateEditor(
  date: string,
  isNormalDate?: boolean,
  withTime = false,
): string {
  if (isNormalDate) {
    const dateOptions: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "long",
      day: "numeric",
      ...(withTime && { hour: "numeric", minute: "numeric", hour12: true }),
    };
    return new Date(date).toLocaleDateString("en-US", dateOptions);
  }

  const now = new Date().getTime();
  const givenDate = new Date(date).getTime();
  const diff = now - givenDate;
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  const timeSuffix = withTime
    ? ` at ${new Date(givenDate).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      })}`
    : "";

  const weeks = Math.floor(days / 7);
  const months = Math.floor(days / 30);
  const years = Math.floor(days / 365);

  switch (true) {
    case days === 0:
      return `Today${timeSuffix}`;

    case days === 1:
      return `Yesterday${timeSuffix}`;

    case days >= 2 && days <= 5:
      return `${days} days ago${timeSuffix}`;

    case days >= 6 && days <= 12:
      return `${weeks} weeks ago${timeSuffix}`;

    case days >= 13 && days <= 17:
      return `${weeks} weeks ago${timeSuffix}`;

    case weeks > 2 && weeks < 4:
      return `3 weeks ago${timeSuffix}`;

    case days >= 25 && days <= 35:
      return `1 month ago${timeSuffix}`;

    case months >= 2 && months <= 11:
      return `${months} months ago${timeSuffix}`;

    case years === 1:
      return `1 year ago${timeSuffix}`;

    case years > 1:
      return `${years} years ago${timeSuffix}`;

    default:
      return `${days} days ago${timeSuffix}`;
  }
}

/**
 *
 * @param date the date to be formatted, defaults to the current date
 * @returns a compact date string in the format dd-mm-yy-hh-min
 * Example: 2022-03-28T00:00:00.000Z => '28-03-22-00-00'
 */
export function formatCompactDate(date = new Date()): string {
  const d = new Date(date);
  const dd = d.getDate().toString().padStart(2, "0");
  const mm = (d.getMonth() + 1).toString().padStart(2, "0");
  const yy = d.getFullYear().toString().slice(-2);
  const hh = d.getHours().toString().padStart(2, "0");
  const min = d.getMinutes().toString().padStart(2, "0");
  return `${dd}-${mm}-${yy}-${hh}-${min}`;
}
