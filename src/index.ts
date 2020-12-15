import fastify from "fastify";

const HTTP_SERVER_PORT = 10666;
const HTTP_SERVER_BIND = "0.0.0.0";

const server = fastify({ logger: true });
server.get("/", async (_, res) => {
  await new Promise((done) => setTimeout(done, 3 * 1000));
  res.send({ hello: "world" });
});
server.listen(HTTP_SERVER_PORT, HTTP_SERVER_BIND, (err, address) => {
  if (err) throw err;
  console.info(`server listening on ${address}`);
});
