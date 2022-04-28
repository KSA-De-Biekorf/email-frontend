import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

export let app;
export let auth;

/**
 * Set up firebase
 * @param {callback} ready 
 * @callback `ready`: called when setup has complete
 */
export function initFirebase(ready) {
    const firebaseConfig = {
        apiKey: "AIzaSyAQSXRnMxwxnE_ZK5r_KFYfIt4qFvvxqnE",
        authDomain: "ksa-auth.firebaseapp.com",
        projectId: "ksa-auth",
        storageBucket: "ksa-auth.appspot.com",
        messagingSenderId: "655545669713",
        appId: "1:655545669713:web:1b6df5bebdb527cd69c070"
    }

    app = initializeApp(firebaseConfig);

    auth = getAuth(app);

    ready();
}
