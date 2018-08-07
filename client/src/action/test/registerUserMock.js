export const registerUserSuccess = () => ({
    user: {
        name: "gyang01",
        email: "test01@gmail.com"
    }
});

export const registerUserFailure = () => ({
    email: "Error: email test01@gmail.com already registered"
});

export const userLoginSuccess = () => ({
    success: true,
    token:
        "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjViNWYxMDJlZjdmYmQyMDNhZWVkODZmZCIsIm5hbWUiOiJHYXJuZXQgWWFuZyIsImF2YXRhciI6Ii8vd3d3LmdyYXZhdGFyLmNvbS9hdmF0YXIvNzBmNjQxY2NlZmM2NWFmYzJiODIwYmEzNmI3YTE4MTU_cz0yMDAmcj1wZyZkPW1tIiwiaWF0IjoxNTMzNjQ0MTEzLCJleHAiOjE1MzM2NDc3MTN9._Aq2OP1RKx3ID6bS_1bff74q9LEqtMEPVi8E5o2aUYA"
});

export const userNotFound = () => ({
    email: "User not found"
});

export const userPasswordInvalid = () => ({
    password: "invalid password"
});
