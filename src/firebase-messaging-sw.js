importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.5.0/firebase-messaging.js');

firebase.initializeApp({
    projectId: 'appsaluduab2',
    appId: '1:564102367220:web:8ca2cb94179edd11c95ba1',
    storageBucket: 'appsaluduab2.appspot.com',
    apiKey: 'AIzaSyBFDFNDa51YIGnVopCl8wnQvsmjk_TedNw',
    authDomain: 'appsaluduab2.firebaseapp.com',
    messagingSenderId: '564102367220',
});

const messaging = firebase.messaging();
