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

export async function fetchUser(emailId: string) {
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
export async function getUserDetails(emailId: string) {
  try {
    const result = await prisma.user.findFirst({
      where: {
        emailId,
      },
    });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
}
editProfile;
export async function editProfile(
  id: Number,
  name: String,
  emailId: String,
  description: String,
  profilePic: String
) {
  try {
    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        name,
        emailId,
        description,
        profilePic,
      },
    });
    console.log(result);
    return result;
  } catch (err) {
    console.log(err);
    return err;
  }
}

export async function updateProfilePhoto(id: Number, link: String) {
  try {
    const result = await prisma.user.update({
      where: {
        id,
      },
      data: {
        profilePic: link,
      },
    });
    return result;
  } catch (err) {
    console.log(err);
    return false;
  }
}
