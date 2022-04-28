import { onAuthStateChanged } from "firebase/auth"
import { auth } from './setup'
import currentUser from '../stores/currentUser'

/**
 * Listens for auth changes and reflects those changes in the `currentUser` store
 * @param {callback} ready: called when the auth listener has started
 */
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
