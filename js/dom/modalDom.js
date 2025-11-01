const expenseModal = document.getElementById("expenseModal");
const balModal = document.getElementById("balModal");

export function openExpenseModal() {
  expenseModal.style.display = "flex";
}

export function closeExpenseModal() {
document.getElementById("expenseForm").reset();
expenseModal.style.display = "none";
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
  if (!card) return;
  expenseModal.style.display = "flex";

  // Pre-fill the form fields
  document.getElementById("amount").value =card.querySelector(".expense-amount").textContent.trim()
  .replace('₹', ''); 
  document.getElementById("location").value = card.querySelector(".expense-location").textContent.trim();
  document.getElementById("description").value = card.querySelector(".expense-description").textContent.trim();
  document.getElementById("category").value = card.querySelector(".expense-category").textContent.trim();
  
}