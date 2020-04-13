// tslint:disable-next-line: no-implicit-dependencies
import chai = require('chai')
const assert = chai.assert;

// tslint:disable-next-line: no-implicit-dependencies
const sinon = require('sinon');

const admin = require('firebase-admin');
// tslint:disable-next-line: no-implicit-dependencies
const firebasetest = require('firebase-functions-test')();


// const functions = require('firebase-functions');

describe('Cloud Functions', () => {
  let myFunctions: any, adminInitStub: any;

  before(() => {
    adminInitStub = sinon.stub(admin, 'initializeApp');
    myFunctions = require('../src/index');
  });

  after(() => {
    adminInitStub.restore();
    firebasetest.cleanup();
  });

  describe('policyPeriod', () => {
    it('should return days between two dates', () => {
      const req = { query: {dateFrom: '2020-04-12', dateTo: '2020-04-13'} };
      const res = {
        send: (result: string) => {
          assert.equal(result, '2')
        }
      }
      myFunctions.policyPeriod(req, res)
    });

    it('should return 31 days from date with period on january month', () => {
      const req = { query: {dateFrom: '2020-01-01', period: '1 Month'} };
      const res = {
        send: (result: string) => {
          assert.equal(result, '31')
        }
      }
      myFunctions.policyPeriod(req, res)
    });
  });
});
