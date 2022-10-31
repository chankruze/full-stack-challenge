/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Oct 31 2022 16:04:40 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { createContext, useContext } from "react";
import { SortDirection, SortKey } from "../enums";
import { Currency } from "../types";

export type AppContextType = {
  isSupportedInUS: boolean;
  setIsSupportedInUS: (val: boolean) => void;
  supportsTestMode: boolean;
  setSupportsTestMode: (val: boolean) => void;
  sortDirection: SortDirection;
  sortKey: string;
  setSortKey: React.Dispatch<React.SetStateAction<SortKey>>;
  setSortDirection: React.Dispatch<React.SetStateAction<SortDirection>>;
  sortedCurrencies: Currency[];

  setSortedCurrencies: (val: Currency[]) => void;
};

export const AppContext = createContext<AppContextType | undefined>(undefined);

export function useAppContext(): AppContextType {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error(
      "useAppContext should be used within the AppContext provider!"
    );
  }

  return context;
}
