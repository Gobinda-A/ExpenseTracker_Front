import { getProfile } from "../dom/profileDom.js";

export async function validateExpenseData(data) {
    const { category,location,description, amount,amount2} = data;
    if (!category || !location || !description || !amount) {
        throw new Error("Missing fields");
    }
    const user=getProfile();

    const prevAmt=parseInt(amount2) || 0;
    const amt=parseInt(amount) || 0;

    if(isNaN(amt) || amt<=0)
         throw new Error("Invalid amount");

    // Balance check when add exp
    if(prevAmt===0 && amt>user.balance)
        throw new Error("Insufficient Balance!");

    // Balance check when update
    if(prevAmt>0 && amt>(user.balance+prevAmt))
        throw new Error("Insufficient Balance!");
}

export async function validateBalanceData(data) {
    const { amount} = data; 
    if (!amount) 
        throw new Error("Amount is required");
}   
