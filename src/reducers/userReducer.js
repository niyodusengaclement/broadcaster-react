const initState = {
  users: [],
  message: '',
  error: '',
}

const userReducer = (state = initState, action) => {
  switch (action.type) {
    case 'login_failed': 
      return {
        error: action.error
      }
    case 'registration_failed':
      return {
        error: action.error 
      }
  
    default:
      return state;
  }
}
export default userReducer;
