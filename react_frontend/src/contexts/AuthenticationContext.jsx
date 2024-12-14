import React, { createContext, useState } from "react";

const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({children}) => {

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    
    const [token, setToken] = useState(null);

    return (
        <AuthenticationContext.Provider value={{token, setToken, isAuthenticated, setIsAuthenticated}}>
            {children}
        </AuthenticationContext.Provider>
    );
};

export default AuthenticationContext;

