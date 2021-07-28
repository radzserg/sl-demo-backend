import { initServer, start } from "./server";

initServer().then((s) => start(s));
