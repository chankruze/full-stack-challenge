/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Oct 31 2022 15:49:51 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

import classNames from "classnames";
import {
  ComponentProps,
  FC,
  PropsWithChildren,
  useEffect,
  useState,
} from "react";
import { IconType } from "react-icons";
import { RiCheckLine, RiCloseLine } from "react-icons/ri";

export type SwitchComponentProps = PropsWithChildren<
  ComponentProps<"div"> & {
    disabled?: boolean;
    defaultChecked?: boolean;
    checkdIcon?: IconType;
    uncheckedIcon?: IconType;
    // eslint-disable-next-line no-unused-vars
    onSwitchChange: (value: boolean) => void;
  }
>;

export const Switch: FC<SwitchComponentProps> = ({
  className,
  onSwitchChange,
  checkdIcon: CheckdIcon,
  uncheckedIcon: UncheckedIcon,
  defaultChecked = false,
  disabled = false,
  ...props
}) => {
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    if (defaultChecked) {
      setChecked(defaultChecked);
    }
  }, [defaultChecked]);

  const toggle = () => {
    if (disabled) {
      return;
    }

    setChecked(!checked);
    onSwitchChange(!checked);
  };

  return (
    <div
      onClick={toggle}
      className={"cursor-pointer bg-transparent select-none"}
      {...props}
    >
      <div
        className={classNames(
          "flex items-center w-12 h-6 rounded-full text-white bg-gray-100 dark:bg-gray-700 !bg-opacity-40",
          className,
          {
            "bg-red-500": !checked,
            "bg-green-500": checked,
          }
        )}
      >
        {checked && (
          <div className="ml-auto bg-green-500 rounded-full p-1">
            {CheckdIcon ? (
              <CheckdIcon className="w-4 h-4" />
            ) : (
              <RiCheckLine className="w-4 h-4" />
            )}
          </div>
        )}
        {!checked && (
          <span className="mr-auto bg-red-500 rounded-full p-1">
            {UncheckedIcon ? (
              <UncheckedIcon className="w-4 h-4" />
            ) : (
              <RiCloseLine className="w-4 h-4" />
            )}
          </span>
        )}
      </div>
    </div>
  );
};
