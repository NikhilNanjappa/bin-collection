const { DateTime } = require('luxon')

// Gets the next collection dates for each bins
function getNextCollectionDates(groupedDates) {
  const today = DateTime.local()
  const nextDates = {
    grey: null, 
    green: null,
    brown: null
  }

  for (let month in groupedDates) {
    for (let item of groupedDates[month]) {
      const dt = DateTime.fromISO(item.date)

      if (dt > today) {
        if (item.color === 'grey') {
          if (!nextDates.grey || dt < nextDates.grey) {
            nextDates.grey = dt.toISODate()
          }
        } else if (item.color === 'green') {
          if (!nextDates.green || dt < nextDates.green) {
            nextDates.green = dt.toISODate()
          }
        } else if (item.color === 'brown') {
          if (!nextDates.brown || dt < nextDates.brown) {
            nextDates.brown = dt.toISODate()
          }
        }
      }
    }
  }

  return nextDates
}

// Gets only the immediate next collection bin
function getNextCollection(groupedDates) {
  let nextDate = null
  let nextColor = null
  const today = DateTime.local()
  const tomorrow = today.plus({ days: 1 })

  for (let month in groupedDates) {
    for (let item of groupedDates[month]) {
      const dt = DateTime.fromISO(item.date)

      if (dt > today && (!nextDate || dt < nextDate)) {
        nextDate = dt
        nextColor = item.color
      }
    }
  }

  return {
    date: nextDate.toISODate(),
    color: nextColor,
    readable: nextDate.hasSame(today, 'day')
      ? 'Today'
      : nextDate.hasSame(tomorrow, 'day')
        ? 'Tomorrow'
        : null
  }
}

function getBinCollectionDates(year = DateTime.local().year) {
  const dates = [];

  // Create DateTime for first day of year
  let currentDate = DateTime.local(year, 1, 1)

  // Loop through all days of the year
  while (currentDate.year === year) {
    // Check for green bin (Wednesdays)
    if (currentDate.weekday === 3 && currentDate.weekNumber % 2 === 1) {
      dates.push({ date: currentDate.toISODate(), color: 'green' })
    }
    
    // Check for grey bin (Wednesdays on alternate weeks)
    if (currentDate.weekday === 3 && currentDate.weekNumber % 2 === 0) {
      dates.push({ date: currentDate.toISODate(), color: 'grey' })
    }
    
    // Check for brown bin (Mondays on alternate weeks)
    if (currentDate.weekday === 1 && currentDate.weekNumber % 2 === 1) {
      dates.push({ date: currentDate.toISODate(), color: 'brown' })
    }

    // Increment date by 1 day
    currentDate = currentDate.plus({ days: 1 })
  }

  // Group dates by month
  const groupedDates = dates.reduce((acc, dateObj) => {
    const dt = DateTime.fromISO(dateObj.date)

    if (!acc[dt.monthLong]) {
      acc[dt.monthLong] = []
    }

    acc[dt.monthLong].push({ date: dateObj.date, color: dateObj.color });

    return acc
  }, {})

  // Print grouped dates
  // Object.entries(groupedDates).forEach(([month, monthDates]) => {
  //   console.log(month)
    
  //   monthDates.forEach(date => {
  //     console.log('- ' + date) 
  //   })
  // })

  return groupedDates;
}

module.exports = {
  getNextCollectionDates,
  getNextCollection,
  getBinCollectionDates,
}
