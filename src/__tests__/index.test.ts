import { Server } from "@hapi/hapi";
import { initServer, start } from "../server";

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
      url: "/health",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.result).toEqual({ status: "OK" });
  });
});
