import * as functions from 'firebase-functions';
import moment = require('moment')

export const policyPeriod = functions.https.onRequest((request, response): void => {
  const dateFrom = moment(request.query.dateFrom as string, 'YYYY-MM-DD')
  let dateTo = moment(request.query.dateTo as string, 'YYYY-MM-DD')
  const period: string = request.query.period as string;
  
  if (period) {
    switch (period) {
      case '1 Month':
        dateTo = moment(dateFrom).add(1, 'M').subtract(1, 'd')
      case '2 Month':
        dateTo = moment(dateFrom).add(2, 'M').subtract(1, 'd')
      case '3 Month':
        dateTo = moment(dateFrom).add(3, 'M').subtract(1, 'd')
      case '4 Month':
        dateTo = moment(dateFrom).add(4, 'M').subtract(1, 'd')
      case '5 Month':
        dateTo = moment(dateFrom).add(5, 'M').subtract(1, 'd')
      case '6 Month':
        dateTo = moment(dateFrom).add(6, 'M').subtract(1, 'd')
      case '7 Month':
        dateTo = moment(dateFrom).add(7, 'M').subtract(1, 'd')
      case '8 Month':
        dateTo = moment(dateFrom).add(8, 'M').subtract(1, 'd')
      case '9 Month':
        dateTo = moment(dateFrom).add(9, 'M').subtract(1, 'd')
      case '10 Month':
        dateTo = moment(dateFrom).add(10, 'M').subtract(1, 'd')
      case '11 Month':
        dateTo = moment(dateFrom).add(11, 'M').subtract(1, 'd')
      case '1 Year':
        dateTo = moment(dateFrom).add(1, 'y').subtract(1, 'd')
    }
  }
  response.send(String(dateTo.diff(dateFrom, 'days') + 1))
});
