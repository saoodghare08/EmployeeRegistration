//LOAD
export const LOAD_EMPLOYEE = 'LOAD_EMPLOYEE'
export const LOAD_EMPLOYEE_SUCCESS = 'LOAD_EMPLOYEE_SUCCESS'
export const LOAD_EMPLOYEE_FAILURE = 'LOAD_EMPLOYEE_FAILURE'

export const loadEmployee = () => ({
  type: LOAD_EMPLOYEE,
})

export const loadEmployeeSuccess = (employees) => ({
  type: LOAD_EMPLOYEE_SUCCESS,
  payload: employees,
});

export const loadEmployeeFailure = (error) => ({
  type: LOAD_EMPLOYEE_FAILURE,
  payload: error,
});


//API
export const FETCH_EMPLOYEE_START = 'FETCH_EMPLOYEE_START'
export const FETCH_EMPLOYEE_SUCCESS = 'FETCH_EMPLOYEE_SUCCESS'
export const FETCH_EMPLOYEE_FAILURE = 'FETCH_EMPLOYEE_FAILURE'

export const fetchEmployeeStart = () => ({
  type: FETCH_EMPLOYEE_START,
})

export const fetchEmployeeSuccess = (employees) => ({
  type: FETCH_EMPLOYEE_SUCCESS,
  payload: employees,
});

export const fetchEmployeeFailure = (error) => ({
  type: FETCH_EMPLOYEE_FAILURE,
  payload: error,
});



//ADD
export const ADD_EMPLOYEE_START = 'ADD_EMPLOYEE_START';
export const ADD_EMPLOYEE_SUCCESS = 'ADD_EMPLOYEE_SUCCESS';
export const ADD_EMPLOYEE_FAILURE = 'ADD_EMPLOYEE_FAILURE';

export const addEmployeeStart = (employee) => ({
  type: ADD_EMPLOYEE_START,
  payload: employee,
});

export const addEmployeeSuccess = (employees) => ({
  type: ADD_EMPLOYEE_SUCCESS,
  payload: employees,
});

export const addEmployeeFailure = (error) => ({
  type: ADD_EMPLOYEE_FAILURE,
  payload: error,
});

//UPDATE
export const SET_EDITING_EMPLOYEE = 'SET_EDITING_EMPLOYEE'
export const UPDATE_EMPLOYEE_START = 'UPDATE_EMPLOYEE_START';
export const UPDATE_EMPLOYEE_SUCCESS = 'UPDATE_EMPLOYEE_SUCCESS';
export const UPDATE_EMPLOYEE_FAILURE = 'UPDATE_EMPLOYEE_FAILURE';

export const setEditingEmployee = (employee) => ({
  type: SET_EDITING_EMPLOYEE,
  payload: employee,
});

export const updateEmployeeStart = (employee) => ({
  type: UPDATE_EMPLOYEE_START,
  payload: employee,
});

export const updateEmployeeSuccess = (employees) => ({
  type: UPDATE_EMPLOYEE_SUCCESS,
  payload: employees,
});

export const updateEmployeeFailure = (error) => ({
  type: UPDATE_EMPLOYEE_FAILURE,
  payload: error,
});


//DELETE
export const DELETE_EMPLOYEE_START = 'DELETE_EMPLOYEE_START';
export const DELETE_EMPLOYEE_SUCCESS = 'DELETE_EMPLOYEE_SUCCESS';
export const DELETE_EMPLOYEE_FAILURE = 'DELETE_EMPLOYEE_FAILURE';

export const deleteEmployeeStart = (employee) => ({
  type: DELETE_EMPLOYEE_START,
  payload: employee,
})

export const deleteEmployeeSuccess = (employees) => ({
  type: DELETE_EMPLOYEE_SUCCESS,
  payload: employees,
});

export const deleteEmployeeFailure = (error) => ({
  type: DELETE_EMPLOYEE_FAILURE,
  payload: error,
});

//DELETE ALL
export const DELETE_ALL_EMPLOYEE_START = 'DELETE_ALL_EMPLOYEE_START'
export const DELETE_ALL_EMPLOYEE_SUCCESS = 'DELETE_ALL_EMPLOYEE_SUCCESS'
export const DELETE_ALL_EMPLOYEE_FAILURE = 'DELETE_ALL_EMPLOYEE_FAILURE'

export const deleteAllEmployeeStart = () => ({
  type: DELETE_ALL_EMPLOYEE_START,
})
export const deleteAllEmployeeSuccess = () => ({
  type: DELETE_ALL_EMPLOYEE_SUCCESS,
})
export const deleteAllEmployeeFailure = (error) => ({
  type: DELETE_ALL_EMPLOYEE_FAILURE,
  payload: error,
})

