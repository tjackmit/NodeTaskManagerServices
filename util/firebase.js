import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import config from '../config.js';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Initialize Firebase
const firebase = initializeApp(config.firebaseConfig)
// const analytics = getAnalytics(firebase);

export default firebase;