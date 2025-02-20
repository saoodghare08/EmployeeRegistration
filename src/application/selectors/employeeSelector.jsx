export const selectEmployees = (state) => state.employeeList.employees;
export const selectEditingEmployee = (state) => state.employeeList.editingEmployee;

export const apiEmployees = (state) => state.employeeList.fetchEmployees;