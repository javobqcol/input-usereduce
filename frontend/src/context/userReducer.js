import {
  CREATE_USER_FAILURE,
  CREATE_USER_SUCCESS,
  DELETE_USER_FAILURE,
  DELETE_USER_SUCCESS,
  FETCH_DATA_USER_FAILURE,
  FETCH_DATA_USER_SUCCESS,
  FILTER_USERS,
  UPDATE_USER_FAILURE,
  UPDATE_USER_SUCCESS,
} from "../hooks/actions";

export const productReducer = (state, action) => {
  switch (action.type) {
    case CREATE_USER_SUCCESS:
      return {
        ...state,
        loading: true,
        users: [...state.users, action.payload.row],
        error: "",
      };

    case CREATE_USER_FAILURE:
      return {
        ...state,
        loading: true,
        error: action.payload.error,
      };

    case UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: true,
        users: state.users.map((user) =>
          user.id === action.payload.row.id ? action.payload.row : user
        ),
        error: "",
      };
    case UPDATE_USER_FAILURE:
      return {
        ...state,
        loading: true,
        error: action.payload.error,
      };

    case DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: true,
        users: state.users.filter(
          (x) => x.id !== action.payload.id
        ),
        error: "",
      };
    case FILTER_USERS:{

      return {
        ...state,
        loading: true,
        usersFilter: [...action.payload.usersFilter],
        error: "",
      };  
    }
    case DELETE_USER_FAILURE:
      return {
        ...state,
        loading: true,
        error: action.payload.error,
      };
    case FETCH_DATA_USER_SUCCESS:
      return {
        ...state,
        loading: true,
        users: [...action.payload.data],
        usersFilter: [...action.payload.data],
        error: "",
      };
    case FETCH_DATA_USER_FAILURE:
      return {
        ...state,
        loading: false,
        error: "action.payload.error",
      };

    default:
      return { ...state };
  }
};
