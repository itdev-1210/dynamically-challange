import { ofType } from "redux-observable";
import { map, catchError, mergeMap, switchMap } from "rxjs/operators";
import { of } from "rxjs";
import { ajax } from "rxjs/ajax";
import { BACKEDN_SERVER } from "../../../config";

import {
  GET_EXPENSE_LIST,
  ADD_EXPENSE,
  UPDATE_EXPENSE,
  DELETE_EXPENSE,
  getExpenseListSuccess,
  getExpenseListError,
  addExpenseSuccess,
  addExpenseError,
  updateExpenseSuccess,
  updateExpenseError,
  deleteExpenseSuccess,
  deleteExpenseError,
} from "./actions";

export const getExpenseListEpic = (action$, state$) =>
  action$.pipe(
    ofType(GET_EXPENSE_LIST),
    mergeMap(() => {
      return ajax(`${BACKEDN_SERVER}/expenses`).pipe(
        map(({ response }) => getExpenseListSuccess(response)),
        catchError((error) => of(getExpenseListError(error)))
      );
    })
  );

export const addExpenseEpic = (action$, state$) =>
  action$.pipe(
    ofType(ADD_EXPENSE),
    switchMap(({ payload }) => {
      return ajax({
        url: `${BACKEDN_SERVER}/expenses`,
        method: "POST",
        body: payload,
      }).pipe(
        map(({ response }) => addExpenseSuccess(response)),
        catchError((error) => of(addExpenseError(error)))
      );
    })
  );

export const updateExpenseEpic = (action$, state$) =>
  action$.pipe(
    ofType(UPDATE_EXPENSE),
    switchMap(({ payload }) => {
      return ajax({
        url: `${BACKEDN_SERVER}/expenses`,
        method: "PUT",
        body: payload,
      }).pipe(
        map(({ response }) => updateExpenseSuccess(response)),
        catchError((error) => of(updateExpenseError(error)))
      );
    })
  );

export const deleteExpenseEpic = (action$, state$) =>
  action$.pipe(
    ofType(DELETE_EXPENSE),
    switchMap(({ payload }) => {
      return ajax({
        url: `${BACKEDN_SERVER}/expenses`,
        method: "DELETE",
        body: payload,
      }).pipe(
        map(({ response }) => deleteExpenseSuccess(response)),
        catchError((error) => of(deleteExpenseError(error)))
      );
    })
  );
