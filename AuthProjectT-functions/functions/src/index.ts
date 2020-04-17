import * as functions from 'firebase-functions';
import * as admin from 'firebase-admin';
import {DependencyFactory} from './dependency-factory';

const serviceAccount = require('../secret.json');
const difa = new DependencyFactory();

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://t-auth-project.firebaseio.com'
});

exports.userDeleted = functions.firestore
  .document('users/{uid}')
  .onDelete((snap, context) => {
    return difa.getUserController().deletedUsers(snap, context);
  });

/*
exports.productWritten = functions.firestore
  .document('products/{uid}')
  .onWrite((snap, context) => {
    return difa.getProductController().writtenProducts(snap, context);
  });
 */

exports.productCreated = functions.firestore
  .document('products/{uid}')
  .onCreate((snap, context) => {
    return difa.getProductController().createdProduct(snap, context);
  });

exports.productUpdated = functions.firestore
  .document('products/{uid}')
  .onUpdate((snap, context) => {
    return difa.getProductController().updatedProducts(snap, context);
  });

exports.addOrderRemovesStock = functions.firestore
  .document('orders/{uid}')
  .onCreate((snap, context) => {
    return difa.getOrderController().executeOrder(snap, context);
  });
