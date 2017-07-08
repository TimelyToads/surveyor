let modifyState = (state, action) => {
  switch(action.type) {

    case 'DRAG_ENTER':
      var newState = Object.assign({}, state);
      newState.dropzoneActive = true;
      newState.activateBlur = true;
      return newState;
    
    case 'DRAG_LEAVE':
      var newState = Object.assign({}, state);
      newState.dropzoneActive = false;
      newState.activateBlur = false;
      return newState;

    case 'ACTIVATE_BLUR':
      var newState = Object.assign({}, state);
      newState.activateBlur = true;
      return newState;

    case 'DEACTIVATE_BLUR':
      var newState = Object.assign({}, state);
      newState.activateBlur = false;
      return newState;

    case 'SEARCH_JOBS':
      var newState = Object.assign({}, state);
      newState.jobs = action.jobs;
      return newState;

    case 'LOAD_PREVOUS_RESUME':
      var newState = Object.assign({}, state);
      newState.loadingPreviousResume = true;
      return newState;

    case 'LOGIN_USER':
      var newState = Object.assign({}, state);
      newState.isAuthenticated = true;
      return newState;

    case 'LOGOUT_USER':
      var newState = Object.assign({}, state);
      newState.isAuthenticated = false;
      return newState;

    case 'SET_VIEW':
      var newState = Object.assign({}, state);
      newState.view = action.view;
      return newState;

    default:
      return state;
  }

}

export default modifyState;