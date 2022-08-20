const INITIAL_STATE = {
    loggedInUser: {
        name: 'Guest',
        coins: 0,
        moves: null
    }
}

export function userReducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case 'SET_USER':
            return {
                ...state,
                loggedInUser: action.user
            }

        default:
           return state
    }
}