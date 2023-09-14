import { FastifyReply, FastifyRequest } from "fastify";
import fs from "fs";
import path from "path";
import pump from "pump";
export async function fileUpload(
  request: FastifyRequest,
  reply: FastifyReply,
  done: (err?: Error) => void
) {
  const uploadFolder = path.join(__dirname + "../../files");
  // console.log(uploadFolder);
  // console.log(request);
  const data = await request.file();
  // console.log("Dataaa---------", data?.file);
  if (data) {
    // console.log(data.file);
    const storedfile = fs.createWriteStream(
      path.join(uploadFolder, data.filename)
    );
    await pump(data.file, storedfile, (err) => {
      if (err) {
        console.error("Error saving the file:", JSON.stringify(err));
        return done(err);
      }

      // File upload is successful
      console.log("File uploaded successfully.");
      return done();
    });
  } else {
    return reply.status(400).send("No file sent");
  }
}
