import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectEditingEmployee } from "../../application/selectors/employeeSelector";
import {
  addEmployeeStart,
  updateEmployeeStart,
} from "../../application/actions/employeeAction";
import { MdCancel } from "react-icons/md";

const OffCanvasForm = () => {
  const dispatch = useDispatch();
  const employee = useSelector(selectEditingEmployee);
  const [formData, setFormData] = useState({
    profile: "",
    name: "",
    email: "",
    phone: "",
    age: "",
    salary: "",
    department: "",
    sex: "",
    birthdate: "",
  });
  const [errors, setErrors] = useState({});


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

  const handleValidation = () => {
    const newErrors = {};
    // Validate required fields
    if (!formData.name) newErrors.name = "Name is required.";
    if (!formData.email) newErrors.email = "Email is required.";
    if (!formData.phone) newErrors.phone = "Phone is required.";
    if (!formData.birthdate) newErrors.birthdate = "Birthdate is required.";
    if (!formData.age) newErrors.age = "Age is required.";
    if (!formData.salary) newErrors.salary = "Salary is required.";
    if (!formData.department) newErrors.department = "Department is required.";
    if (!formData.sex) newErrors.sex = "Gender is required.";
    if (!formData.profile) newErrors.profile = "Profile photo is required.";

    // Validate email format
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (formData.email && !emailPattern.test(formData.email)) {
      newErrors.email = "Please enter a valid email address.";
    }

    // Validate phone format (simple 10-digit validation)
    const phonePattern = /^[0-9]{10}$/;
    if (formData.phone && !phonePattern.test(formData.phone)) {
      newErrors.phone = "Please enter a valid 10-digit phone number.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (handleValidation()) {
      if (employee) {
        dispatch(updateEmployeeStart(formData));
      } else {
        dispatch(addEmployeeStart(formData));
      }
      setFormData({
        name: "",
        age: "",
        email: "",
        phone: "",
        salary: "",
        department: "",
        sex: "",
        birthdate: "",
        profile: "",
      });
      setErrors({});
    }
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
                className={`form-control ${errors.profile ? "is-invalid" : ""}`}
                placeholder="Add Profile"
                onChange={handleInputChange}
                style={{ display: "none" }}
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
              {errors.profile && (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {errors.profile}
                </div>
              )}
            </div>

            <div className="mb-1">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`form-control ${errors.name ? "is-invalid" : ""}`}
                value={formData.name}
                placeholder="Enter Name"
                onChange={handleInputChange}
              />
              {errors.name && (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {errors.name}
                </div>
              )}
            </div>

            <div className="mb-1">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`form-control ${errors.email ? "is-invalid" : ""}`}
                value={formData.email}
                placeholder="Enter Email"
                onChange={handleInputChange}
              />
              {errors.email && (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {errors.email}
                </div>
              )}
            </div>

            <div className="mb-1">
              <label htmlFor="phone" className="form-label">
                Phone Number
              </label>
              <input
                type="text"
                id="phone"
                name="phone"
                className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                value={formData.phone}
                placeholder="Enter Phone Number"
                onChange={handleInputChange}
              />
              {errors.phone && (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {errors.phone}
                </div>
              )}
            </div>

            <div className="mb-1">
              <label htmlFor="birthdate" className="form-label">
                Date of Birth
              </label>
              <input
                type="date"
                id="birthdate"
                name="birthdate"
                className={`form-control ${errors.birthdate ? "is-invalid" : ""}`}
                value={formData.birthdate}
                onChange={handleInputChange}
              />
              {errors.birthdate && (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {errors.birthdate}
                </div>
              )}
            </div>

            <div className="mb-1">
              <label htmlFor="age" className="form-label">
                Age
              </label>
              <input
                type="text"
                id="age"
                name="age"
                className="form-control"
                value={formData.age}
                readOnly
              />
              {errors.age && (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {errors.age}
                </div>
              )}
            </div>

            <div className="mb-1">
              <label htmlFor="salary" className="form-label">
                Salary
              </label>
              <input
                type="number"
                id="salary"
                name="salary"
                className={`form-control ${errors.salary ? "is-invalid" : ""}`}
                value={formData.salary}
                placeholder="Enter Salary"
                onChange={handleInputChange}
              />
              {errors.salary && (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {errors.salary}
                </div>
              )}
            </div>

            <div className="mb-1">
              <label htmlFor="department" className="form-label">
                Department
              </label>
              <input
                type="text"
                id="department"
                name="department"
                className={`form-control ${errors.department ? "is-invalid" : ""}`}
                value={formData.department}
                placeholder="Enter Department"
                onChange={handleInputChange}
              />
              {errors.department && (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {errors.department}
                </div>
              )}
            </div>

            <div className="mb-1">
              <label htmlFor="sex" className="form-label">
                Gender
              </label>
              <select
                id="sex"
                name="sex"
                className={`form-control ${errors.sex ? "is-invalid" : ""}`}
                value={formData.sex}
                onChange={handleInputChange}
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
              {errors.sex && (
                <div className="invalid-feedback" style={{ display: "block" }}>
                  {errors.sex}
                </div>
              )}
            </div>

            <button type="submit" className="btn btn-primary">
              {employee ? "Update Employee" : "Add Employee"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OffCanvasForm;
