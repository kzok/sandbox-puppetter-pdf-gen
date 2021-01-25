import fastify from "fastify";
import puppeteer from "puppeteer";

import { logger } from "./logger";

/**
 * Configurations
 */

const env = process.env;
const PORT = parseInt(env.PDFGEN_PORT || "") || 10666;
const TARGET_URL = env.PDFGEN_TARGET_URL || "https://www.example.com/";

/**
 * Entry point
 */

const server = fastify({ logger });
server.get("/", async (_, res) => {
  try {
    const browser = await puppeteer.launch();
    const ctx = await browser.createIncognitoBrowserContext();
    const page = await ctx.newPage();
    await page.goto(TARGET_URL);
    const buffer = await page.pdf({ format: "A4" });
    res.header("content-type", "application/pdf");
    res.send(buffer);
  } catch (e) {
    res.code(500);
    res.send({ error: e.message, stack: e.stack });
  }
});

const gracefulShutdown = async (exitCode = 0) => {
  logger.info("Terminating...");
  await server.close();
  logger.info("HTTP server terminated.");
  process.exit(exitCode);
};
server.listen(PORT, "0.0.0.0", (err) => {
  if (err) {
    throw err;
  }
});

process.on("SIGTERM", () => gracefulShutdown());
process.on("SIGINT", () => gracefulShutdown());
