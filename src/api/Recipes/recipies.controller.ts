import { FastifyReply, FastifyRequest } from "fastify";
import {
  addRating,
  createRecipe,
  deletePostedRecipe,
  getRecipeForHome,
  getRecipeIngredients,
  getUniqueRecipe,
  getUserId,
  insertImageUrl,
  randomRecipe,
  removeFromSaved,
  saveUserRecipe,
  userRecipes,
} from "./recipies.dao";
import {
  extractYouTubeVideoId,
  fetchId,
  uploadImage,
} from "../../utils/helper";
class RecipeController {
  public generateRecipe = async (req: FastifyRequest, res: FastifyReply) => {
    try {
      const { dataState } = req.body; //Object
      const ingredient = req.body.ingredients; // Array
      console.log("called the controller===================================");
      const { emailId } = req.user;
      const id = await getUserId(emailId);
      let link, result;

      if (dataState.link) {
        link = await fetchId(dataState.link);
        console.log("Linkkkkkkkkkkkk", link);
        if (link) {
          result = await createRecipe(
            dataState.link,
            dataState.recipeName,
            dataState.description,
            dataState.procedure,
            dataState.level,
            Number(dataState.timeToMake),
            id,
            ingredient
          );
        } else {
          res.status(400).send("Link Invalid");
        }
      } else {
        result = await createRecipe(
          dataState.link,
          dataState.recipeName,
          dataState.description,
          dataState.procedure,
          dataState.level,
          Number(dataState.timeToMake),
          id,
          ingredient
        );
        res.status(200).send(result);
      }

      console.log("hello");
    } catch (e) {
      res.status(403).send(e);
    }
  };

  public async saveRecipe(req: FastifyRequest, res: FastifyReply) {
    try {
      const { emailId } = req.user;
      const { recipeId } = req.body as { recipeId: Number };
      const id = await getUserId(emailId);
      const result = await saveUserRecipe(Number(recipeId), id);
      res.status(200).send(result);
    } catch (e) {
      res.status(403).send(e);
    }
  }

  public async getUserRecipe(req: FastifyRequest, res: FastifyReply) {
    try {
      const { emailId } = req.user;
      // const {recipeId}= req.body as {recipeId :Number};
      const id = await getUserId(emailId);
      const result = await userRecipes(id);
      res.status(200).send(result);
    } catch (e) {
      res.status(403).send(e);
    }
  }
  public async getRandomRecipe(req: FastifyRequest, res: FastifyReply) {
    try {
      const result = await randomRecipe(4);
      res.status(200).send(result);
    } catch (e) {
      res.status(403).send(e);
    }
  }
  public async getDetails(req: FastifyRequest, res: FastifyReply) {
    try {
      const { id } = req.params;
      const result = await getUniqueRecipe(Number(id));
      res.status(200).send(result);
    } catch (e) {
      res.status(403).send(e);
    }
  }

  public async getAllRecipe(req: FastifyRequest, res: FastifyReply) {
    try {
      const result = await getRecipeForHome();
      res.status(200).send(result);
    } catch (e) {
      res.status(403).send(e);
    }
  }

  public async imageUpload(req: FastifyRequest, res: FastifyReply) {
    try {
      const { recipeId } = req.params;
      console.log(recipeId);
      const { emailId } = req.user;
      const id = await getUserId(emailId);
      const resultant = await uploadImage(id);
      console.log("Link ", resultant?.url);
      const result = await insertImageUrl(resultant.url, Number(recipeId));
      res.status(200).send("File Uploaded in Cloudinary");
    } catch (e) {
      res.status(403).send(e);
    }
  }
  public async getIngredients(req: FastifyRequest, res: FastifyReply) {
    try {
      const { recipeId } = req.params;
      const result = await getRecipeIngredients(Number(recipeId));
      res.status(200).send(result);
    } catch (e) {
      res.status(403).send(e);
    }
  }

  public async deleteRecipe(req: FastifyRequest, res: FastifyReply) {
    try {
      const { recipeId } = req.params;
      console.log(recipeId);
      const result = await deletePostedRecipe(Number(recipeId));
      res.status(200).send({ deleted: true });
    } catch (e) {
      res.status(403).send(e);
    }
  }

  public async rate(req: FastifyRequest, res: FastifyReply) {
    try {
      const { userRating, recipeId } = req.body;
      const result = addRating(Number(userRating), Number(recipeId));
      if (result) {
        res.status(200).send("Rated");
      }
    } catch (e) {
      res.status(500).send(e);
    }
  }
  public async unSave(req: FastifyRequest, res: FastifyReply) {
    try {
      const { recipeId } = req.params;
      const { emailId } = req.user;
      const id = await getUserId(emailId);
      console.log(recipeId, id);
      const result = await removeFromSaved(Number(id), Number(recipeId));
      if (result) {
        console.log(result);
        res.status(200).send("Unsaved");
      }
    } catch (e) {
      res.status(500).send(e);
    }
  }
}

export default RecipeController;
