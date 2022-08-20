export function setUser(user) {
    return async (dispatch) => {
        dispatch({ type: 'SET_USER', user})
    }
}