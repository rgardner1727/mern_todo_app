import React, { createContext, useState, useEffect } from "react";

const TokenContext = createContext();

export const TokenContextProvider = ({children}) => {
    
    const [token, setToken] = useState(() => {
        const savedToken = localStorage.getItem('token');
        return savedToken !== null ? savedToken : null;
    });

    useEffect(() => {
        localStorage.setItem('token', token);
    }, [token]);

    return (
        <TokenContext.Provider value={{token, setToken}}>
            {children}
        </TokenContext.Provider>
    );
};

export default TokenContext;

