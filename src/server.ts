"use strict";

import Hapi from "@hapi/hapi";
import { Server } from "@hapi/hapi";
import { health } from "./routes/health";

export const initServer = async function (): Promise<Server> {
  const server: Server = Hapi.server({
    port: process.env.PORT || 4000,
    host: "0.0.0.0",
  });

  server.route({
    method: "GET",
    path: "/health",
    handler: health,
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
