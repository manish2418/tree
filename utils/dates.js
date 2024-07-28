export function getDatesBetween(startDate, endDate) {
    const dateArray = [];
    let currentDate = new Date(startDate);
  
    while (currentDate <= endDate) {
      dateArray.push(new Date(currentDate));
      currentDate.setDate(currentDate.getDate() + 1);
    }
  
    return dateArray;
  }