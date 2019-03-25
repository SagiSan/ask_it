import { httpConf } from "./httpConf";

const initialState = {
  pendingRequest: false,
  loginSent: false,
  registerSent: false,
  requestFailed: false,
  user: {}
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_USER_FULFILLED":
      return {
        ...state,
        pendingRequest: false,
        loginSent: false,
        requestFailed: true,
        user: action.payload
      };
    case "USER_LOGIN_PENDING":
      return {
        ...state,
        pendingRequest: true,
        requestFailed: false,
        loginSent: false
      };
    case "USER_LOGIN_FULFILLED":
      if (action.payload.message) {
        alert(action.payload.message);
        return {
          ...state,
          pendingRequest: false,
          loginSent: false,
          requestFailed: true
        };
      }
      localStorage.setItem("token", action.payload.token);
      localStorage.setItem('user_id', action.payload.userID);
      return {
        ...state,
        pendingRequest: false,
        loginSent: true,
        user: { ...action.payload }
      };
    case "USER_LOGIN_REJECTED":
      if (action.payload && action.payload.message) {
        alert(action.payload.message);
      }
      return {
        ...state,
        pendingRequest: false,
        loginSent: false,
        requestFailed: true
      };
    case "USER_REGISTER_PENDING":
      return {
        ...state,
        pendingRequest: true,
        requestFailed: false,
        registerSent: false
      };
    case "USER_REGISTER_FULFILLED":
      if (action.payload.message) {
        alert(action.payload.message);
        return {
          ...state,
          pendingRequest: false,
          registerSent: false,
          requestFailed: true
        };
      }
      return {
        ...state,
        pendingRequest: false,
        registerSent: true
      };
    case "USER_REGISTER_REJECTED":
      if (action.payload && action.payload.message) {
        alert(action.payload.message);
      }
      return {
        ...state,
        pendingRequest: false,
        registerSent: false,
        requestFailed: true
      };
    default:
      return state;
  }
}
export function getUser(user_id) {
  return {
    type: 'GET_USER',
    payload: httpConf.get(`http://localhost:1337/user/${user_id}`).then(res => res.data)
  }
}
export function login(email, password) {
  return dispatch => {
    dispatch({ type: "USER_LOGIN_PENDING" });
    return httpConf
      .post("http://localhost:1337/user/login", {
        email,
        password
      })
      .then(response => response.data)
      .then(response => {
        dispatch({ type: "USER_LOGIN_FULFILLED", payload: response });
      })
      .catch(error => {
        dispatch({ type: "USER_LOGIN_REJECTED", payload: error.response.data });
      });
  };
}
export function register(email, password) {
  return dispatch => {
    dispatch({ type: "USER_REGISTER_PENDING" });
    return httpConf
      .post("http://localhost:1337/user", {
        email,
        password
      })
      .then(response => response.data)
      .then(response => {
        dispatch({ type: "USER_REGISTER_FULFILLED", payload: response });
      })
      .catch(error => {
        dispatch({
          type: "USER_REGISTER_REJECTED",
          payload: error
        });
      });
  };
}

export function logout() {
  return { type: "LOG_OUT" };
}
