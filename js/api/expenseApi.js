//const BASE_URL = "http://192.168.1.3:8080/api/expense";
const BASE_URL="http://localhost:8080/api/expense";
//save expense into DB
export async function createExpense(expense) {
const response = await fetch(`${BASE_URL}/create`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include", // ✅ Important: send cookies        
    body: JSON.stringify(expense)
});
if (!response.ok) 
    throw new Error("Failed to Save Expense");  
return response.json();
}

//getexpense from DB
export async function getExpenses(emailID) {
const response = await fetch(`${BASE_URL}/get/${emailID}`, {
    method: "GET",
    credentials: "include", // ✅ Important: send cookies        
});
if (!response.ok) 
    throw new Error("Failed to get Expenses");  
return response.json();
}