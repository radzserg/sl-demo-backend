"use strict";

import Hapi from "@hapi/hapi";
import { Server, Request } from "@hapi/hapi";
import { health } from "./routes/health";
import { getTodoItems } from "./routes/todoItems";
import { getHttpOperationsFromSpec } from "@stoplight/prism-cli/dist/operations";
import { createClientFromOperations } from "@stoplight/prism-http/dist/client";
import { buildRoutes } from "./routes/routesDispatcher";
import path from "path";
import { IHttpOperation } from "@stoplight/types";

export const initServer = async function (): Promise<Server> {
  const server: Server = Hapi.server({
    port: process.env.PORT || 4000,
    host: "0.0.0.0",
    routes: {
      cors: true,
    },
  });

  const implementedOperationsMap = {
    "v1.health": health,
    "v1.getItems": getTodoItems,
    // expand this list when add new operation
  };

  const oasFilePath = path.resolve(__dirname, "..", `todo.oas3.yml`);
  const allApiOperations = await getHttpOperationsFromSpec(oasFilePath);

  const apiRoutes = buildRoutes(
    allApiOperations,
    implementedOperationsMap,
    buildMockHandler(allApiOperations)
  );
  if (apiRoutes.length) {
    server.route(apiRoutes);
  }

  return server;
};


/**
 * A request will be handled by Prism server
 * @param httpOperations
 */
function buildMockHandler(httpOperations: IHttpOperation[]) {
  if (process.env.NODE_ENV === "development") {
    return undefined;
  }
  const prismClient = createClientFromOperations(httpOperations, {
    mock: {
      dynamic: false,
    },
    validateRequest: false,
    validateResponse: false,
    checkSecurity: false,
    errors: true,
  });

  return async (req: Request) => {
    const { data } = await prismClient.request(req.path, {
      method: req.method,
    });
    return data;
  };
}

export const start = async function (server: Server): Promise<void> {
  console.log(`Listening on ${server.settings.host}:${server.settings.port}`);
  return server.start();
};

process.on("unhandledRejection", (err) => {
  console.error("unhandledRejection");
  console.error(err);
  process.exit(1);
});
