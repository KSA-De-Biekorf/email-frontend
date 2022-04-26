import { auth } from './setup'

export async function retrieveAuthToken() {
    // again, try catch is evil
    try {
        let token = await auth.currentUser.getIdToken(true)
        return token
    } catch (err) {
        throw err
    }
}