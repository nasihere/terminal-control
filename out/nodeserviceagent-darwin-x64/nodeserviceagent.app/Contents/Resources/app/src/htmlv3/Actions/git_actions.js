import {
	GIT_GET_ISWORKINGTREE,
	GIT_GET_BRANCHES,
	GIT_GET_WORKINGBRANCH,
	GIT_GET_REMOTEBRANCHES,
	GIT_GET_STATUS,
    GIT_GET_PULL
} from './ActionTypes'

function getObj(type,gitreq,obj){
	let returnObj={
		type,
		payload: {
			id			: obj.id,
			req			: "git",
			port		: obj.Port,
            branchName	: obj.branchName,
			gitreq,
			cmd:  {
				pwd		:  obj.cd,
				name	: obj.name
			}

		}
	}
	return returnObj;
}


export const Get_IsWorkingTree = (obj) => {
	return (dispatch) => {
		dispatch(getObj(GIT_GET_ISWORKINGTREE,"getIsWorkingTree",obj))
	}
};
export const Get_Branches = (obj) => {
	return (dispatch) => {
		dispatch(getObj(GIT_GET_BRANCHES,"getBranches",obj))
	}
};
export const Get_WorkingBranch = (obj) => {
	return (dispatch) => {
		dispatch(getObj(GIT_GET_WORKINGBRANCH,"getWorkingBranch",obj))
	}
};
export const Get_RemoteBranches = (obj) => {
	return (dispatch) => {
		dispatch(getObj(GIT_GET_REMOTEBRANCHES,"getRemoteBranches",obj))
	}
};
export const Get_Status = (obj) => {
	return (dispatch) => {
		dispatch(getObj(GIT_GET_STATUS,"getStatus",obj))
	}
};

export const Get_Pull = (obj) => {
    return (dispatch) => {
        dispatch(getObj(GIT_GET_PULL,"getPull",obj))
    }
};


