import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from './setup'

export function signIn(usr) {
    signInWithEmailAndPassword(auth, usr.usr, usr.pwd)
        .then((userCred) => {
            // const user = userCred.user
        })
        .catch((err) => {
            console.log(err.code, err.message)
        })
}
