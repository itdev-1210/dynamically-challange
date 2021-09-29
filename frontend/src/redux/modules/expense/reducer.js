import {
  GET_EXPENSE_LIST,
  GET_EXPENSE_LIST_SUCCESS,
  GET_EXPENSE_LIST_ERROR,
  ADD_EXPENSE,
  ADD_EXPENSE_SUCCESS,
  ADD_EXPENSE_ERROR,
  UPDATE_EXPENSE,
  UPDATE_EXPENSE_SUCCESS,
  UPDATE_EXPENSE_ERROR,
  DELETE_EXPENSE,
  DELETE_EXPENSE_SUCCESS,
  DELETE_EXPENSE_ERROR,
} from "./actions";

const initialState = {
  items: [],
  isLoading: false,
  isCreating: false,
  isUpdating: false,
  isDeleting: false,
  error: null,
};

const expense = (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_EXPENSE_LIST:
      return {
        ...state,
        isLoading: true,
      };
    case GET_EXPENSE_LIST_SUCCESS:
      return {
        ...state,
        isLoading: false,
        items: payload.data,
        error: null,
      };
    case GET_EXPENSE_LIST_ERROR:
      return {
        ...state,
        isLoading: false,
        error: payload,
      };
    case ADD_EXPENSE:
      return {
        ...state,
        isCreating: true,
      };
    case ADD_EXPENSE_SUCCESS:
      let result_data = state.items.slice(0);
      result_data.push(payload.data);
      return {
        ...state,
        isCreating: false,
        items: result_data,
      };
    case ADD_EXPENSE_ERROR:
      return {
        ...state,
        isCreating: false,
        error: payload,
      };
    case UPDATE_EXPENSE:
      return {
        ...state,
        isUpdating: true,
      };
    case UPDATE_EXPENSE_SUCCESS:
      const { id } = payload.data;
      const replaceIndex = state.items.findIndex((item) => item.id === id);
      const newData = [...state.items];
      newData.splice(replaceIndex, 1, payload.data);
      return {
        ...state,
        isUpdating: false,
        items: [...newData],
      };
    case UPDATE_EXPENSE_ERROR:
      return {
        ...state,
        isUpdating: false,
        error: payload,
      };
    case DELETE_EXPENSE:
      return {
        ...state,
        isDeleting: true,
      };
    case DELETE_EXPENSE_SUCCESS:
      return {
        ...state,
        isDeleting: false,
        items: state.items.filter((item) => item.id !== payload.data.id),
      };
    case DELETE_EXPENSE_ERROR:
      return {
        ...state,
        isDeleting: false,
        error: payload,
      };
    default:
      return state;
  }
};

export default expense;
