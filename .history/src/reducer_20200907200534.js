export default (state, action) => {
    switch(action.type) {
        case 'IS_AUTH':
            return {
                ...state,
                isAuth: true,
                userName: action.payload.userName,
                roomId: action.payload.roomId,
            }
        default:
            return state
    }
}