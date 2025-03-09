const formatDateToInput = (date: string): string => {
  const [day, month, year] = date.split("/");

  if (!day || !month || !year) {
    throw new Error("Invalid date format. Expected dd/MM/yyyy");
  }

  return `${year}-${month.padStart(2, "0")}-${day.padStart(2, "0")}`;
};

export default formatDateToInput;
