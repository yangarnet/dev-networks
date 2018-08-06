export const registerUserSuccess = () => ({
    user: {
        name: "gyang01",
        email: "test01@gmail.com"
    }
});

export const registerUserFailure = () => ({
    email: "Error: email test01@gmail.com already registered"
});
