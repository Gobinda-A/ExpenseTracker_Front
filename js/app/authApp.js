import { createUser, getUser } from "../api/userApi.js";
import { toggleToLogin, toggleToSignup, clearInputFields } from "../dom/authDom.js";

const signupForm = document.getElementById("signupForm");
const loginForm = document.getElementById("loginForm");

export function initAuth() {
  const signupBtn = document.getElementById("signupBtn");
  const loginBtn = document.getElementById("loginBtn");

  signupBtn.addEventListener("click",async () => {
    const user = {
      userName: document.getElementById("username").value,
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      emailID: document.getElementById("email").value,
      phoneNo: document.getElementById("phone").value,
      password: document.getElementById("password").value,
    };
    if (Object.values(user).some(v => !v)) {
      alert("Please fill all fields before signing up.");
      return;
    }
    try {
      const createdUser= await createUser(user);
      alert("User created successfully!");
      window.location.href = "index.html"; // Redirect to login page
    } catch (err) {
      alert("Error signing up: " + err.message);
    }
  });

  loginBtn.addEventListener("click", async () => {
    const user = {
      emailID: document.getElementById("loginEmail").value,
      password: document.getElementById("loginPass").value,
    };
    if (!user.emailID || !user.password) {
      alert("Please fill all fields before signing in.");
      return;
    }
    try {
      const loggedInUser =await getUser(user);
      //alert("Welcome " + loggedInUser.firstName);
      clearInputFields();
      window.location.href = "/html/dashboard.html";
    } 
    catch (err) {
      alert("Login failed: " + err.message);
       window.location.href = "index.html"; 
    }
  });

  document.getElementById("signinBtn").addEventListener("click", () => {
    toggleToLogin(signupForm, loginForm);
  });

  document.getElementById("backToSignup").addEventListener("click", () => {
    toggleToSignup(signupForm, loginForm);
  });
}
