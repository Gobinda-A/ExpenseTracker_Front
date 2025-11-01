import { createExpense, getExpenses} from "../api/expenseApi.js";
import { renderExpenseRow,renderBalance} from "../dom/expenseDom.js";
import { closeBalModal, closeExpenseModal } from "../dom/modalDom.js";
import { validateBalanceData, validateExpenseData } from "../utils/validation.js";
const expenseForm = document.getElementById("expenseForm");
const balForm = document.getElementById("balForm");

//save expense into DB
export async function saveExpense(expenseData) {
  try{
    const savedExpense = await createExpense(expenseData);
    //alert("Expense added successfully!");
  }
  catch(err){
    alert("Failed to save expense: " + err.message);
  }
}

//get expenses from DB
export async function loadExpenses(emailID) {
  try{
    const expenses = await getExpenses(emailID);
    //alert("Expense loaded successfully!");
    return expenses;
  }
  catch(err){
    alert("Failed to load expenses: " + err.message);
  }
}

export async function addBalance(){
    const data = Object.fromEntries(new FormData(balForm));
    try{
    await validateBalanceData(data);
    renderBalance(data);
    balForm.reset();
    closeBalModal();
  }
  catch(err){
    alert(err);
  }
}

export async function addExpense(){
    const data = Object.fromEntries(new FormData(expenseForm));
    try{
    await validateExpenseData(data);
    renderExpenseRow(data);
    expenseForm.reset();
    closeExpenseModal();
  }
  catch(err){
    alert(err);
  }
}