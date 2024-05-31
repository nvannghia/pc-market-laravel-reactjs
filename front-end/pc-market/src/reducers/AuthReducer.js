const AuthReducer = (currentState, action) => {
    switch (action.type) {
        case "login":
            localStorage.setItem("username", action.payload.name);
            localStorage.setItem("userID", action.payload.id);
            localStorage.setItem("userRole", action.payload.role);
            localStorage.setItem("user", JSON.stringify(action.payload));
            return action.payload;
        case "logout":
            //clear cart and info of user
            sessionStorage.removeItem("cartArray");
            localStorage.clear();
            return null;
    }

    return currentState;
}

export default AuthReducer