importScripts('https://www.gstatic.com/firebasejs/5.9.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.9.1/firebase-messaging.js');
var config = {
  apiKey: "AIzaSyAymN5MHgiYZhtJeaTQC0fnIRtnLtvwCjo",
  authDomain: "hola-mundo-4d9d2.firebaseapp.com",
  databaseURL: "https://hola-mundo-4d9d2.firebaseio.com",
  projectId: "hola-mundo-4d9d2",
  storageBucket: "hola-mundo-4d9d2.appspot.com",
  messagingSenderId: "858814569446", //Id del remitente
};
firebase.initializeApp(config);
const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function(payload) {
 const title = 'Hola a todos';
 const options = {
  body: payload.data.body
 };
 return self.registration.showNotification(title, options);
});
