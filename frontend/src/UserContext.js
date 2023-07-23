import React, { createContext, useEffect, useState } from 'react';
import { getToken } from './utils/helper';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

useEffect(()=>{
    const token = getToken()
    if(token)
    {
        setIsLoggedIn(true)
    }
},[])

  return (
    <UserContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };