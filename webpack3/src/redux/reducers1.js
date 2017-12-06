
function setLeftMenuShowState(state=true,action) {
	if(action.type == 'leftMenuShowState'){
		return action.leftMenuShowState;
	}
	return state;
}

export default {
	setLeftMenuShowState
}