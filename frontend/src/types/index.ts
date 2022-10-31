/*
Author: chankruze (chankruze@gmail.com)
Created: Mon Oct 31 2022 17:39:49 GMT+0530 (India Standard Time)

Copyright (c) geekofia 2022 and beyond
*/

export type Currency = {
  id: string;
  type: string;
  name: string;
  code: string;
  supportsTestMode: boolean;
  supportsLiveMode: boolean;
  isSupportedInUS: boolean;
  metadata: {
    contractAddress: string;
    chainId: string;
    networkCode: string;
  };
  [key: string]: any;
};
