import { combineReducers,applyMiddleware,createStore } from "redux";
import thunk from 'redux-thunk';
import {SigninReducer} from './Reducers/SigninRedcer';
const reducers=combineReducers({
   technician: SigninReducer
})
const signinFromLocalStorage= localStorage.getItem('tokens')? JSON.parse(localStorage.getItem('tokens')):null;
const initialState={
technician:{signInfo:signinFromLocalStorage}
}
const store= createStore(reducers,initialState,applyMiddleware(thunk))
export default store;