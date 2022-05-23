import pino from "pino";
import pretty from "pino-pretty";
import { CONFIG } from "../config";

const logger = pino(pretty(CONFIG.PINO_PRETTY_OPTIONS));

export default logger;
