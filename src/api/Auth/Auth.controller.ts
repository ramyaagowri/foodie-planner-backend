import { FastifyReply, FastifyRequest } from "fastify";
import { Auth } from "./Auth.interface";
import {
  createUser,
  editProfile,
  fetchUser,
  followUser,
  followingDetails,
  getUserDetails,
  unfollowUser,
  updateProfilePhoto,
} from "./Auth.dao";
import jwt from "jsonwebtoken";
import {
  getGoogleAuthTokens,
  getGoogleUrl,
  uploadImage,
  verifyToken,
} from "../../utils/helper";
import { getRecipe, getUserId } from "../Recipes/recipies.dao";
import { number } from "joi";
export async function authHandler(req: FastifyRequest, res: FastifyReply) {
  try {
    const { emailId, password } = req.body as Auth;
    const existingUser = await fetchUser(emailId);
    console.log(existingUser);
    var payload;
    if (existingUser) {
      res.status(403).send("User Already Exist");
    } else {
      await createUser({ emailId, password });
      payload = {
        emailId,
      };
      const token = jwt.sign(payload, process.env.JWT_SECRET_KEY, {
        expiresIn: "30d",
      });
      // generates token using google email

      console.log(token);
      res.status(200).send({ message: "user created", token });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}

export async function googleUrl(req: FastifyRequest, res: FastifyReply) {
  try {
    const auth = req.body;
    if (auth) {
      const url = await getGoogleUrl();
      console.log(url);
      res.status(200).send(url);
    }
  } catch (err) {
    res.status(403).send(err);
  }
}

export async function googleOauth(req: FastifyRequest, res: FastifyReply) {
  console.log("hello.......................");
  try {
    const { code } = req.body;
    const { id_token, access_token } = await getGoogleAuthTokens({
      code: code,
    });
    let payload = await verifyToken(id_token);
    const { email, picture, given_name } = payload as {
      email: string;
      picture: string;
      given_name: string;
    };
    const User = await createUser({
      emailId: email,
      profilePic: picture,
      name: given_name,
    });

    const payloads = {
      emailId: payload?.email,
    };
    const token = jwt.sign(payloads, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    }); // generates token using google email
    console.log(token);
    res.status(200).send({ message: "user created", token });
  } catch (err) {
    console.log("Error----------" + err);
  }
}

export async function getProfile(req: FastifyRequest, res: FastifyReply) {
  try {
    const { id } = req.params;
    const { emailId } = req.user;
    const userid = await getUserId(emailId);

    if (Number(id)) {
      const User = await getUserDetails(Number(id));
      console.log(User);
      if (User)
        res.status(200).send({
          data: User,
        });
    } else {
      console.log(userid);
      const User = await getUserDetails(Number(userid));
      console.log(User);
      if (User) res.status(200).send(User);
    }
  } catch (e) {
    res.status(403).send(e);
  }
}

export async function getAllRecipe(req: FastifyRequest, res: FastifyReply) {
  try {
    const result = await getRecipe();
    res.status(200).send(result);
  } catch (err) {
    res.status(403).send(err);
  }
}

export async function updateProfile(req: FastifyRequest, res: FastifyReply) {
  try {
    const { name, emailId, description, profilePic } = req.body;
    const id = await getUserId(emailId);
    const result = await editProfile(
      id,
      name,
      emailId,
      description,
      profilePic
    );
    res.status(200).send(result);
  } catch (err) {
    res.status(403).send(err);
  }
}

export async function updateProfilePic(req: FastifyRequest, res: FastifyReply) {
  try {
    const { emailId } = req.user;
    const id = await getUserId(emailId);
    const resultant = await uploadImage(id);
    const result = await updateProfilePhoto(id, resultant?.url);
    res.status(200).send(result);
  } catch (err) {
    res.status(403).send(err);
  }
}

export async function follow(req: FastifyRequest, res: FastifyReply) {
  try {
    const { id } = req.params;
    const { emailId } = req.user;
    const followerId = await getUserId(emailId);
    const result = await followUser(Number(followerId), Number(id));
    res.status(200).send("Followed");
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function unfollow(req: FastifyRequest, res: FastifyReply) {
  try {
    const { id } = req.params;
    const { emailId } = req.user;
    const followerId = await getUserId(emailId);
    const result = await unfollowUser(Number(followerId), Number(id));
    res.status(200).send("unFollowed");
  } catch (e) {
    res.status(500).send(e);
  }
}

export async function getFollowing(req: FastifyRequest, res: FastifyReply) {
  try {
    const { id } = req.params;
    const { emailId } = req.user;
    const followerId = await getUserId(emailId);
    const result = await followingDetails(Number(followerId));
    res.status(200).send(result);
  } catch (e) {
    res.status(500).send(e);
  }
}
