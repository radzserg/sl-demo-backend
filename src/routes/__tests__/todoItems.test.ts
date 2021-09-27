import { Server } from "@hapi/hapi";
import { initServer } from "../../server";
import { buildTestHttpClient } from "../../__testHelpers__/httpClient";

describe("smoke test", () => {
  let server: Server;

  beforeEach(async () => {
    server = await initServer();
  });
  afterEach(async () => {
    await server.stop();
  });

  it("index responds", async () => {
    const res = await server.inject({
      method: "get",
      url: "/items",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.result).toEqual({
      items: [
        {
          description: "Need to buy milk",
          done: false,
          id: "3c07bafe-fc6a-412a-b90f-72ddf89c5cc3",
          title: "Shopping",
        },
        {
          description: null,
          done: true,
          id: "d4476275-c941-4893-a518-a50767f89929",
          title: "Yoga",
        },
      ],
    });
  });

  it("fetches todo items", async () => {
    const httpClient = buildTestHttpClient();
    const { data, status} = await httpClient.get("/items");
    expect(status).toEqual(200);
    expect(data).toEqual({
      items: [
        {
          description: "Need to buy milk",
          done: false,
          id: "3c07bafe-fc6a-412a-b90f-72ddf89c5cc3",
          title: "Shopping",
        },
        {
          description: null,
          done: true,
          id: "d4476275-c941-4893-a518-a50767f89929",
          title: "Yoga",
        },
      ],
    });
  });
});
