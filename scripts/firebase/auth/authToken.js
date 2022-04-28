import { auth } from './setup'

/**
 * Retrieve the auth token use for authentication on the backend
 * @returns `authToken`: string
 * @throws if fails to retrieve token from Firebase
 */
export async function retrieveAuthToken() {
    // again, try catch is evil
    try {
        let token = await auth.currentUser.getIdToken(true)
        return token
    } catch (err) {
        throw err
    }
}
