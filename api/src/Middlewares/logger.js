import { existsSync, mkdirSync } from "fs";
import winston from "winston";

//crer le dossier de logs sil existe pas
if (!existsSync("logs")) {
  mkdirSync("logs");
}

//logger inwston
export const logger = winston.createLogger({
  level: "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json(),
  ),
  transports: [
    new winston.transports.Console({
      format: winston.format.combine(
        winston.format.colorize(),
        winston.format.printf(({ timestamp, level, message, ...meta }) => {
          const metaStr = Object.keys(meta).length
            ? " " + JSON.stringify(meta)
            : "";
          return `${timestamp} [${level}] ${message}${metaStr}`;
        }),
      ),
    }),
    new winston.transports.File({
      filename: "logs/app.log",
    }),
    new winston.transports.File({
      filename: "logs/error.log",
      level: "error",
    }),
  ],
});

export const requestLogger = (req, res, next) => {
  const start = Date.now();
  res.set("date", new Date().toISOString());

  res.on("finish", () => {
    const logData = {
      method: req.method,
      url: req.originalUrl,
      status: res.statusCode,
      duration: `${Date.now() - start}ms`,
      ...(req.user && {
        user_id: req.user.id,
      }),
    };

    if (res.statusCode >= 500) {
      logger.error("server error", logData);
    } else if (res.statusCode >= 400) {
      logger.warn("client error", logData);
    } else {
      logger.info("request", logData);
    }
  });

  next();
};
