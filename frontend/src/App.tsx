import { useEffect, useState } from "react";
import { CurrencyCard } from "./components/CurrencyCard";
import { Header } from "./components/Header";
import { Toolbar } from "./components/Toolbar";
import { AppContext } from "./contexts/AppContext";
import { SortDirection, SortKey } from "./enums";
import { Currency } from "./types";
import { fetchCurrencies, filterCurrencies, sortCurrencies } from "./utils";

export const App = () => {
  const [currencies, setCurrencies] = useState<Currency[]>([]);
  const [sortedCurrencies, setSortedCurrencies] = useState<Currency[]>([]);
  // options
  const [isSupportedInUS, setIsSupportedInUS] = useState(false);
  const [supportsTestMode, setSupportsTestMode] = useState(false);
  const [sortKey, setSortKey] = useState(SortKey.NAME);
  const [sortDirection, setSortDirection] = useState(SortDirection.ASC);

  // initial data fetch
  useEffect(() => {
    (async () => {
      setCurrencies(await fetchCurrencies());
    })();
  }, []);

  useEffect(() => {
    const filtered = filterCurrencies(
      currencies,
      isSupportedInUS,
      supportsTestMode
    );

    setSortedCurrencies(sortCurrencies(filtered, sortKey, sortDirection));
  }, [sortKey, sortDirection, currencies, isSupportedInUS, supportsTestMode]);

  return (
    <AppContext.Provider
      value={{
        isSupportedInUS,
        setIsSupportedInUS,
        supportsTestMode,
        setSupportsTestMode,
        sortDirection,
        sortKey,
        setSortKey,
        setSortDirection,
        sortedCurrencies,
        setSortedCurrencies,
      }}
    >
      <div className="h-screen flex flex-col">
        {/* header with toolbar */}
        <Header />
        {/* currencies listing */}
        {sortedCurrencies.length > 0 ? (
          <div className="overflow-y-auto">
            <div className="max-w-7xl p-4 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 lg:gap-4">
              {sortedCurrencies.map((currency: Currency) => (
                <CurrencyCard key={currency.id} currency={currency} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </AppContext.Provider>
  );
};
