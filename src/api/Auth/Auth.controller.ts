import { FastifyReply, FastifyRequest } from "fastify";
import { Auth } from "./Auth.interface";
import { createUser, fetchUser, getUserDetails } from "./Auth.dao";
import jwt from "jsonwebtoken";
import { getGoogleAuthTokens, getGoogleUrl, verifyToken} from "../../utils/helper";


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
      }); // generates token using google email
      console.log(token);
      res.status(200).send({ message: "user created", token });
    }
  } catch (err) {
    res.status(500).send(err);
  }
}


export async function googleUrl(req:FastifyRequest,res:FastifyReply)
{
  try{
    const auth = req.body;
    if(auth){const url = await getGoogleUrl();
      console.log(url);
    res.status(200).send(url)
  }
  }
  catch(err){
    res.status(403).send(err)
  }
}



export async function googleOauth(req :FastifyRequest , res : FastifyReply) {
  console.log("hello.......................");
  try{
    const {code} = req.body;
    const { id_token, access_token } = await getGoogleAuthTokens({code : code});    
    let payload = await verifyToken(id_token);
    const {email,picture,given_name}=payload as {
      email:string,
      picture:string,
      given_name:string
    };
    const User = await createUser({
      emailId :email,
      profilePic : picture,
      name:given_name
    })

    const payloads = {
      emailId : payload?.email,
    };
    const token = jwt.sign(payloads, process.env.JWT_SECRET_KEY, {
      expiresIn: "24h",
    }); // generates token using google email
    console.log(token);
    res.status(200).send({ message: "user created", token });
  }
  catch(err){
    console.log("Error----------"+err);
  }
  
}

export async function getProfile(req : FastifyRequest,res:FastifyReply){
  try{
    const {emailId} = req.user;
    console.log(emailId + "  Email Id")
    const User = await getUserDetails(emailId);
    console.log(User)
    if(User) res.status(200).send(User);
  }
  catch(e){
    res.status(403).send(e)
  }
}