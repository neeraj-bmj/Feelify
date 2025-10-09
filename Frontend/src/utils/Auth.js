// this is for register user and save data to local storage
export const registerUserLocal = ( userName, email, password ) => {
  localStorage.setItem("user", JSON.stringify({ userName, email, password }));
};

