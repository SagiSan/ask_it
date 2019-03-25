import { httpConf } from "./httpConf";

const initialState = {
  pendingRequest: false,
  requestSent: false,
  requestFailed: false,
  selectedQuestion: {},
  answers: []
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_QUESTION_PENDING":
      return {
        ...state,
        pendingRequest: true,
        requestFailed: false,
        requestSent: false
      };
    case "GET_QUESTION_FULFILLED":
      if (action.payload.message) {
        alert(action.payload.message);
        return {
          ...state,
          pendingRequest: false,
          requestSent: false,
          requestFailed: true
        };
      }
      return {
        ...state,
        pendingRequest: false,
        requestSent: true,
        selectedQuestion: { ...action.payload }
      };
    case "GET_QUESTION_REJECTED":
      if (action.payload && action.payload.message) {
        alert(action.payload.message);
      }
      return {
        ...state,
        pendingRequest: false,
        requestSent: false,
        requestFailed: true
      };
    default:
      return state;
  }
}

export function getQuestion(question_id) {
  return {
    type: "GET_QUESTION",
    payload: httpConf
      .get(`http://localhost:1337/question/${question_id}`)
      .then(res => res.data)
  };
}
export function getAnswer(answer_id) {
  return {
    type: "GET_ANSWER",
    payload: httpConf
      .get(`http://localhost:1337/answer/${answer_id}`)
      .then(res => res.data)
  };
}
export function createAnswer(question_id) {
  return {
    type: "CREATE_ANSWER",
    payload: httpConf
      .post(`http://localhost:1337/answer/${question_id}`)
      .then(res => res.data)
  };
}
export function addLike(question_id) {
  return {
    type: "ADD_LIKE",
    payload: httpConf
      .put(`http://localhost:1337/question/${question_id}`)
      .then(res => res.data)
  };
}
