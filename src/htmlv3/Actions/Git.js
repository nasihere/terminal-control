import {
	GIT_GET_ISWORKINGTREE
} from './ActionTypes'
export const Get_IsWorkingTree = (obj) => {
	return (dispatch) => {
		dispatch({
			type:    GIT_GET_ISWORKINGTREE,
			payload: {
				id:   obj.id,
				req:  "git",
				port: obj.Port,
				gitreq:"getIsWorkingTree",
				cmd:  {
					pwd:  obj.cd,
					name: obj.name
				}

			}
		})
	}
};
