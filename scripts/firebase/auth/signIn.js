import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from './setup'

/** Signs in the usr, returning a promise
 * @param `usr`: { usr: "email", pwd: "password" }
 * @returns a promise
 */
export function signIn(usr) {
    return new Promise((resolve, reject) => {
        signInWithEmailAndPassword(auth, usr.usr, usr.pwd)
        .then((userCred) => {
            resolve(userCred)
        })
        .catch((err) => {
            reject(err)
        })
    })
}
