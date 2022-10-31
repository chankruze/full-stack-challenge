/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Oct 31 2022 17:38:16 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import classNames from "classnames";
import { FC } from "react";
import { RiTestTubeLine } from "react-icons/ri";
import { Currency } from "../types";

interface CurrencyCardProps {
  currency: Currency;
}

export const CurrencyCard: FC<CurrencyCardProps> = ({ currency }) => {
  return (
    <div
      className={classNames(
        "relative p-4 flex items-center gap-2 justify-between border border-blue-300",
        { "bg-orange-50/50": currency.supportsTestMode }
      )}
    >
      <div>
        <p className="font-medium text-lg">{currency.name}</p>
        <p className="text-gray-500 uppercase text-sm">{currency.code}</p>
      </div>

      {currency.isSupportedInUS ? (
        <p className="ml-auto text-sm font-medium text-blue-500">US</p>
      ) : (
        <p className="ml-auto text-sm font-medium text-red-500">NON US</p>
      )}

      {currency.supportsTestMode ? (
        <div className="absolute text-center inset-0 flex items-center justify-center font-bold text-2xl">
          <RiTestTubeLine className="text-orange-500 w-12 h-12 opacity-10 rotate-45" />
        </div>
      ) : null}
    </div>
  );
};
