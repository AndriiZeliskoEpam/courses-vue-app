export const getCurrentDateFormatted = () => {
  var date = new Date();
  var day = String(date.getDate()).padStart(2, '0');
  var month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
  var year = date.getFullYear();

  return month + '/' + day + '/' + year;
}