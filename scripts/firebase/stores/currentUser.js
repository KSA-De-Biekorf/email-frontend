import { writable } from 'svelte/store'

/** The currently signed in user */
const currentUser = writable(null)

export default currentUser
