import { combineEpics } from 'redux-observable';
import { combineReducers } from 'redux';
import expense from './expense/reducer';
import { getExpenseListEpic, addExpenseEpic, updateExpenseEpic, deleteExpenseEpic } from './expense/epics';

export const rootEpic = combineEpics(
  getExpenseListEpic,
  addExpenseEpic,
  updateExpenseEpic,
  deleteExpenseEpic,
);

export const rootReducer = combineReducers({
  expense
})