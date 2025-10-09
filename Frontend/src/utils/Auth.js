// this is for register user and save data to local storage
export const registerUserLocal = ( userName, email, password ) => {
  localStorage.setItem("user", JSON.stringify({ userName, email, password }));
};

// this is for login user and get data from local storage
export const loginUserLocal = (email, password) => {
  const User = localStorage.getItem("user");
  if(User){
    console.log("User Logged in!");
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.email === email && user?.password === password;
  }else{
    localStorage.setItem("user", JSON.stringify({ email, password }));
    console.log("User Logged in!");
    const user = JSON.parse(localStorage.getItem("user"));
    return user?.email === email && user?.password === password;
  }
};

// this is for logout user and remove data from local storage
// export const logoutUserLocal = () => {
//   localStorage.removeItem("user");
// };

// this is for authenticated data from local storage
// export const isAuthenticatedLocal = () => {
//   return !!localStorage.getItem("user");
// };