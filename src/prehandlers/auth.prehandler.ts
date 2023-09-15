import { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import { verify } from "jsonwebtoken";

export const jwtVerification = (
  request: FastifyRequest,
  reply: FastifyReply,
  done: (err?: Error) => void
) => {
  try {
    const token = request.headers.authorization?.replace("Bearer ", "");
    if (token) {
      const decodedToken = verify(token, process.env.JWT_SECRET_KEY); // Replace with your own secret key
      if (!decodedToken) {
        reply.code(401).send({ error: "Invalid token" });
        console.log("1222");
        return done(new Error("unauthorised"));
      }
      request.user = decodedToken;
      console.log("doneee");
      done();
      return;
    }
  } catch (err) {
    console.log(err);
    reply.code(401).send({ error: "No Token available or Token Expired" });
  }
};
