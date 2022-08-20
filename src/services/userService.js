import {storageService} from './storageService.js'

export const userService = {
    getUser,
    signup
}

const USER_KEY = 'bitcoin_user'

function signup(name) {
    const newUser = {
        name,
        coins: 100,
        moves: []
    }
    storageService.store(USER_KEY, newUser)
    return newUser
}

function getUser() {
    return storageService.load(USER_KEY)
}