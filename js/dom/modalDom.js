const expenseModal = document.getElementById("expenseModal");
const balModal = document.getElementById("balModal");
const expenseAddBtn=document.getElementById("expense-add-submit");
const expenseUpdateBtn=document.getElementById("expense-update-submit");

export function openExpenseModal() {
  expenseModal.style.display = "flex";
}

export function closeExpenseModal() {
document.getElementById("expenseForm").reset();
expenseModal.style.display = "none";

if (expenseAddBtn.classList.contains("hidden")){
  expenseAddBtn.classList.remove("hidden");
  expenseUpdateBtn.classList.add("hidden");
}
}

export function openBalModal() {
balModal.style.display = "flex";
}

export function closeBalModal() {
  document.getElementById("balForm").reset();
  balModal.style.display = "none";
} 

export function openExpenseUpdateModal() {
  const card = document.querySelector(".expense-card.selected");
  if(!card) return;
  expenseModal.style.display = "flex";

  // Toggle Update-Add button
  expenseAddBtn.classList.add("hidden");
  expenseUpdateBtn.classList.remove("hidden");

  // Pre-fill the form fields
  const amt=card.querySelector(".expense-amount").textContent.trim().replace('₹', ''); 
  document.getElementById("amount").value =amt;
  document.getElementById("amount2").value =amt //save original amt
  document.getElementById("location").value = card.querySelector(".expense-location").textContent.trim();
  document.getElementById("description").value = card.querySelector(".expense-description").textContent.trim();
  document.getElementById("category").value = card.querySelector(".expense-category").textContent.trim();
  document.getElementById("form-expense-id").value=card.querySelector("#card-expense-id").textContent.trim();
  
}