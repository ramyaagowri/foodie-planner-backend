import axios from "axios";
import qs from "qs";
import fs from "fs";
import { OAuth2Client } from "google-auth-library";
import path from "path";
import cloudinary from "../services/cloudinary";
const client = new OAuth2Client({
  clientId: process.env.GOOGLE_AUTH_CLIENT_ID,
});
export async function verifyToken(token: string) {
  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_AUTH_CLIENT_ID,
    });
    const payload = ticket.getPayload();
    console.log(payload);
    return payload;
  } catch (error) {
    console.error("Error verifying token:", error.message);
  }
}

export function getGoogleUrl() {
  const rootUrl = "http://accounts.google.com/o/oauth2/v2/auth";
  const options = {
    redirect_uri: "http://localhost:5173/home",
    client_id: process.env.GOOGLE_AUTH_CLIENT_ID,
    access_type: "offline",
    response_type: "code",
    prompt: "consent",
    scope: [
      "https://www.googleapis.com/auth/userinfo.profile",
      "https://www.googleapis.com/auth/userinfo.email",
    ].join(" "),
  };
  console.log({ options });

  const qs = new URLSearchParams(options);
  console.log({ qs });
  return `${rootUrl}?${qs.toString()}`;
}
export async function getGoogleAuthTokens({ code }) {
  console.log("Code ========" + code);
  const url = "https://oauth2.googleapis.com/token";
  const values = {
    code: code,
    client_id: process.env.GOOGLE_AUTH_CLIENT_ID,
    client_secret: process.env.GOOGLE_AUTH_SECRET_KEY,
    redirect_uri: "http://localhost:5173/home",
    grant_type: "authorization_code",
  };
  console.log("values----------------" + JSON.stringify(values));
  console.log("qssssss=======" + qs.stringify(values));
  try {
    const res = await axios.post(url, qs.stringify(values), {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    });
    console.log(res.data);
    return res.data;
  } catch (err) {
    console.log(err, "Failed to fetch Google Oauth Tokens");
    console.error(err.response.data.error);

    // throw new Error(err.message);
  }
}
export async function uploadImage(id) {
  try {
    const fs = require("fs");
    const folderPath = path.join(__dirname + "../../files");
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const filePath = `${folderPath}/${file}`;

      const resultant = await cloudinary.uploader.upload(filePath, {
        public_id: `${id}`,
        crop: "fill",
      });
      await deleteFilesInFolder(folderPath)
      return resultant;
    }
  } catch (err) {
    console.log(err);
  }
}


function deleteFilesInFolder(folderPath :String) {
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      console.error(`Error reading directory: ${err}`);
      return;
    }

    files.forEach((file) => {
      const filePath = path.join(folderPath, file);

      fs.stat(filePath, (statErr, stats) => {
        if (statErr) {
          console.error(`Error checking file stats: ${statErr}`);
          return;
        }

        if (stats.isFile()) {
          fs.unlink(filePath, (unlinkErr) => {
            if (unlinkErr) {
              console.error(`Error deleting file: ${unlinkErr}`);
            } else {
              console.log(`Deleted file: ${filePath}`);
            }
          });
        }
      });
    });
  });
}

