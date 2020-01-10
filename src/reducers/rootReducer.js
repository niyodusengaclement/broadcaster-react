import { combineReducers } from 'redux';
import userReducer from './userReducer';
import reportReducer from './reportReducer';

const rootReducer = combineReducers({
  user: userReducer,
  report: reportReducer,
});
export default rootReducer;
