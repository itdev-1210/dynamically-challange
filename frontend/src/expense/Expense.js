import React, { useEffect, useState, useCallback } from "react";
import { useSelector, useDispatch } from 'react-redux';
import {
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TablePagination,
  Button,
  Card
} from "@material-ui/core";
import moment from 'moment';
import ExpenseDialog from "./ExpenseDialog";
import ConfirmationDialog from "./ConfirmationDialog";
import { getExpenseList, deleteExpense } from '../redux/modules/expense/actions'

const TAX = 0.15

function Expense() {
  const dispatch = useDispatch()
  const [rowsPerPage, setRowsPerPage] = useState(10)
  const [page, setPage] = useState(0)
  const [selectedExpense, setSelectedExpese] = useState(null)
  const [shouldOpenEditorDialog, setShouldOpenEditorDialog] = useState(false)
  const [shouldOpenConfirmationDialog, setShouldOpenConfirmationDialog] = useState(false)

  const expense = useSelector((state) => state.expense)
  const expenseList = expense.items.map((item) => {
    let temp = { ...item }
    temp.taxes = parseFloat((Number(temp.amount) * TAX).toFixed(4));
    temp.date = moment(temp.date).format('YYYY-MM-DD [at] HH:mm')
    return temp
  })

  const subTotal = expense.items.reduce((a, b) => a + Number(b.amount), 0)
  const totalWithTaxes = parseFloat((subTotal * (1 + TAX)).toFixed(4))

  useEffect(() => {
    dispatch(getExpenseList())
  }, [dispatch])

  const handleChangePage = useCallback((event, newPage) => {
    setPage(newPage)
  }, [setPage])

  const handleDialogClose = useCallback(() => {
    setShouldOpenEditorDialog(false)
    setShouldOpenConfirmationDialog(false)
  }, [setShouldOpenEditorDialog, setShouldOpenConfirmationDialog]);

  const onChagenRowsPerPage = useCallback(event => {
    setRowsPerPage(event.target.value)
  }, [setRowsPerPage]);

  const handleAddExpense = useCallback(() => {
    setSelectedExpese(null)
    setShouldOpenEditorDialog(true)
  }, [setSelectedExpese, setShouldOpenEditorDialog])

  const handleEditExpense = useCallback((expense) => {
    setSelectedExpese(expense)
    setShouldOpenEditorDialog(true)
  }, [setSelectedExpese, setShouldOpenEditorDialog])

  const handleDeleteExpense = useCallback(expense => {
    setSelectedExpese(expense)
    setShouldOpenConfirmationDialog(true)
  }, [setSelectedExpese, setShouldOpenConfirmationDialog]);

  const handleConfirmationResponse = useCallback(() => {
    if (!selectedExpense) return
    dispatch(deleteExpense({ id: selectedExpense.id }))
    handleDialogClose()
  }, [dispatch, selectedExpense, handleDialogClose]);

  return (
    <div className="expense-container">
      <h2 className="header-title">Expense tracker</h2>
      <div className="header-wrapper">
        <div className="total-title">
          <span>{`The sub-total of expenses is ${subTotal}$`}</span><br/>
          <span>{`The total with taxes is ${totalWithTaxes}$`}</span>
        </div>
        <Button
          className="mb-16 btnAddExpense"
          variant="contained"
          onClick={handleAddExpense}
        >
          Add new expense
        </Button>
      </div>
      <Card className="w-100 overflow-auto" elevation={6}>
        <Table className="crud-table" style={{ whiteSpace: "pre", minWidth: "750px" }}>
          <TableHead>
            <TableRow>
              <TableCell className="bold">Description</TableCell>
              <TableCell className="bold">Amount</TableCell>
              <TableCell className="bold">Taxes(15%)</TableCell>
              <TableCell className="bold">Date</TableCell>
              <TableCell className="bold">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {expenseList
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((expense, index) => (
                <TableRow key={index}>
                  <TableCell className="px-0" align="left">
                    {expense.description}
                  </TableCell>
                  <TableCell className="px-0" align="left">
                    {expense.amount}
                  </TableCell>
                  <TableCell className="px-0">{expense.taxes}</TableCell>
                  <TableCell className="px-0" align="left">
                    {expense.date}
                  </TableCell>
                  <TableCell className="px-0 border-none">
                    <Button
                      className="btnEditExpense"
                      variant="contained"
                      onClick={() =>handleEditExpense(expense)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="btnDeleteExpense"
                      variant="contained"
                      onClick={() => handleDeleteExpense(expense)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>

        <TablePagination
          className="px-16"
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={expenseList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          backIconButtonProps={{
            "aria-label": "Previous Page"
          }}
          nextIconButtonProps={{
            "aria-label": "Next Page"
          }}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={onChagenRowsPerPage}
        />

        {shouldOpenEditorDialog && (
          <ExpenseDialog
            handleClose={handleDialogClose}
            open={shouldOpenEditorDialog}
            expense={selectedExpense}
          />
        )}
        {shouldOpenConfirmationDialog && (
          <ConfirmationDialog
            open={shouldOpenConfirmationDialog}
            onConfirmDialogClose={handleDialogClose}
            onYesClick={handleConfirmationResponse}
            text="Are you sure to delete?"
          />
        )}
      </Card>
    </div>
  );
}

export default Expense;
