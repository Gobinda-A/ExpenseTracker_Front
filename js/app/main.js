import { initAuth } from "./authApp.js";
import { initDashboard } from "./dashboardApp.js";
const isAuthPage = !!document.getElementById("signupForm");
const isDashboardPage = !!document.getElementById("expense-add-btn");

document.addEventListener("DOMContentLoaded", async () => {
  if (isAuthPage) {  initAuth(); }

  if (isDashboardPage) { initDashboard(); }
});
