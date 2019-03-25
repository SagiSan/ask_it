import { httpConf } from "./httpConf";

const initialState = {
  pendingRequest: false,
  requestSent: false,
  requestFailed: false,
  questions: []
};
export default function reducer(state = initialState, action) {
  switch (action.type) {
    case "GET_QUESTIONS_PENDING":
      return {
        ...state,
        pendingRequest: true,
        requestFailed: false,
        requestSent: false
      };
    case "GET_QUESTIONS_FULFILLED":
      if (action.payload.error) {
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
        questions: [...action.payload]
      };
    case "CREATE_QUESTION_FULFILLED":
      if (action.payload.error) {
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
        questions: [...state.questions, action.payload]
      };
    case "GET_QUESTIONS_REJECTED":
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

export function getQuestions() {
  return {
    type: "GET_QUESTIONS",
    payload: httpConf
      .get("http://localhost:1337/question")
      .then(res => res.data)
  };
}
export function createQuestion(text, user_id) {
  return {
    type: "CREATE_QUESTION",
    payload: httpConf
      .post(`http://localhost:1337/question`, {
        text,
        creator: user_id
      })
      .then(res => res.data)
  };
}
export function createAnswer(text, user_id, question_id) {
  return {
    type: "CREATE_ANSWER",
    payload: httpConf
      .post("http://localhost:1337/answer", {
        text: text,
        creator: user_id,
        question: question_id
      })
      .then(res => res.data)
  };
}
