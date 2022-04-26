import { auth } from './setup'
import { updatePassword, sendPasswordResetEmail } from 'firebase/auth'

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
