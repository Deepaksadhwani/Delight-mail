export const checkValidData = (name, email, password) => {
    const isNameValid = name ? /^[0-9A-Za-z]{6,20}$/.test(name) : true;
    const isEmailValid = email ? /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email) : true;
    const isPasswordValid = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/.test(password);
  
    if (!isNameValid) return "Username is not valid";
    if (!isEmailValid) return "Email ID is not valid";
    if (!isPasswordValid) return "Password is Weak";
    return null;
  };