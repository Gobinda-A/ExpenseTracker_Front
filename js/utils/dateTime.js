import {reloadExpenseRows} from "../dom/expenseDom.js";

let currentDate = new Date(); // Keep global current date reference

export function formatDateTime(dateObj) {
  const date = dateObj.toISOString().split("T")[0];
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const day = days[dateObj.getDay()];

  let hours = dateObj.getHours().toString().padStart(2, "0");
  let minutes = dateObj.getMinutes().toString().padStart(2, "0");
  let seconds = dateObj.getSeconds().toString().padStart(2, "0");
  let ampm = hours >= 12 ? "PM" : "AM";

  const time=`${hours}:${minutes}:${seconds}`;

  hours = hours % 12;
  hours = hours ? hours : 12;
  const time2 = `${hours}:${minutes} ${ampm}`;
  
  return { date, day, time, time2 };
}

export function getCurrMonthYr() {
    const currentDay=currentDate.getDate();
    const currentMonth = currentDate.getMonth(); // 0-based (0 = Jan)
    const currentYear = currentDate.getFullYear();
    return {currentDay,currentMonth,currentYear};
}
export async function updateTopBarDate(currentDay,currentMonth,currentYear){
  let monthStr=(currentMonth+1).toString();;
  if (currentMonth+1<10)
    monthStr="0"+(currentMonth+1).toString();
  const currDate=currentDay+"/"+monthStr+"/"+currentYear;
  document.getElementById("curr-date-card").innerText=currDate;
  document.getElementById("curr-date-top").innerText=currDate;
  updateMonthText(currentMonth);
}

function updateMonthText(currentMonth){
  const monthArr=["January","February","March","April","May","June","July",
  "August","September","October","November","December"];
  const monthText=monthArr[currentMonth];
  document.querySelector("#expense-stat-card .total-box h3").textContent=`${monthText} Expenses`;
  document.querySelector(".topbar-stat .pill").textContent=monthText;

}

export async function decreaseMonth(){
  currentDate.setMonth(currentDate.getMonth() - 1); // Go back one month
  await reloadExpenseRows();
}
export async function increaseMonth() {
  currentDate.setMonth(currentDate.getMonth() + 1); // Go to next month
  await reloadExpenseRows();
}