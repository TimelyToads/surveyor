let modifyState = (state, action) => {
  switch(action.type) {

    case 'DRAG_ENTER':
      var newState = Object.assign({}, state);
      newState.dropzoneActive = true;
      return newState;
    
    case 'DRAG_LEAVE':
      var newState = Object.assign({}, state);
      newState.dropzoneActive = false;
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
      newState.view = action.view;
      newState.user = action.user;
      return newState;

    case 'LOGOUT_USER':
      var newState = Object.assign({}, state);
      newState.isAuthenticated = false;
      newState.view = 'login';
      newState.user = {};
      return newState;

    case 'SET_VIEW':
      var newState = Object.assign({}, state);
      newState.view = action.view;
      return newState;
  
    case 'SET_JOB_APPLICATIONS':
      var newState = Object.assign({}, state);
      newState.apps = action.apps;
      return newState;

    default:
      return state;
  }

}

export default modifyState;