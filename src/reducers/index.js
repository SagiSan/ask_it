import { combineReducers } from "redux";
import login from "./loginReducer";
import home from "./homeReducer";
import question from "./questionReducer";

const appReducer = combineReducers({
  login,
  home,
  question
});

const rootReducer = (state, action) => {
  if (action.type === "LOG_OUT") {
    state = undefined;
  }
  return appReducer(state, action);
};

export default rootReducer;
