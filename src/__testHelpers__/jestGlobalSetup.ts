import { startPrism } from "./prismUtils";

export default async () => {
  if (process.env.CONTRACT_TEST) {
    await startPrism("http://0.0.0.0:4000", "/Users/radzserg/projects/sl-demo/todo.oas3.yml");
  }
};
