// const BASE_URL = "http://localhost:8080/api";
// Function to create a user
export async function createUser(user){
const response=  await fetch(`${BASE_URL}/user/create`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    body: JSON.stringify(user)
});
if (!response.ok) 
    throw new Error("Failed to Sign Up");

return response.json();
}

// Function to get a user-login
export async function getUser(user){
const response=await fetch(`${BASE_URL}/user/get`, {
    method: "POST",
    headers: { "Content-Type": "application/json"},
    credentials: "include", // ✅ Important: send cookies
    body: JSON.stringify(user)
});
if (!response.ok) 
throw new Error("Invalid Credentials");

return response.json();
}

//get current user
export async function getCurrUser(){
const response=await fetch(`${BASE_URL}/user/me`, {
    method: "GET",
    credentials: "include" // ✅ Important: send cookies
});
if (!response.ok) 
    throw new Error("User Logged Out");
const user=await response.json();
return user;
}

//log out user
export async function logOut() {
const response = await fetch(`${BASE_URL}/user/logout`, {
    method: "POST",
    credentials: "include" // ✅ Important: send cookies        
});
if (!response.ok) 
    throw new Error("User Logout Failed");
}

export async function addBalance(data) {
const response = await fetch(`${BASE_URL}/user/addBalance`, {
    method: "POST",
    headers: {
        "Content-Type": "application/json"
    },
    credentials: "include", // ✅ Important: send cookies
    body: JSON.stringify(data)
});
if (!response.ok)
    throw new Error("Failed to Add Balance");
const user=await response.json();
return user;

}
