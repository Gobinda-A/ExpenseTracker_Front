export async function validateExpenseData(data) {
    const { category,location,description, amount} = data;
    if (!category || !location || !description || !amount) {
        throw new Error("Missing fields");
    }
}

export async function validateBalanceData(data) {
    const { amount} = data; 
    if (!amount) 
        throw new Error("Amount is required");
}   
