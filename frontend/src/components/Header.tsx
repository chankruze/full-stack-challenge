/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Oct 31 2022 15:22:33 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import { Toolbar } from "./Toolbar";

export const Header = () => {
  return (
    <div className="py-2 px-4 shadow flex flex-wrap gap-4 items-center justify-between">
      <img
        src="https://www.moonpay.com/assets/logo-full-purple.svg"
        alt="Moonpay Logo"
        className="h-8"
      />
      <Toolbar />
    </div>
  );
};
