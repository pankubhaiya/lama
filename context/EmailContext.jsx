// EmailContext.js
import { createContext, useContext, useState } from 'react';

const EmailContext = createContext();

export const EmailProvider = ({ children }) => {
  const [globalEmail, setGlobalEmail] = useState('');

  return (
    <EmailContext.Provider value={{ globalEmail, setGlobalEmail }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmailContext = () => {
  return useContext(EmailContext);
};
