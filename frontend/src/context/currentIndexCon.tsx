// ColorContext.tsx
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface IndexContextProps {
  currentIndex: number;
  changeIndex: () => void;
}

const IndexContext = createContext<IndexContextProps | undefined>(undefined);

interface IndexProviderProps {
  children: ReactNode;
}

export const IndexProvider: React.FC<IndexProviderProps> = ({ children }) => {
  const [currentIndex, setCurrentIndex] = useState(1);

  const changeIndex = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % 4);
  };

  // Automatically change color every 3 seconds
  useEffect(() => {
    const intervalId = setInterval(() => {
      changeIndex();
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

 
  return (
    <IndexContext.Provider value={{ currentIndex, changeIndex }}>
      {children}
    </IndexContext.Provider>
  );
};

export const useIndex = (): IndexContextProps => {
  const context = useContext(IndexContext);

  if (!context) {
    throw new Error('useColor must be used within a ColorProvider');
  }

  return context;
};
