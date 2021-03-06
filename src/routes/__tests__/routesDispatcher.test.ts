
import { buildRoutes } from "../routesDispatcher";
import { IHttpOperation } from "@stoplight/types";

describe("routesDispatcher", () => {
  it("build routes when all operations are implemented", () => {
    const operations: IHttpOperation[] = [
      {
        id: "v1.getItems",
        iid: "v1.getItems",
        method: "get",
        path: "/api/items",
        responses: [{ code: "200" }],
      },
    ];
    const fakeHandler = jest.fn();
    const implementedOperations = { "v1.getItems": fakeHandler };
    const routes = buildRoutes(operations, implementedOperations);
    expect(routes).toEqual([
      {
        method: "GET",
        path: "/api/items",
        handler: fakeHandler,
      },
    ]);
  });
  it("build routes when no operations are implemented and prism is passed", () => {
    const operations: IHttpOperation[] = [
      {
        id: "v1.getItems",
        iid: "v1.getItems",
        method: "get",
        path: "/api/items",
        responses: [{ code: "200" }],
      },
    ];
    const mockHandler = jest.fn();
    const implementedOperations = {};
    const routes = buildRoutes(operations, implementedOperations, mockHandler);
    expect(routes).toEqual([
      {
        method: "GET",
        path: "/api/items",
        handler: mockHandler,
      },
    ]);
  });

  it("mock does not override implementation", () => {
    const operations: IHttpOperation[] = [
      {
        id: "v1.getItems",
        iid: "v1.getItems",
        method: "get",
        path: "/api/items",
        responses: [{ code: "200" }],
      },
    ];
    const fakeHandler = jest.fn();
    const implementedOperations = { "v1.getItems": fakeHandler };
    const mockHandler = jest.fn();
    const routes = buildRoutes(operations, implementedOperations, mockHandler);
    expect(routes).toEqual([
      {
        method: "GET",
        path: "/api/items",
        handler: fakeHandler,
      },
    ]);
  });
});
