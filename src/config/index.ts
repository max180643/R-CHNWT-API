import * as dotenv from "dotenv";

dotenv.config();

interface Config {
  IP: string;
  PORT: number;
  REQUEST_LIMIT: number;
  TIME_WINDOW_LIMIT: number;
  PINO_PRETTY_OPTIONS: {
    translateTime: string;
    colorize: boolean;
  };
  FIREBASE: {
    apiKey: string;
    appId: string;
    projectId: string;
    databaseURL: string;
  };
  FIREBASE_COLLECTION_NAME: string;
  WEB_URL: string;
}

const CONFIG: Config = {
  IP: process.env.IP || "0.0.0.0",
  PORT: Number(process.env.PORT) || 3000,
  REQUEST_LIMIT: Number(process.env.REQUEST_LIMIT) || 1000,
  TIME_WINDOW_LIMIT: Number(process.env.TIME_WINDOW_LIMIT) || 60000,
  PINO_PRETTY_OPTIONS: {
    translateTime: "SYS:hh:MM:ss TT Z",
    colorize: true,
  },
  FIREBASE: {
    apiKey: process.env.FIREBASE_API_KEY || "",
    appId: process.env.FIREBASE_APP_ID || "",
    projectId: process.env.FIREBASE_PROJECT_ID || "",
    databaseURL: process.env.FIREBASE_DATABASE_URL || "",
  },
  FIREBASE_COLLECTION_NAME: process.env.FIREBASE_COLLECTION_NAME || "storage",
  WEB_URL: process.env.WEB_URL || "r.chnwt.dev",
};

const MSG = {
  TIMEOUT: "TIMEOUT",
  SUCCESS: "success",
  FAILURE: "failure",
};

export { CONFIG, MSG };
