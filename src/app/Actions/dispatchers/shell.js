import { open } from "./../creators"

export const runShell = (data) => dispatch => {
    dispatch(open(data));
}