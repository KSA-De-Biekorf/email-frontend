import { auth } from './setup'
import { updatePassword, sendPasswordResetEmail } from 'firebase/auth'

/**
 * Change the user's password (must reauthenticate first)
 * @see reauth.js
 * @param {string} password: string
 * @returns a {promise}
 */
export function changePwd(password) {
    return new Promise((resolve, reject) => {
        const user = auth.currentUser

        const newPassword = password
        
        updatePassword(user, newPassword)
            .then(() => {
                resolve()
            }).catch((e) => {
                reject(e)
            })
    })
}

// TODO: paswd resetz
