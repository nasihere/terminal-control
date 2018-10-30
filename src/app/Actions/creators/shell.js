import { SHELL_OPEN } from "./../../ActionTypes"

export const open = (data) => {
    return { type: SHELL_OPEN, payload: data }
}