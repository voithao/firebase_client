const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();
const moment = require('moment')
const stripe = require('stripe')(functions.config().stripe.token);

// When a user is created, register them with Stripe
export const createStripeCustomer = functions.auth.user().onCreate(async (user: any) => {
  const customer = await stripe.customers.create({email: user.email});
  return admin.firestore().collection('stripe_customers').doc(user.uid).set({customer_id: customer.id});
});

export const addPaymentSource = functions.firestore.document('/stripe_customers/{userId}/tokens/{pushId}')
  .onCreate(async (snap: any, context: any) => {
    const source = snap.data();
    const token = source.token;
    if (source === null){
      return null;
    }

    // TODO: introduce error reporting
    // try {
      const snapshot = await admin.firestore().collection('stripe_customers').doc(context.params.userId).get();
      const customer =  snapshot.data().customer_id;
      const response = await stripe.customers.createSource(customer, {source: token});
      return admin.firestore().collection('stripe_customers').doc(context.params.userId).collection("sources").doc(response.fingerprint).set(response, {merge: true});
    // } catch (error) {
    //   await snap.ref.set({'error': userFacingMessage(error) },{merge:true});
    //   return reportError(error, {user: context.params.userId});
    // }
});

export const policyPeriod = functions.https.onRequest((request: any, response: any): void => {
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
