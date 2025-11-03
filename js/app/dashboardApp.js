import { openExpenseModal, closeExpenseModal,openBalModal,closeBalModal,openExpenseUpdateModal } from "../dom/modalDom.js";
import {loadCurrentUser, logOutUser} from "./dashboardUser.js"
import {initProfileDropdown} from "../dom/profileDom.js"
import { addExpense,addBalance, updateExpense } from "../app/dashboardExpense.js";
import { reloadExpenseRows,toogleDashboardStats,initExpenseCardSelection,reloadBalance } from "../dom/expenseDom.js";
import { decreaseMonth, increaseMonth } from "../utils/dateTime.js";

export async function initDashboard() {
  await loadCurrentUser();  //load curr user
  await initExpenseCardSelection();
  await reloadExpenseRows(); //load expenses
  await reloadBalance(); //relaod Balance
  initProfileDropdown(); //init profile dropdown
  
  document.getElementById("logoutBtn").addEventListener("click",logOutUser);

  // For previous month buttons
  document.querySelectorAll("#prevMonth-top, #prevMonth-card").forEach(btn => {
    btn.addEventListener("click", decreaseMonth);
  });

  // For next month buttons
  document.querySelectorAll("#nextMonth-top, #nextMonth-card").forEach(btn => {
    btn.addEventListener("click", increaseMonth);
  });

  document.getElementById("dashboard-stat-toggle").addEventListener("click", toogleDashboardStats);

  document.getElementById("bal-add-btn").addEventListener("click", openBalModal);

  document.getElementById("closebalModal").addEventListener("click", closeBalModal);

  document.getElementById("bal-add-submit").addEventListener("click",addBalance)
  
  document.getElementById("expense-add-btn").addEventListener("click",openExpenseModal);

  document.getElementById("closeModal").addEventListener("click", closeExpenseModal);

  document.getElementById("expense-add-submit").addEventListener("click",addExpense);

  document.getElementById("edit-btn").addEventListener("click",openExpenseUpdateModal);

  document.getElementById("expense-update-submit").addEventListener("click",updateExpense);
}
