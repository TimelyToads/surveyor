let actions = {
   dragEnter: () => {
      return {
        type: 'DRAG_ENTER'
      }
    },

    dragLeave: () => {
      return {
        type: 'DRAG_LEAVE'
      }
    },

    searchJobs: (jobsArray) => {
      return {
        type: 'SEARCH_JOBS',
        jobs: jobsArray
      }
    },

    loadPreviousResume: () => {
      return {
        type: 'LOAD_PREVOUS_RESUME'
      }
    },

    loginUser: (userObj, newView) => {
      return {
        type: 'LOGIN_USER',
        user: userObj,
        view: newView
      }
    },

    logoutUser: () => {
      return {
        type: 'LOGOUT_USER'
      }
    },

    setView: (newView) => {
      return {
        type: 'SET_VIEW',
        view: newView
      }
    }
}




export default actions;