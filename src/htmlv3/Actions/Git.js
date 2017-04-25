import {
	GIT_GET_ISWORKINGTREE,
	GIT_GET_BRANCHES
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
export const Get_Branches = (obj) => {
	return (dispatch) => {
		dispatch({
			type:    GIT_GET_BRANCHES,
			payload: {
				id:   obj.id,
				req:  "git",
				port: obj.Port,
				gitreq:"getBranches",
				cmd:  {
					pwd:  obj.cd,
					name: obj.name
				}

			}
		})
	}
};


