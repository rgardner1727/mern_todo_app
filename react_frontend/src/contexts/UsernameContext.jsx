import React, { createContext, useState, useEffect } from 'react';

const UsernameContext = createContext();

export const UsernameContextProvider = ({children}) => {

    const [usernameContext, setUsernameContext] = useState(() => {
        const savedUsername = localStorage.getItem('usernameContext');
        return savedUsername !== null ? savedUsername : null;
    });

    useEffect(() => {
        localStorage.setItem('usernameContext', usernameContext);
    }, [usernameContext]);

    return (
        <UsernameContext.Provider value={{usernameContext, setUsernameContext}}>
            {children}
        </UsernameContext.Provider>
    );
};

export default UsernameContext;