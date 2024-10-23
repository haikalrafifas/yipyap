import { createContext, useState, useContext } from 'react';

// Create the context
const LocalDataContext = createContext();

// Create a provider component
export const LocalDataProvider = ({ children }) => {
  const [data, setData] = useState({});

  const setLocalData = (newData) => {
    setData((prev) => ({
      ...prev,
      ...newData,
    }));
  };

  return (
    <LocalDataContext.Provider value={{ localData: data, setLocalData }}>
      {children}
    </LocalDataContext.Provider>
  );
};

// Custom hook for consuming context
export const useLocalData = () => {
  return useContext(LocalDataContext);
};
