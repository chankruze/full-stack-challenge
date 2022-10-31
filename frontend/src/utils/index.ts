/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Oct 31 2022 15:29:00 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import axios from "axios";
import { SortDirection } from "../enums";
import { Currency } from "../types";

export const fetchCurrencies = async () => {
  const { data } = await axios.get(`https://api.moonpay.com/v3/currencies`);

  if (!data) return null;

  return data;
};

export const sortCurrencies = (
  items: Currency[],
  key: string,
  direction: SortDirection
) => {
  const sorted = items.sort((a, b) => {
    if (a[key] < b[key]) {
      return direction === SortDirection.ASC ? -1 : 1;
    }

    if (a[key] > b[key]) {
      return direction === SortDirection.ASC ? 1 : -1;
    }

    return 0;
  });

  return [...sorted];
};

export const shuffleCurrencies = (items: Currency[] | []) => {
  for (let i = items.length; --i; ) {
    const j = Math.floor(Math.random() * (i + 1));
    [items[i], items[j]] = [items[j], items[i]];
  }

  return [...items];
};

export const filterCurrencies = (
  items: Currency[],
  isUsToggled: boolean,
  isTestModeToggled: boolean
) => {
  if (isUsToggled && !isTestModeToggled) {
    return items.filter((c: Currency) => c.isSupportedInUS === true);
  }

  if (!isUsToggled && isTestModeToggled) {
    return items.filter((c: Currency) => c.supportsTestMode === true);
  }

  if (isUsToggled && isTestModeToggled) {
    return items.filter(
      (c: Currency) =>
        c.supportsTestMode === true && c.supportsTestMode === true
    );
  }

  return items;
};
