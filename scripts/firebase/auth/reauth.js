import { auth } from 'setup'
import { reauthenticateWithCredential, EmailAuthProvider } from 'firebase/auth'

/**
 * Re-authenticate the user (login again)
 * @param {string} email: string
 * @param {string} pass: string
 * @returns a promise
 */
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
