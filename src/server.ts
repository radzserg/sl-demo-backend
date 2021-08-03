"use strict";

import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import { health } from "./routes/health";
import { getTodoItems } from "./routes/todoItems";

export const initServer = async function (): Promise<Server> {
  const server: Server = Hapi.server({
    port: process.env.PORT || 4000,
    host: "0.0.0.0",
    routes: {
      cors: true,
    },
  });

  server.route({
    method: "GET",
    path: "/health",
    handler: health,
  });

  server.route({
    method: "GET",
    path: "/items",
    handler: getTodoItems,
  });

  return server;
};

export const start = async function (server: Server): Promise<void> {
  console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
  return server.start();
};

process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection");
  console.error(err);
  process.exit(1);
});
