import { onAuthStateChanged } from "firebase/auth"
import { auth } from './setup'
import currentUser from '../stores/currentUser'

export function startAuthListener(ready) {
    onAuthStateChanged(auth, (user) => {
        if (user) { // user not null
            console.log("User signed in")
            currentUser.set({
                name: user.displayName,
                email: user.email,
                uid: user.uid
            })
        } else {
            console.log("User signed out")
            currentUser.set(null)
        }
        ready()
    })
}
