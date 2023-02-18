importScripts(
  "https://www.gstatic.com/firebasejs/9.0.2/firebase-app-compat.js"
);
importScripts(
  "https://www.gstatic.com/firebasejs/9.0.2/firebase-messaging-compat.js"
);

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
console.log("at service wokrer");
const messaging = firebase.messaging();

messaging.onMessage((payload) => {
  console.log("Message received. Payload:", payload);
  // Display the notification
  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };
  if (Notification.permission === "granted") {
    // If the user has already granted permission to display notifications,
    // display the notification immediately
    new Notification(notificationTitle, notificationOptions).show();
  } else if (Notification.permission !== "denied") {
    // If the user has not granted or denied permission to display notifications,
    // request permission and display the notification if permission is granted
    Notification.requestPermission().then((permission) => {
      if (permission === "granted") {
        new Notification(notificationTitle, notificationOptions).show();
      }
    });
  }
});
