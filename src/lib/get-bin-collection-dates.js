const { DateTime } = require('luxon')

function getBinCollectionDates(year) {
  const dates = {
    grey: [],
    green: [],
    brown: []
  }

  // Create DateTime for first day of year
  let currentDate = DateTime.local(year, 1, 1)

  // Loop through all days of the year
  while (currentDate.year === year) {
    
    // Check for green bin (Wednesdays)
    if (currentDate.weekday === 3 && currentDate.weekNumber % 2 === 1) {
      dates.green.push(currentDate.toISODate()) 
    }
    
    // Check for grey bin (Wednesdays on alternate weeks)
    if (currentDate.weekday === 3 && currentDate.weekNumber % 2 === 0) {
      dates.grey.push(currentDate.toISODate())
    }
    
    // Check for brown bin (Mondays on alternate weeks)
    if (currentDate.weekday === 1 && currentDate.weekNumber % 2 === 1) {
      dates.brown.push(currentDate.toISODate())
    }

    // Increment date by 1 day
    currentDate = currentDate.plus({ days: 1 }) 
  }

  return dates
}

const dates = getBinCollectionDates(2023) 
console.log(dates)
