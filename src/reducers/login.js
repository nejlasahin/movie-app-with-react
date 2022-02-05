const SUCCESSFULL = "SUCCESSFULL";
const ERROR = "ERROR";

const successful = (isLogin = true) => ({
  type: SUCCESSFULL,
  payload: isLogin,
});

const error = (isLogin = false) => ({
  type: ERROR,
  payload: isLogin,
});

const loginReducer = (isLogin = false, action) => {
  switch (action.type) {
    case SUCCESSFULL:
      return action.payload;
    case ERROR:
      return action.payload;
    default:
      return isLogin;
  }
};

export default loginReducer;
export { successful, error };