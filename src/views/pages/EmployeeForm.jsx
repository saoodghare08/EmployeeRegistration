import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addEmployeeStart,
  updateEmployeeStart,
} from "../../application/actions/employeeAction";
import { selectEditingEmployee } from "../../application/selectors/employeeSelector";

const EmployeeForm = () => {
  const dispatch = useDispatch();
  const employee = useSelector(selectEditingEmployee);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    salary: "",
    department: "",
    sex: "",
    birthdate: "",
  });

  // Function to calculate age from birthdate
  const calculateAge = (birthdate) => {
    const birthDate = new Date(birthdate);
    const currentDate = new Date();
    let age = currentDate.getFullYear() - birthDate.getFullYear();
    const monthDifference = currentDate.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())) {
      age--;
    }
    return age;
  };

  useEffect(() => {
    if (employee) {
      setFormData(employee);
    }
  }, [employee]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // If the birthdate is updated, automatically calculate the age
    if (name === "birthdate") {
      const age = calculateAge(value);
      setFormData({ ...formData, [name]: value, age: age });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (employee) {
      // If editing an employee
      dispatch(updateEmployeeStart(formData));
    } else {
      // If adding a new employee
      dispatch(addEmployeeStart(formData));
    }
    setFormData({
      name: "",
      age: "",
      salary: "",
      department: "",
      sex: "",
      birthdate: "",
    });
  };

  return (
    <div className="card">
      <div className="card-body">
        <h3 className="card-title text-center">
          {employee ? "Edit Employee" : "Add New Employee"}
        </h3>
        <form>
          <div className="mb-1">
            <label htmlFor="name" className="form-label">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="form-control"
              value={formData.name}
              placeholder="Enter Name"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-1">
            <label htmlFor="birthdate" className="form-label">
              Date of Birth
            </label>
            <input
              type="date"
              id="birthdate"
              name="birthdate"
              className="form-control"
              value={formData.birthdate}
              placeholder="Enter Date of Birth"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-1">
            <label htmlFor="age" className="form-label">
              Age
            </label>
            <input
              type="number"
              id="age"
              name="age"
              className="form-control"
              value={formData.age}
              placeholder="Enter Age"
              // disabled 
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-1">
            <label htmlFor="salary" className="form-label">
              Salary
            </label>
            <input
              type="number"
              id="salary"
              name="salary"
              className="form-control"
              value={formData.salary}
              placeholder="Enter Salary"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-1">
            <label htmlFor="department" className="form-label">
              Department
            </label>
            <input
              type="text"
              id="department"
              name="department"
              className="form-control"
              value={formData.department}
              placeholder="Enter Department"
              onChange={handleInputChange}
            />
          </div>

          <div className="mb-1">
            <label htmlFor="sex" className="form-label">
              Gender
            </label>
            <select
              name="sex"
              id="sex"
              className="form-select"
              value={formData.sex}
              onChange={handleInputChange}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={handleSubmit}
          >
            {employee ? "Update Employee" : "Add Employee"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EmployeeForm;
