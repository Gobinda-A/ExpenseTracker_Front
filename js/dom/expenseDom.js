import { addBalance, getCurrUser} from "../api/userApi.js";
import { loadExpenses, saveExpense } from "../app/dashboardExpense.js";
import { formatDateTime, getCurrMonthYr, updateTopBarDate} from "../utils/dateTime.js";
import { getProfile,setProfile } from "./profileDom.js";
const expenseTable = document.querySelector("table tbody");
const expenseContainer = document.getElementById("card-mobile"); // Mobile container div

export async function reloadExpenseRows() {
  const user = getProfile();
  const expenses = await loadExpenses(user.emailID); // Load all expenses from DB
  expenseTable.innerHTML = ""; // Clear existing rows

  let totalExpense = 0;
  let totalMonthlyExpense = 0;

  // Get current month and year
  const { currentDay, currentMonth, currentYear } = await getCurrMonthYr();
  await updateTopBarDate(currentDay, currentMonth, currentYear);

  expenses.forEach((exp) => {
    //update total expense
    totalExpense += parseInt(exp.amount);

    const expenseDate = new Date(exp.date);
    const expenseMonth = expenseDate.getMonth();
    const expenseYear = expenseDate.getFullYear();

    if (expenseMonth === currentMonth && expenseYear === currentYear) {
      totalMonthlyExpense += parseInt(exp.amount);

      const newRow = document.createElement("tr");
      newRow.innerHTML = `
    <td>${exp.date}</td>
    <td>${exp.day}</td>
    <td>${exp.time}</td>
    <td><span class="chip"><span class="dot"></span>${exp.category}</span></td>
    <td>${exp.location}</td>
    <td>${exp.description}</td>
    <td class="td-amount">₹${exp.amount}</td>
  `;
      expenseTable.appendChild(newRow);
    }
  });

  await updateExpenses(totalExpense, totalMonthlyExpense);
  await reloadExpenseRowsMobile(expenses); // Also reload mobile view
}

export async function reloadExpenseRowsMobile(expenses) {
  if (!expenseContainer) return; // safety check

  expenseContainer.innerHTML = "";

  const { currentMonth, currentYear } = await getCurrMonthYr();

  expenses.forEach((exp) => {
    const expenseDate = new Date(exp.date);
    const expenseMonth = expenseDate.getMonth();
    const expenseYear = expenseDate.getFullYear();

    if (expenseMonth === currentMonth && expenseYear === currentYear) {
      const expenseCard = document.createElement("div");
      expenseCard.classList.add("expense-card");

      expenseCard.innerHTML = `
        <div class="expense-header">
          <span class="expense-date">${exp.date} (${exp.day}) • ${exp.time}</span>
          <span class="expense-amount">₹${exp.amount}</span>
        </div>
        <div class="expense-body">
          <span class="expense-location">${exp.location}</span>
          <span class="expense-category">${exp.category}</span>
        </div>
        <div class="expense-description">${exp.description}</div>
      `;

      expenseContainer.appendChild(expenseCard);
    }
  });
}
export async function renderExpenseRow({
  category,
  location,
  description,
  amount,
}) {
  const { date, day, time, time2 } = formatDateTime(new Date()); //get current date and time

  const user = getProfile();
  await saveExpense({
    emailID: user.emailID,
    date,
    day,
    time,
    category,
    location,
    description,
    amount,
  }); // Save Expense to DB

  await reloadExpenseRows(); // Reload all expenses to reflect the new addition
}

export async function renderBalance({ amount }) { 
  const user = getProfile();
  const newBalance= (Number(user.balance)||0)+(Number(amount)||0);
  const updatedUser=await addBalance({emailID:user.emailID, balance:newBalance});
  setProfile(updatedUser);
  await reloadBalance();
}

export async function reloadBalance() {
  const user = getProfile();
  document.getElementById("bal-amount").textContent=`₹${user.balance}`;
}

async function updateExpenses(totalExpense, totalMonthlyExpense) {
  document.getElementById("this-month-expense").innerText =
    "₹" + totalMonthlyExpense;
  document.getElementById("stat-month-amt").innerText =
    "₹" + totalMonthlyExpense;
  document.getElementById("stat-tot-amt").innerText = "₹" + totalExpense;
}

export async function toogleDashboardStats() {
  const mobileCard = document.getElementById("card-mobile");
  const statsCard = document.getElementById("expense-stat-card");
  const statImg = document.getElementById("stat-img");
  const dashImg = document.getElementById("dash-img");
  mobileCard.classList.toggle("hidden");
  statsCard.classList.toggle("hidden");
  statImg.classList.toggle("hidden");
  dashImg.classList.toggle("hidden");
}

export async function initExpenseCardSelection() {
  const cards = document.querySelectorAll(".expense-card");

  document.addEventListener("click", (e) => {
    const clickedCard = e.target.closest(".expense-card");
    const isEditBtn = e.target.closest("#edit-btn");

    // 🟢 Case 1: Clicked on an expense card
    if (clickedCard) {
      // If it's already selected, deselect it (toggle off)
      if (clickedCard.classList.contains("selected")) {
        clickedCard.classList.remove("selected");
      } else {
        // Otherwise, clear other selections and select this one
        cards.forEach((c) => c.classList.remove("selected"));
        clickedCard.classList.add("selected");
      }
      return; // ✅ Stop further checks
    }

    // 🟡 Case 2: Clicked somewhere else but not on Edit button
    if (!isEditBtn) {
      cards.forEach((c) => c.classList.remove("selected"));
    }
  });
}
