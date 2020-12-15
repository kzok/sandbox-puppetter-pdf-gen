import pino from "pino";
import * as rfs from "rotating-file-stream";

const fileStream = rfs.createStream("file.log", {
  path: "./logs/",
  size: "100M",
  interval: "1d",
  maxFiles: 30,
  teeToStdout: true,
});

export const logger = pino(
  {
    base: null,
    prettyPrint: {
      colorize: false,
      translateTime: true,
    },
  },
  fileStream
);
