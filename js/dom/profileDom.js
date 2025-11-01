export function setProfile(user) {
  const profileName = document.getElementById("profileName");
  profileName.textContent = (user.firstName + " " + user.lastName) || "Guest";
  // store after login or loadCurrentUser
  sessionStorage.setItem("user", JSON.stringify(user));
}

export function getProfile(){
  return JSON.parse(sessionStorage.getItem("user"));
}

export function resetProfile(){
  document.getElementById("profileName").textContent = "Guest";
}

//toggle dropdown
export function toggleDropdown() {
  const profile = document.getElementById("profileMenu");
  profile.classList.toggle("open");
}

//init profile dropdown
export function initProfileDropdown() {
  const avatar = document.querySelector(".avatar");
  avatar.addEventListener("click", toggleDropdown);

  window.addEventListener("click", function (e) {
    const profile = document.getElementById("profileMenu");
    if (!profile.contains(e.target)) {
      profile.classList.remove("open");
    }
  });
}