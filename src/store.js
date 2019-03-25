import { applyMiddleware, compose, createStore } from "redux";
import { createPromise } from "redux-promise-middleware";
import thunk from "redux-thunk";
import logger from "redux-logger";
import reducers from "./reducers";

const middleware = applyMiddleware(thunk, createPromise(), logger);
const store = createStore(
  reducers,
  compose(
    middleware,
    window.devToolsExtension ? window.devToolsExtension() : f => f
  )
);

export default store;
