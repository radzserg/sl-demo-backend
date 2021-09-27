import { killPrism } from "./prismUtils";

export default async () => {
  if (process.env.CONTRACT_TEST) {
    killPrism();
  }
};
