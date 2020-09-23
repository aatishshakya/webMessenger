import { combineReducers } from "redux";
import authReducer from "./auth.reducer.js";
import userReducer from "./user.reducer";
const rootReducer = combineReducers({
  user: userReducer,
  auth: authReducer,
});

export default rootReducer;
