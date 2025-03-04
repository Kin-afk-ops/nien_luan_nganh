const formatDate = (date: Date): string => {
  const formattedDate = date.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "numeric",
    year: "numeric",
  });
  return formattedDate;
};

export default formatDate;
