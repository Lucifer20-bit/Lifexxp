import React, { createContext, useContext, useState, useCallback, ReactNode } from 'react';

interface AppLayoutContextValue {
  sidebarOpen: boolean;
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
}

const AppLayoutContext = createContext<AppLayoutContextValue>({
  sidebarOpen: false,
  openSidebar: () => {},
  closeSidebar: () => {},
  toggleSidebar: () => {},
});

export const useAppLayout = () => useContext(AppLayoutContext);

export const AppLayoutProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const openSidebar = useCallback(() => setSidebarOpen(true), []);
  const closeSidebar = useCallback(() => setSidebarOpen(false), []);
  const toggleSidebar = useCallback(() => setSidebarOpen(v => !v), []);

  return (
    <AppLayoutContext.Provider value={{ sidebarOpen, openSidebar, closeSidebar, toggleSidebar }}>
      {children}
    </AppLayoutContext.Provider>
  );
};
