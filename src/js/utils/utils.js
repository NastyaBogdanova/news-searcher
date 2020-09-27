function changeTodayDate() {
    let dateFrom = new Date();
    const sixDaysAgo = 6;
    dateFrom.setDate(dateFrom.getDate() - sixDaysAgo);
    return dateFrom;
  }

function fixDate(date) {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const newDate = new Date(date).toLocaleString("ru-RU", options);
    return newDate.slice(0, -2);
  }

function firstLetterToUpperCase(str) {
    return str[0].toUpperCase() + str.slice(1);
}

export { changeTodayDate, fixDate, firstLetterToUpperCase };




