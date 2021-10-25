const sample1 = "2021-10-29T03:43:23.000Z"
const sample2 = "2021-11-01T03:43:25.000Z"

const convertDate = (date) => {
  let x = 0;
  let year = "";
  while (x <= 3) {
    year += date[x]
    x++
  }
  x = 5;
  let month = '';
  while (x <= 6) {
    month += date[x]
    x++
  }
  x = 8;
  let day = ''
  while (x <= 9) {
    day += date[x]
    x++
  }
  
  const output = new Date(parseInt(year), parseInt(month), parseInt(day));
  return output
};


const dayDiff = (firstDate, secondDate) => {
  const date1 = convertDate(firstDate);
  const date2 = convertDate(secondDate);

  // One day in milliseconds
  const oneDay = 1000 * 60 * 60 * 24;

  // Calculating the time difference between two dates
  const diffInTime = date2.getTime() - date1.getTime();

  // Calculating the no. of days between two dates
  const diffInDays = Math.round(diffInTime / oneDay);

  return diffInDays + 1;
}

module.exports = dayDiff;