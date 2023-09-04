import prisma from "../../utils/prisma";
import { Auth } from "./Auth.interface";

export async function createUser(user: Auth) {
  try {
    const result = await prisma.user.create({ data: user });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function fetchUser(emailId : string) {
  try {
    const result = await prisma.user.findFirst({
      where: {
        emailId,
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
}
export async function getUserDetails(emailId : string){
  try{
    const result = await prisma.user.findFirst({
      where :{
        emailId 
      }
    })
    console.log(result)
    return result;
  }
  catch(err){
    console.log(err)
    return err
  }
}
