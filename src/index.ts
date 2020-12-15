import fastify from "fastify";

import { logger } from "./logger";

const HTTP_SERVER_PORT = 10666;
const HTTP_SERVER_BIND = "0.0.0.0";

const server = fastify({ logger });
server.get("/", async (_, res) => {
  await new Promise((done) => setTimeout(done, 3 * 1000));
  res.send({ hello: "world" });
});
server.listen(HTTP_SERVER_PORT, HTTP_SERVER_BIND, (err) => {
  if (err) {
    throw err;
  }
});

const gracefulShutdown = async () => {
  logger.info("Terminating...");
  await server.close();
  logger.info("HTTP server terminated.");
};

process.on("SIGTERM", gracefulShutdown);
process.on("SIGINT", gracefulShutdown);
