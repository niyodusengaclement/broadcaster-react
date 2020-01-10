export const loginFail = (error) => {
  return {
    type: 'login_failed',
    error
  }
} 
export const signupFail = (error) => {
  return {
    type: 'registration_failed',
    error
  }
}