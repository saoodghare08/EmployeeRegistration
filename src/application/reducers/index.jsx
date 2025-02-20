import { combineReducers } from '@reduxjs/toolkit';
import employeeReducer from './employeeReducer';
import uiReducer from './uiReducer';


const rootReducer = combineReducers({
  employeeList: employeeReducer,
  uiList: uiReducer
});

export default rootReducer;
