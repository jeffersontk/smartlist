import React, { useState } from "react";
import { PriceContext } from "../hooks/useCart";

interface PriceProviderProps {
  children: React.ReactNode;
}

const PriceProvider = ({ children }: PriceProviderProps) => {
  const [price, setPrice] = useState(0);

  return (
    <PriceContext.Provider value={{ price, setPrice }}>
      {children}
    </PriceContext.Provider>
  );
};

export default PriceProvider;
