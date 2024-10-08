// DataContext.js
import React, { createContext, useContext, useState } from "react";

const DataContext = createContext();
// export const useSidebar = () => {
//   return useContext(DataContext);
// };
export function DataProvider({ children }) {
  const [fileData, setFileData] = useState(null);
  const [orderData, setOrderData] = useState(null); // Show a number in header

  const updateFileData = (newData) => {
    setFileData(newData);
  };
  const updateOrderData = (newOrderData) => {
    setOrderData(newOrderData);
  };
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible((prev) => !prev);
  };
  return (
    <DataContext.Provider
      value={{
        fileData,
        updateFileData,
        orderData,
        updateOrderData,
        isSidebarVisible,
        toggleSidebar,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  return useContext(DataContext);
}
