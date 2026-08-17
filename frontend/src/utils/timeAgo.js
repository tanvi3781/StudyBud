function timeAgo(date) {
  const now = new Date();
  const created = new Date(date);

  const diffInSeconds = Math.floor((now - created) / 1000);

  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const weeks = Math.floor(days / 7);

  if (weeks > 0) {
    const remainingDays = days % 7;

    if (remainingDays > 0) {
      return `${weeks} week${weeks !== 1 ? "s" : ""}, ${remainingDays} day${remainingDays !== 1 ? "s" : ""} ago`;
    }

    return `${weeks} week${weeks !== 1 ? "s" : ""} ago`;
  }

  if (days > 0) {
    const remainingHours = hours % 24;

    if (remainingHours > 0) {
      return `${days} day${days !== 1 ? "s" : ""}, ${remainingHours} hour${remainingHours !== 1 ? "s" : ""} ago`;
    }

    return `${days} day${days !== 1 ? "s" : ""} ago`;
  }

  if (hours > 0) {
    const remainingMinutes = minutes % 60;

    if (remainingMinutes > 0) {
      return `${hours} hour${hours !== 1 ? "s" : ""}, ${remainingMinutes} minute${remainingMinutes !== 1 ? "s" : ""} ago`;
    }

    return `${hours} hour${hours !== 1 ? "s" : ""} ago`;
  }

  if (minutes > 0) {
    return `${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  }

  return "0 minutes ago";
}

export default timeAgo;