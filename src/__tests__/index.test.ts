import { Server } from "@hapi/hapi";
import { init } from "../server";

describe("smoke test", () => {
  let server: Server;

  beforeEach((done) => {
    init().then((s) => {
      server = s;
      done();
    });
  });
  afterEach((done) => {
    server.stop().then(() => done());
  });

  it("index responds", async () => {
    const res = await server.inject({
      method: "get",
      url: "/",
    });
    expect(res.statusCode).toEqual(200);
    expect(res.result).toEqual("Hello! Nice to have met you.");
  });
});
