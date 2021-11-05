//@ts-ignore
// importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js");

//@ts-ignore
// importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js");

//@ts-ignore
// importScripts("https://www.gstatic.com/firebasejs/9.0.0/firebase-analytics-compat.js");

//@ts-ignore
importScripts("https://www.gstatic.com/firebasejs/8.8.1/firebase-app.js");

//@ts-ignore
importScripts("https://www.gstatic.com/firebasejs/8.8.1/firebase-messaging.js");

//@ts-ignore
importScripts("https://www.gstatic.com/firebasejs/8.8.1/firebase-analytics.js");

// Initialize the Firebase app in the service worker by passing in the
// messagingSenderId.
//@ts-ignore
firebase.initializeApp({
  apiKey: "AIzaSyDU-Dsgfm37Fa6WMUp5I9z7mEeiYv4_oXE",
  authDomain: "elearningappai.firebaseapp.com",
  databaseURL: "https://elearningappai.firebaseio.com",
  projectId: "elearningappai",
  storageBucket: "elearningappai.appspot.com",
  messagingSenderId: "1085887069523",
  appId: "1:1085887069523:web:667be36774dcaa681f75a6"
});

// Retrieve an instance of Firebase Messaging so that it can handle background
// messages.
const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message handler', payload)
  const { title, body } = payload.data;
  const notificationTitle = title;
  const notificationOptions = {
    body: body,
  }
  return self.registration.showNotification(notificationTitle, notificationOptions);
});

messaging.onBackgroundMessage((payload) => {
  console.log('[firebase-messaging-sw.js] Received background message', payload)
  const { title, body } = payload.data;
  const notificationTitle = title;
  const notificationOptions = {
    body: body,
  }

  return self.registration.showNotification(notificationTitle, notificationOptions)
})