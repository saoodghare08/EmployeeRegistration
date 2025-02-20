const getLocalStorageData = (key) => JSON.parse(localStorage.getItem(key)) || [];

const setLocalStorageData = (key, data) => localStorage.setItem(key, JSON.stringify(data));

const getEmployees = () => {
  const employees = getLocalStorageData('employees')
  return employees;
}

const addEmployee = (employee) => {
  const employees = getLocalStorageData('employees');
  
  // Check for duplicates before adding
  const uniqueEmployee = checkDuplicates([employee]);
  if (uniqueEmployee.length === 0) {
    console.error('Duplicate employee found. Cannot add.');
    return employees;
  }

  const newEmployee = {
    id: employees.length + 1,
    ...employee,
  };
  
  employees.push(newEmployee);
  setLocalStorageData('employees', employees);
  return employees;
};

const checkDuplicates = (apiEmployees) => {
  const employees = getLocalStorageData('employees');
  
  const existingEmployeeIds = new Set(employees.map((emp) => emp.id));
  const existingEmployeeNames = new Set(employees.map((emp) => emp.name.toLowerCase()));
  
  const flatApiEmployees = apiEmployees.flat();

  const uniqueEmployees = flatApiEmployees.filter((emp) => {
    return !existingEmployeeIds.has(emp.id) && !existingEmployeeNames.has(emp.name.toLowerCase());
  });

  return uniqueEmployees;
};



const updateEmployee = (updatedEmployee) => {
  const employees = getLocalStorageData('employees');
  const index = employees.findIndex((emp) => emp.id === updatedEmployee.id);
  if (index !== -1) {
    employees[index] = updatedEmployee;
    setLocalStorageData('employees', employees);
  }
  return employees;
};

const deleteEmployee = (employee) => {
  let employees = getLocalStorageData('employees');
  
  const index = employees.findIndex((emp) => emp.id === employee.id);
  
  employees = employees.filter(emp => emp.id !== employee.id);
  
  employees = employees.map((emp, index) => ({
    ...emp,
    id: index + 1,
  }));
  
  setLocalStorageData('employees', employees);
  
  return employees;
};
const deleteAllEmployee =() => {
  let employees = getLocalStorageData('employees')
  if (employees && employees.length > 0) {
    localStorage.removeItem('employees');
  }
}


export default {
  getEmployees,
  addEmployee,
  updateEmployee,
  deleteEmployee,
  checkDuplicates,
  deleteAllEmployee
}