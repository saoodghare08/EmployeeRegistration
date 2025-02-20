const initialState = {
  employees: [],
  editingEmployee: null,
  // loading: false,
  error: null,
};

const employeeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "LOAD_EMPLOYEE":
      return { ...state, 
        // loading: true 
      };

    case "LOAD_EMPLOYEE_SUCCESS":
      return { ...state, employees: action.payload, 
        // loading: false
       };

    case "FETCH_EMPLOYEE_START":
      return { ...state, 
        // loading: true 
      };

    case "FETCH_EMPLOYEE_SUCCESS":
      return { ...state, employees: action.payload, 
        // loading: true 
      };

    case "ADD_EMPLOYEE_START":
      return { ...state, 
        // loading: true 
      };

    case "ADD_EMPLOYEE_SUCCESS":
      return { ...state, employees: action.payload, 
        // loading: false 
      };

    case "SET_EDITING_EMPLOYEE":
      return { ...state, editingEmployee: action.payload, 
        // loading: false 
      };

    case "UPDATE_EMPLOYEE_START":
      return { ...state, 
        // loading: true 
      };

    case "UPDATE_EMPLOYEE_SUCCESS":
      return {
        ...state,
        employees: action.payload,
        editingEmployee: null,
        // loading: false,
      };

    case "DELETE_EMPLOYEE_START":
      return { ...state, 
        // loading: true 
      };

    case "DELETE_EMPLOYEE_SUCCESS":
      return { ...state, employees: action.payload, 
        // loading: false 
      };

    case "DELETE_ALL_EMPLOYEE_START":
      return { ...state, 
        // loading: true 
      };

    case "DELETE_ALL_EMPLOYEE_SUCCESS":
      return { ...state, 
        // loading: true 
      };

    case "DELETE_ALL_EMPLOYEE_FAILURE":
    case "LOAD_EMPLOYEE_FAILURE":
    case "FETCH_EMPLOYEE_FAILURE":
    case "ADD_EMPLOYEE_FAILURE":
    case "UPDATE_EMPLOYEE_FAILURE":
    case "DELETE_EMPLOYEE_FAILURE":
      return { ...state, error: action.payload, 
        // loading: false 
      };

    default:
      return state;
  }
};

export default employeeReducer;
