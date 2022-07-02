import fastify, {
  FastifyServerOptions,
  FastifyRequest,
  FastifyReply,
  FastifyError,
} from "fastify";
import fastifyCors from "@fastify/cors";
import fastifyRateLimit from "@fastify/rate-limit";
import { CONFIG, MSG } from "./config";
import urlRouter from "./routers/url";

const buildApp = (options: FastifyServerOptions) => {
  const app = fastify(options);

  app.register(fastifyCors, {
    origin: CONFIG.CORS_ORIGIN,
    methods: ["GET", "POST"],
    credentials: true,
    maxAge: 1800,
  });

  app.register(fastifyRateLimit, {
    max: CONFIG.REQUEST_LIMIT,
    timeWindow: CONFIG.TIME_WINDOW_LIMIT,
  });

  app.setErrorHandler(
    (error: FastifyError, request: FastifyRequest, reply: FastifyReply) => {
      if (reply.statusCode === 429) {
        reply.code(429).send({
          status: MSG.FAILURE,
          response: "Rate limit exceeded.",
        });
      } else {
        reply.send(error);
      }
    }
  );

  app.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
    reply.code(200).send({
      status: MSG.SUCCESS,
      response:
        "Please go to https://github.com/max180643/r-chnwt-api for API usage.",
    });
  });

  app.register(urlRouter, { prefix: "/url" });

  app.get("*", async (request: FastifyRequest, reply: FastifyReply) => {
    reply.code(404).send({
      status: MSG.FAILURE,
      response: "Route not found.",
    });
  });

  return app;
};

export default buildApp;
