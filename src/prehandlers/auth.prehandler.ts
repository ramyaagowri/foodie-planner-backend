import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { verify } from "jsonwebtoken";

export const jwtVerification = async (
  request: FastifyRequest,
  reply: FastifyReply,
  done: (err?: Error) => void
) => {
  try {
    const token = request.headers.authorization?.replace("Bearer ", "");
    const decodedToken = verify(token, process.env.JWT_SECRET_KEY); // Replace with your own secret key
    if (!decodedToken) {
      reply.code(401).send({ error: "Invalid token" });
      return;
    }
    request.user = decodedToken;
  } catch (err) {
    reply.code(401).send({ error: "No Token available or Token Expired" });
  }
};
