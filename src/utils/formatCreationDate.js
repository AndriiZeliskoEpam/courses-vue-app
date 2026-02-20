export const formatCreationDate = (date) => {
  const data = new Date(date);
  const day = String(data.getDate()).padStart(2, "0");
  const month = String(data.getMonth() + 1).padStart(2, "0");
  const year = data.getFullYear();
  return `${month}.${day}.${year}`;
};
