import { SHELL_OPEN }  from "./../ActionTypes"
let initialState = {}
export const shellReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHELL_OPEN:
            return { ...state, payload: action.payload }
        default:
            return state;
    }
}