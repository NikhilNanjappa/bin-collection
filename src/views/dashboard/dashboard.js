import { DateTime } from 'luxon'

import { handleServiceResponse } from '../../lib/error-handler';
import { getNextCollection, getBinCollectionDates } from '../../lib/get-bin-collection-dates';

const get = async (req, res) => {
  try {
    const groupedDates = getBinCollectionDates()

    return res.render('dashboard', {
      pageData: {
        currentMonth: DateTime.local().toFormat('LLLL'),
        groupedDates,
        nextBin: getNextCollection(groupedDates) 
      },
    });
  } catch (err) {
    return handleServiceResponse(err, res, 'dashboard');
  }
};

export { get as default };
