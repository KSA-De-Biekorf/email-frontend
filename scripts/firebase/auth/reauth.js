import { auth } from 'setup'
import { reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'

export function reAuthenticate(email, pass) {
    return new Promise(function(resolve, reject) {
        const user = auth.currentUser
        let cred = EmailAuthProvider.credential(email, pass)

        reauthenticateWithCredential(user, cred)
            .then(() => {
                resolve()
            }).catch((e) => {
                reject(e)
            })
    })
}
