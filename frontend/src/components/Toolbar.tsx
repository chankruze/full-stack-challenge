/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Oct 31 2022 15:35:39 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import classNames from "classnames";
import { RiShuffleLine, RiSortAsc, RiSortDesc } from "react-icons/ri";
import { useAppContext } from "../contexts/AppContext";
import { SortDirection, SortKey } from "../enums";
import { shuffleCurrencies } from "../utils";
import { Switch } from "./Switch";

export const Toolbar = () => {
  const ctx = useAppContext();

  return (
    <div className="flex items-center gap-4 flex-wrap justify-center sm:justify-end">
      <div className="flex items-center gap-2">
        <div className="flex items-center gap-2">
          <label htmlFor="isSupportedInUS">US Only</label>
          <Switch
            id="isSupportedInUS"
            onSwitchChange={(val) => ctx.setIsSupportedInUS(val)}
            defaultChecked={false}
          />
        </div>
        <div className="flex items-center gap-2">
          <label htmlFor="supportsTestMode">Test Mode</label>
          <Switch
            id="supportsTestMode"
            onSwitchChange={(val) => ctx.setSupportsTestMode(val)}
            defaultChecked={false}
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        {/* sort */}
        <div className="flex items-center gap-2 border">
          <select
            className="p-3 border-none outline-none"
            onChange={(e) =>
              ctx.setSortKey(e.target.value as unknown as SortKey)
            }
          >
            <option value={SortKey.NAME}>Name</option>
            <option value={SortKey.CODE}>Code</option>
          </select>
          <div
            className="p-3 duration-150 cursor-pointer text-white bg-blue-500 hover:bg-blue-600"
            onClick={() =>
              ctx.setSortDirection((prev: SortDirection) => {
                return prev === SortDirection.ASC
                  ? SortDirection.DESC
                  : SortDirection.ASC;
              })
            }
          >
            {ctx.sortDirection === SortDirection.ASC ? (
              <RiSortAsc className="w-6 h-6" />
            ) : (
              <RiSortDesc className="w-6 h-6" />
            )}
          </div>
        </div>

        {/* shuffle */}
        <div
          className={classNames(
            "flex items-center justify-center gap-2 p-3",
            "duration-150 cursor-pointer",
            "bg-blue-500 text-white hover:bg-blue-600"
          )}
          onClick={() =>
            ctx.setSortedCurrencies(shuffleCurrencies(ctx.sortedCurrencies))
          }
        >
          <p className="capitalize">shuffle</p>
          <RiShuffleLine className="w-6 h-6" />
        </div>
      </div>
    </div>
  );
};
