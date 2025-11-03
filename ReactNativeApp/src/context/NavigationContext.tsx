import React, { createContext, useContext, useRef } from 'react';
import { NavigationContainerRef } from '@react-navigation/native';

interface NavigationContextType {
  navigate: (screen: string, params?: any) => void;
  setNavigationRef: (ref: NavigationContainerRef<any>) => void;
}

const NavigationContext = createContext<NavigationContextType | undefined>(undefined);

export const useNavigationContext = () => {
  const context = useContext(NavigationContext);
  if (!context) {
    throw new Error('useNavigationContext must be used within NavigationProvider');
  }
  return context;
};

export const NavigationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigationRef = useRef<NavigationContainerRef<any>>(null);

  const navigate = (screen: string, params?: any) => {
    console.log('NavigationContext navigate called:', screen);
    if (navigationRef.current) {
      console.log('Navigating to:', screen);
      navigationRef.current.navigate(screen, params);
    } else {
      console.log('Navigation ref is null');
    }
  };

  const setNavigationRef = (ref: NavigationContainerRef<any>) => {
    navigationRef.current = ref;
    console.log('Navigation ref set');
  };

  return (
    <NavigationContext.Provider value={{ navigate, setNavigationRef }}>
      {React.cloneElement(children as React.ReactElement, { ref: setNavigationRef })}
    </NavigationContext.Provider>
  );
};
