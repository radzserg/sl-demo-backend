import { IHttpOperation } from "@stoplight/types";
import { Request, ServerRoute, ResponseValue } from "@hapi/hapi";

type OperationsMap = {
  [id: string]: (...args: any) => any;
};

export function buildRoutes(
  oasOperations: IHttpOperation[],
  implementedOperations: OperationsMap,
  mockHandler?: (req: Request) => ResponseValue
): ServerRoute[] {
  const routes: ServerRoute[] = [];

  for (const operation of oasOperations) {
    const { iid, method, path } = operation;
    const implementedOperation = iid && implementedOperations[iid];
    if (implementedOperation) {
      routes.push({
        method: method.toUpperCase(),
        path,
        handler: implementedOperation,
      });
    } else if (mockHandler) {
      routes.push({
        method: method.toUpperCase(),
        path,
        handler: mockHandler,
      });
    }
  }

  return routes;
}
