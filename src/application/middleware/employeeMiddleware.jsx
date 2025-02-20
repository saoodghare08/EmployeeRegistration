
import {
  ADD_EMPLOYEE_START,
  addEmployeeFailure,
  addEmployeeSuccess,
  UPDATE_EMPLOYEE_START,
  updateEmployeeSuccess,
  updateEmployeeFailure,
  DELETE_EMPLOYEE_START,
  deleteEmployeeSuccess,
  deleteEmployeeFailure,
  LOAD_EMPLOYEE,
  loadEmployeeSuccess,
  loadEmployeeFailure,
  FETCH_EMPLOYEE_START,
  fetchEmployeeSuccess,
  fetchEmployeeFailure,
  FETCH_EMPLOYEE_SUCCESS,
  DELETE_ALL_EMPLOYEE_START,
  deleteAllEmployeeSuccess,
  deleteAllEmployeeFailure,
} from "../actions/employeeAction";
import * as uiActions from '../actions/ui'

const employeeMiddleware = ({api}) => (store) => (next) => async (action) => {

  if(action.type === LOAD_EMPLOYEE){
    try {
      store.dispatch(uiActions.setLoading(true))
      
      const employees = await api.employeeApi.getEmployees();
      store.dispatch(loadEmployeeSuccess(employees))
      store.dispatch(uiActions.setLoading(false));
    } catch (error) {
      store.dispatch(loadEmployeeFailure(error.message))
    }
  }

  if (action.type === FETCH_EMPLOYEE_START) {
    try {
      store.dispatch(uiActions.setLoading(true))
      
      const apiEmployees = await api.fetchEmployee.fetchEmployeesApi();
      store.dispatch(fetchEmployeeSuccess(apiEmployees));
      store.dispatch(uiActions.setLoading(false));
    } catch (error) {
      store.dispatch(fetchEmployeeFailure(error.message));
    }
  }

  if (action.type === FETCH_EMPLOYEE_SUCCESS) {
    try {
      const apiEmployees = action.payload;
      const uniqueEmployees = api.employeeApi.checkDuplicates(apiEmployees);  
      if (uniqueEmployees.length > 0) {
        uniqueEmployees.forEach(emp => {
          api.employeeApi.addEmployee(emp);
          store.dispatch(addEmployeeSuccess(emp));
        });
      }
    } catch (error) {
      store.dispatch(fetchEmployeeFailure(error.message));
    }
  }

  if (action.type === ADD_EMPLOYEE_START) {
    try {
      
      store.dispatch(uiActions.setLoading(true))
      
      const updatedEmployees = api.employeeApi.addEmployee(action.payload);
      store.dispatch(addEmployeeSuccess(updatedEmployees));
      store.dispatch(uiActions.setLoading(false));
    } catch (error) {
      store.dispatch(addEmployeeFailure(error.message));
    }
  }

  if (action.type === UPDATE_EMPLOYEE_START) {
    try {
      
      store.dispatch(uiActions.setLoading(true))
      
      const updatedEmployees = api.employeeApi.updateEmployee(action.payload);
      store.dispatch(updateEmployeeSuccess(updatedEmployees));
      store.dispatch(uiActions.setLoading(false));
    } catch (error) {
      store.dispatch(updateEmployeeFailure(error.message));
    }
  }

  if (action.type === DELETE_EMPLOYEE_START) {
    try {
      
      store.dispatch(uiActions.setLoading(true))
      
      const deletedEmployee = api.employeeApi.deleteEmployee(action.payload);
      store.dispatch(deleteEmployeeSuccess(deletedEmployee))
      store.dispatch(uiActions.setLoading(false));
    } catch (error) {
      store.dispatch(deleteEmployeeFailure(error.message));
    }
  }

  if (action.type === DELETE_ALL_EMPLOYEE_START) {
    try {
      
      store.dispatch(uiActions.setLoading(true))
      
      api.employeeApi.deleteAllEmployee();
      store.dispatch(deleteAllEmployeeSuccess())
      store.dispatch(uiActions.setLoading(false));
    } catch (error) {
      store.dispatch(deleteAllEmployeeFailure(error.message));
    }
  }
  return next(action);
};

export default [employeeMiddleware];