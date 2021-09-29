import React, { useState, useEffect, useCallback, useRef } from "react";
import { useDispatch } from 'react-redux';
import {
  Dialog,
  Button,
  Grid,
} from "@material-ui/core";
import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";
import moment from 'moment'
import { addExpense, updateExpense } from '../redux/modules/expense/actions'

function ExpenseDialog(props) {
  const dispatch = useDispatch()
  const { open, handleClose, expense } = props;
  const form = useRef(null);
  const [data, setData] = useState({
    id: null,
    description: "",
    amount: 0,
  })

  useEffect(() => {
    if (expense)
      setData(expense)
    else setData({
      id: null,
      description: "",
      amount: 0
    })
  }, [expense])

  const handleChange = (event) => {
    setData({ ...data, [event.target.name]: event.target.value })
  };

  const handleFormSubmit = useCallback(() => {
    const { id } = data;
    const today = moment().toISOString();
    if (id) {
      dispatch(updateExpense({ ...data, date: today }))
    } else {
      dispatch(addExpense({ ...data, date: today }))
    }
    handleClose()
  }, [dispatch, data, handleClose]);

    return (
      <Dialog onClose={handleClose} open={open} className="expense-dalog">
        <h3 style={{ marginTop: 0 }}>{`${!data.id ? 'Add' : 'Update'} Expense`}</h3>
        <ValidatorForm ref={form} onSubmit={handleFormSubmit}>
          <Grid className="mb-16" container spacing={4}>
            <Grid item xs={12}>
              <TextValidator
                className="w-100 mb-16"
                label="Description"
                onChange={handleChange}
                type="text"
                name="description"
                value={data.description}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
              <TextValidator
                className="w-100 mb-16"
                label="Amount"
                onChange={handleChange}
                type="number"
                name="amount"
                value={data.amount}
                validators={["required"]}
                errorMessages={["this field is required"]}
              />
            </Grid>
          </Grid>

          <div className="flex flex-space-between flex-middle">
            <Button className="btnAddExpense" variant="contained" type="submit">
              Save
            </Button>
            <Button className="btnEditExpense" onClick={() => handleClose()} style={{ marginLeft: 10 }}>Cancel</Button>
          </div>
        </ValidatorForm>
      </Dialog>
    );
}

export default ExpenseDialog;
