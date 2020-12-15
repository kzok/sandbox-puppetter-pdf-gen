import fastify from "fastify";

import { logger } from "./logger";

/**
 * Configurations
 */

const env = process.env;
const HTTP_SERVER_PORT = parseInt(env.PDF_GEN_HTTP_PORT || "") || 10666;

/**
 * Entry point
 */

const server = fastify({ logger });
server.get("/", async (_, res) => {
  await new Promise((done) => setTimeout(done, 3 * 1000));
  res.send({ hello: "world" });
});
server.listen(HTTP_SERVER_PORT, "0.0.0.0", (err) => {
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
