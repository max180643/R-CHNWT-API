import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { generateURL, getURL } from "../controllers/url";

type fullUrlRequest = FastifyRequest<{
  Body: { fullURL: string; customAlias?: string };
}>;
type shortUrlRequest = FastifyRequest<{ Params: { shortURL: string } }>;

const urlRouter = async (app: FastifyInstance) => {
  app.post("/create", async (request: fullUrlRequest, reply: FastifyReply) => {
    const { fullURL, customAlias } = request.body;

    const result = await generateURL(fullURL, customAlias);
    const { status, response, code } = result;

    reply.code(code).send({
      status,
      response,
    });
  });

  app.get(
    "/:shortURL",
    async (request: shortUrlRequest, reply: FastifyReply) => {
      const { shortURL } = request.params;

      const result = await getURL(shortURL);
      const { status, response, code } = result;

      reply.code(code).send({
        status,
        response,
      });
    }
  );
};

export default urlRouter;
