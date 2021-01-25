import fastify from "fastify";
import puppeteer from "puppeteer";
import { Sema } from "async-sema";

import { logger } from "./logger";

/**
 * Configurations
 */

const env = process.env;
const PORT = parseInt(env.PDFGEN_PORT || "") || 10666;
const TARGET_URL = env.PDFGEN_TARGET_URL || "https://www.example.com/";
const MAX_PAGES = parseInt(env.PDFGEN_MAX_PAGES || "") || 32;

/**
 * Entry point
 */

const semaphore = new Sema(MAX_PAGES);
const withSemaphore = async <T>(f: () => Promise<T>): Promise<T> => {
  try {
    await semaphore.acquire();
    return await f();
  } finally {
    semaphore.release();
  }
};

const server = fastify({ logger });
server.get("/", async (_, res) => {
  try {
    const buffer = await withSemaphore(async () => {
      let browser: puppeteer.Browser | null = null;
      let page: puppeteer.Page | null = null;
      try {
        browser = await puppeteer.launch();
        const ctx = await browser.createIncognitoBrowserContext();
        page = await ctx.newPage();
        await page.goto(TARGET_URL);
        return await page.pdf({ format: "A4" });
      } finally {
        await page?.close();
        await browser?.close();
      }
    });
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
