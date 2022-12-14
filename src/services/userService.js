import { storageService } from './storageService.js'

export const userService = {
  getUser,
  signup,
  saveUser,
  signout
}

const USER_KEY = 'bitcoin_user'

function signup(name) {
  const newUser = {
    name,
    coins: 100,
    moves: [],
  }
  storageService.store(USER_KEY, newUser)
  return newUser
}

function signout() {
  storageService.store(USER_KEY, null)
}

function saveUser(user) {
  storageService.store(USER_KEY, user)
  return user
}

function getUser() {
  return storageService.load(USER_KEY)
}
