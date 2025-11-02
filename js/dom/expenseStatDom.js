export async function updateExpenseStat(currentMonthExpenses, totalMonthlyExpense) {
  const expenseStatRow=document.querySelector("#expense-stat-card .stat-row");
  const stats=expenseStatRow.querySelectorAll(".stat");
  // Initialize category totals
  const expCategory = { 
    Food: 0, Grocery: 0, Transport: 0, Electricity: 0,
    Medical: 0, Rent: 0, Recharge: 0, EMI: 0,
    Family: 0, Dependant: 0, Shopping: 0, Others: 0
  };

  // Sum up all expenses per category
  currentMonthExpenses.forEach(exp => {
    const amt = parseInt(exp.amount);
    if (expCategory.hasOwnProperty(exp.category)) expCategory[exp.category] += amt;
    else expCategory.Others += amt;
  });

  // Update each stat row dynamically
  stats.forEach(stat => {
    const label = stat.querySelector(".label").textContent.trim();
    const fill = stat.querySelector(".fill");
    const percent = stat.querySelector(".percent");

    const catAmt = expCategory[label] || 0;
    const width = totalMonthlyExpense > 0 ? (catAmt / totalMonthlyExpense) * 100 : 0;

    fill.style.width = `${width}%`;
    if(catAmt>0){
        percent.textContent = `₹${catAmt}`;
        stat.classList.remove("hidden");
    }
  });
}