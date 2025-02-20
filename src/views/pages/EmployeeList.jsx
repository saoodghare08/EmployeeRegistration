import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  loadEmployee,
  deleteEmployeeStart,
  setEditingEmployee,
  fetchEmployeeStart,
  deleteAllEmployeeStart,
} from "../../application/actions/employeeAction";
import { selectEmployees } from "../../application/selectors/employeeSelector";
import DataTableBase from "../components/DataTableBase";
import styled from "styled-components";
import { FaDeleteLeft, FaPencil } from "react-icons/fa6";
import { MdDelete } from "react-icons/md";
import OffCanvasForm from "../components/OffCanvasForm";
import { toast, ToastContainer } from "react-toastify";
import { getLoading } from "../../application/selectors/uiSelector";
import { pageLoaded } from "../../application/actions/ui";
import { ShimmerTable } from "react-shimmer-effects";
import placeholder from '../../assets/no-image-found.png'

const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled.button`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e5e5e5;
  border: none;
  cursor: pointer;
`;

const styles = {
  confirmButton: {
    backgroundColor: "green",
    color: "white",
    border: "none",
    padding: "5px 10px",
    margin: "0 5px",
    cursor: "pointer",
    borderRadius: "4px",
  },
  cancelButton: {
    backgroundColor: "red",
    color: "white",
    border: "none",
    padding: "5px 10px",
    margin: "0 5px",
    cursor: "pointer",
    borderRadius: "4px",
  },
};
const EmployeeList = () => {
  const [filterText, setFilterText] = useState("");
  const [resetPaginationToggle, setResetPaginationToggle] = useState(false);

  const handleClear = () => {
    if (filterText) {
      setResetPaginationToggle(!resetPaginationToggle);
      setFilterText("");
    }
  };

  const dispatch = useDispatch();
  const employees = useSelector(selectEmployees);
  const loading = useSelector(getLoading);

  useEffect(() => {
    dispatch(pageLoaded());
  }, [dispatch]);

  const notify = (emp) => {
    toast(
      <div>
        <p>Are you sure you want to delete this employee?</p>
        <button
          onClick={() => handleDeleteEmployee(emp)}
          style={styles.confirmButton}
        >
          Yes
        </button>
        <button onClick={() => toast.dismiss()} style={styles.cancelButton}>
          No
        </button>
      </div>,
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        hideProgressBar: true,
        draggable: false,
        theme: "colored",
      }
    );
  };
  const notifyAll = () => {
    toast(
      <div>
        <p>Are you sure you want to delete <strong>ALL</strong> employee?</p>
        <button
          onClick={() => handleDeleteAllEmployee()}
          style={styles.confirmButton}
        >
          Yes
        </button>
        <button onClick={() => toast.dismiss()} style={styles.cancelButton}>
          No
        </button>
      </div>,
      {
        position: "top-right",
        autoClose: false,
        closeOnClick: false,
        hideProgressBar: true,
        draggable: false,
        theme: "colored",
      }
    );
  };

  const handleApiCall = () => {
    dispatch(fetchEmployeeStart());
    toast("Added Dummy data from API call successfully", {type: "success"})
    dispatch(loadEmployee());
  }
  const handleDeleteAllEmployee = () => {
    dispatch(deleteAllEmployeeStart());
    toast.dismiss();
    toast("All Employees deleted successfully!", { type: "success" });
    dispatch(loadEmployee());
  };

  const handleDeleteEmployee = (emp) => {
    dispatch(deleteEmployeeStart(emp));
    toast.dismiss();
    toast("Employee deleted successfully!", { type: "success" });
  };

  const handleEditEmployee = (emp) => {
    dispatch(setEditingEmployee(emp));
  };

  const columns = [
    {
      name: "Id",
      selector: (row) => row.id,
      sortable: true,
    },
    {
      name: "Profile",
      selector: (row) => row.profile,
    },
    {
      name: "Name",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Email",
      selector: (row) => row.email,
      sortable: true,
    },
    {
      name: "Phone",
      selector: (row) => row.phone,
      sortable: true,
    },
    {
      name: "Birthdate",
      selector: (row) => row.birthdate,
      sortable: true,
    },
    {
      name: "Age",
      selector: (row) => row.age,
      sortable: true,
    },
    {
      name: "Department",
      selector: (row) => row.department,
      sortable: true,
    },
    {
      name: "Salary",
      selector: (row) => row.salary,
      sortable: true,
    },
    {
      name: "Sex",
      selector: (row) => row.sex,
      sortable: true,
    },
    {
      name: "Action",
      selector: (row) => row.action,
    },
  ];

  const data = employees.map((emp) => ({
    id: emp.id,
    profile: emp.profile ? (
      <img
        src={emp.profile}
        alt="Profile"
        style={{ width: "30px", height: "30px", borderRadius: "50%" }}
      />
    ) : (
      <img
        src={placeholder}
        alt="Profile"
        style={{ width: "30px", height: "30px", borderRadius: "50%" }}
      />
    ),
    name: emp.name,
    department: emp.department,
    birthdate: emp.birthdate,
    age: emp.age.toString(),
    phone: emp.phone,
    email: emp.email,
    salary: emp.salary.toString(),
    sex: emp.sex,
    action: (
      <>
        <button
          className="btn btn-warning btn-sm me-2"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasRight"
          aria-controls="offcanvasRight"
          onClick={() => {
            <OffCanvasForm />;
            handleEditEmployee(emp);
          }}
        >
          <FaPencil />
        </button>
        <button className="btn btn-danger btn-sm" onClick={() => notify(emp)}>
          <MdDelete />
        </button>
      </>
    ),
  }));

  const filteredItems = data.filter(
    (item) =>
      item.name && item.name.toLowerCase().includes(filterText.toLowerCase())
  );
  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: "15px",
          marginTop: "15px",
        }}
      >
        <div>
          <button
            className="btn btn-primary btn-sm me-2 ms-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#offcanvasRight"
            aria-controls="offcanvasRight"
          >
            Add Employee
          </button>
          <button className="btn btn-danger btn-sm me-2 ms-3"
          onClick={() => {
            notifyAll()
          }}>
            Delete All Employee
          </button>
        </div>
        <OffCanvasForm />

        <div style={{ display: "flex", alignItems: "center" }}>
          <button
            className="btn btn-primary btn-sm me-2"
            onClick={() => {
              handleApiCall()
            }}
          >
            
            {loading ?  `Loading Data... ` : ('Get API data')}
          </button>

          <div
            className="me-3"
            style={{
              display: "flex",
              alignItems: "center",
              marginLeft: "10px",
            }}
          >
            <TextField
              type="text"
              placeholder="Filter By Name"
              id="search"
              aria-label="Search Input"
              value={filterText}
              onChange={(e) => setFilterText(e.target.value)}
            />
            <ClearButton
              onClick={() => {
                handleClear();
              }}
            >
              <span>&times;</span> {/* Clear icon or "X" */}
            </ClearButton>
          </div>
        </div>
      </div>
              {loading ?  <ShimmerTable row={5} col={9} /> : (
                <DataTableBase columns={columns} data={filteredItems} />
              )}
      <ToastContainer stacked closeOnClick />
    </div>
  );
};

export default EmployeeList;
