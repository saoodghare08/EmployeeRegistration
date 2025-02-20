import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEditingEmployee } from "../../application/selectors/employeeSelector";
import {
  addEmployeeStart,
  updateEmployeeStart,
} from "../../application/actions/employeeAction";
import { MdCancel, MdOutlineCancel } from "react-icons/md";
import placeholder from "../../assets/no-image-found.png";
const OffCanvasForm = () => {
  const dispatch = useDispatch();
  const employee = useSelector(selectEditingEmployee);
  const [formData, setFormData] = useState({
    profile: "",
    name: "",
    email: "",
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
    if (
      monthDifference < 0 ||
      (monthDifference === 0 && currentDate.getDate() < birthDate.getDate())
    ) {
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
    const { name, value, files } = e.target;

    if (name === "profile" && files.length > 0) {
      const file = files[0];
      const reader = new FileReader();

      reader.onloadend = () => {
        setFormData({
          ...formData,
          profile: reader.result, // Store the image as a base64 data URL
        });
      };

      if (file) {
        reader.readAsDataURL(file); // Read the file as data URL
      }
    } else if (name === "birthdate") {
      const age = calculateAge(value);
      setFormData({ ...formData, [name]: value, age: age });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = () => {
    if (employee) {
      dispatch(updateEmployeeStart(formData));
    } else {
      dispatch(addEmployeeStart(formData));
    }
    setFormData({
      name: "",
      age: "",
      email: "",
      salary: "",
      department: "",
      sex: "",
      birthdate: "",
      profile: "",
    });
  };

  return (
    <>
      <div
        className="offcanvas offcanvas-end"
        tabIndex="-1"
        id="offcanvasRight"
        aria-labelledby="offcanvasRightLabel"
      >
        <div className="offcanvas-header">
          <h3 className="offcanvas-title text-center" id="offcanvasRightLabel">
            {employee ? "Edit Employee" : "Add New Employee"}
          </h3>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div className="offcanvas-body">
          <form onSubmit={handleSubmit}>
            
            <div className="mb-1">
              <input
                type="file"
                id="profile"
                name="profile"
                className="form-control"
                placeholder="Add Profile"
                onChange={handleInputChange}
                style={{ display: "none" }}
                required // Ensures the user selects a profile image
              />
              <label
                htmlFor="profile"
                className="form-label"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    width: "100px",
                    height: "100px",
                    borderRadius: "50%",
                    backgroundColor: "#f0f0f0",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    fontSize: "30px",
                    color: "#007bff",
                    cursor: "pointer",
                    border: "2px solid #007bff",
                    position: "relative",
                    backgroundImage: formData.profile
                      ? `url(${formData.profile})`
                      : ``,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                  }}
                >
                  {!formData.profile && (
                    <span
                      style={{
                        fontSize: "36px",
                        fontWeight: "bold",
                        marginBottom: "5px",
                      }}
                    >
                      +
                    </span>
                  )}
                  {formData.profile && (
                    <MdCancel
                      style={{
                        position: "absolute",
                        bottom: "5px",
                        right: "5px",
                        fontSize: "20px",
                        color: "red",
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        setFormData({ ...formData, profile: "" });
                        document.getElementById("profile").value = "";
                      }}
                    />
                  )}
                </div>
                Profile Photo
              </label>
              <div>
                <p>
                  {formData.profile
                    ? formData.profile.name
                    : "No profile photo selected"}
                </p>
              </div>
            </div>

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
                required // Ensures name is entered
              />
            </div>

            <div className="mb-1">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="form-control"
                value={formData.email}
                placeholder="Enter Email"
                onChange={handleInputChange}
                required // Ensures email is entered
                pattern="^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" // Email pattern validation
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
                required // Ensures date of birth is entered
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
                disabled
                onChange={handleInputChange}
                min="18" // Ensures age is at least 18
                max="100" // Limits age to 100
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
                required // Ensures salary is entered
                min="0" // Ensures salary is a positive value
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
                required // Ensures department is entered
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
                required // Ensures gender is selected
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
            </div>

            {employee ? (
              <button
                type="submit"
                className="btn btn-primary w-100"
                data-bs-dismiss="offcanvas"
              >
                Update Employee
              </button>
            ) : (
              <button type="submit" className="btn btn-primary w-100">
                Add Employee
              </button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default OffCanvasForm;