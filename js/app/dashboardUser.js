// js/app/userSession.js
import { getCurrUser,logOut } from "../api/userApi.js";
import { setProfile,resetProfile} from "../dom/profileDom.js";

//load current user details
export async function loadCurrentUser() {
  try {
    const user = await getCurrUser();
    setProfile(user);
    return user;
  } catch {
    alert("Session expired, please log in again.");
    window.location.href = "../index.html";
  }
}

//logout function
export async function logOutUser() {
    try {
    await logOut();
    alert("Logged out successfully!");  
    resetProfile(); // reset profile name
    window.location.replace("../index.html"); // redirect after logout
    
  } catch (err) {
    alert("Logout failed: " + err.message);
  }
}


