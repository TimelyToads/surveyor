let dragEnter = () => {
  return {
    type: 'DRAG_ENTER'
  }
}

let dragLeave = () => {
  return {
    type: 'DRAG_LEAVE'
  }
}

let activateBlur= () => {
  return {
    type: 'ACTIVATE_BLUR'
  }
}

let deactivateBlur= () => {
  return {
    type: 'DEACTIVATE_BLUR'
  }
}

let searchJobs = (jobsArray) => {
  return {
    type: 'SEARCH_JOBS',
    jobs: jobsArray
  }
}

let loadPreviousResume = () => {
  return {
    type: 'LOAD_PREVOUS_RESUME'
  }
}

let loginUser = () => {
  return {
    type: 'LOGIN_USER'
  }
}

let logoutUser = () => {
  return {
    type: 'LOGOUT_USER'
  }
}

let setView = (newView) => {
  return {
    type: 'SET_VIEW',
    view: newView
  }
}

export {
  dragEnter, 
  dragLeave, 
  searchJobs, 
  loadPreviousResume,
  loginUser,
  logoutUser,
  setView
}