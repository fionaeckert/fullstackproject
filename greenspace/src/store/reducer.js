const reducer = (state, action) => {
    if (state === undefined) {
        state = {
            users: []
        }
    }
    switch (action.type) {
        case "ADD_USER":
            return {
                ...state,
                users: state.users.concat(action.data)
            }
        default:
            return state
    }
}
export default reducer