export const GET_EXPENSE_LIST = 'GET_EXPENSE_LIST';
export const GET_EXPENSE_LIST_SUCCESS = 'GET_EXPENSE_LIST_SUCCESS';
export const GET_EXPENSE_LIST_ERROR = 'GET_EXPENSE_LIST_ERROR';

export const ADD_EXPENSE = 'ADD_EXPENSE';
export const ADD_EXPENSE_SUCCESS = 'ADD_EXPENSE_SUCCSS';
export const ADD_EXPENSE_ERROR = 'ADD_EXPENSE_ERROR';

export const UPDATE_EXPENSE = 'UPDATE_EXPENSE';
export const UPDATE_EXPENSE_SUCCESS = 'UPDATE_EXPENSE_SUCCESS';
export const UPDATE_EXPENSE_ERROR = 'UPDATE_EXPENSE_ERROR';

export const DELETE_EXPENSE = 'DELETE_EXPENSE';
export const DELETE_EXPENSE_SUCCESS = 'DELETE_EXPENSE_SUCCESS';
export const DELETE_EXPENSE_ERROR = 'DELETE_EXPENSE_ERROR';

export const  getExpenseList = () => ({
  type: GET_EXPENSE_LIST,
});

export const  getExpenseListSuccess = (data) => ({
  type: GET_EXPENSE_LIST_SUCCESS,
  payload: data
});

export const getExpenseListError = (error) => ({
  type: GET_EXPENSE_LIST_ERROR,
  playload: error,
});

export const addExpense = (data) => ({
  type: ADD_EXPENSE,
  payload: data,
});

export const addExpenseSuccess = (data) => ({
  type: ADD_EXPENSE_SUCCESS,
  payload: data,
});

export const addExpenseError = (error) => ({
  type: ADD_EXPENSE_ERROR,
  payload: error,
});

export const updateExpense = (data) => ({
  type: UPDATE_EXPENSE,
  payload: data
});

export const updateExpenseSuccess = (data) => ({
  type: UPDATE_EXPENSE_SUCCESS,
  payload: data
});

export const updateExpenseError = (error) => ({
  type: UPDATE_EXPENSE_ERROR,
  payload: error
});

export const deleteExpense = (id) => ({
  type: DELETE_EXPENSE,
  payload: id
});

export const deleteExpenseSuccess = (id) => ({
  type: DELETE_EXPENSE_SUCCESS,
  payload: id
});

export const deleteExpenseError = (error) => ({
  type: DELETE_EXPENSE_ERROR,
  payload: error
});