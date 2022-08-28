import { initializeApp } from 'firebase/app';
// import { getFirestore, collection, getDocs, getStorage } from 'firebase/firestore/lite';
import { getStorage } from "firebase/storage";
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';

// TODO: Replace the following with your app's Firebase project configuration
const firebaseConfig = {
    apiKey: "AIzaSyC6ficlQvWLyJI_M8Alr-0hOHiCnkW6k7k",
    authDomain: "ncssg-27984.firebaseapp.com",
    projectId: "ncssg-27984",
    storageBucket: "ncssg-27984.appspot.com",
    messagingSenderId: "857164548773",
    appId: "1:857164548773:web:21d281f781befd6d111b4c",
    measurementId: "G-H70L9Z1TJQ",
};

const app = initializeApp(firebaseConfig);
export const firebaseStorage = getStorage(app);



// export default connectFirebase;