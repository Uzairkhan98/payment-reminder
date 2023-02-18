import firebase from "firebase/app";
import "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyDpt7ZEvole66e39py_xHUjxOW_XT1o1wc",
  authDomain: "payment-reminder-59f58.firebaseapp.com",
  projectId: "payment-reminder-59f58",
  storageBucket: "payment-reminder-59f58.appspot.com",
  messagingSenderId: "604631456151",
  appId: "1:604631456151:web:7ef61c431dcf5b1c1cccd2",
  measurementId: "G-JF02Z7F63N",
};

firebase.initializeApp(firebaseConfig);

const messaging = firebase.messaging();

messaging.onMessage((payload) => {
  console.log("Message received. ", payload);
  // Add code to handle the received message
});
