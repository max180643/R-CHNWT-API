import { FastifyServerOptions } from "fastify";
import { CONFIG } from "./config";
import buildApp from "./app";
import logger from "./utils/logger";

const OPTIONS: FastifyServerOptions = {
  logger: {
    prettyPrint: CONFIG.PINO_PRETTY_OPTIONS,
  },
};

const app = buildApp(OPTIONS);

app.listen(CONFIG.PORT, CONFIG.IP, (error) => {
  if (error) {
    logger.error(error);
    process.exit(1);
  }
});
