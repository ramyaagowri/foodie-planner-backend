import prisma from "../../utils/prisma";

export async function getUserId(emailId: String) {
  const userId = await prisma.user.findFirst({
    where: {
      emailId,
    },
  });
  console.log(userId);
  return userId?.id;
}
export async function getRecipeForHome() {
  try {
    const result = await prisma.recipe.findMany();
    return result;
  } catch (e) {
    return false;
  }
}

export async function createRecipe(
  videoLink: String,
  recipeName: String,
  description: String,
  procedure: String,
  level: String,
  timeToMake: Number,
  id: Number,
  ingredientsArray: Array<String>
) {
  try {
    const recipe = await prisma.recipe.create({
      data: {
        videoLink,
        recipeName,
        description,
        procedure,
        level,
        timeToMake,
        userId: id,
      },
    });
    let data;
    for (const ingredient of ingredientsArray) {
      data = await prisma.ingredients.create({
        data: {
          ingredientName: ingredient.ingredientName,
          ingredientQuantity: ingredient.ingredientQuantity,
          recipeId: recipe.id,
        },
      });
    }
    console.log("Ingredients............", data);
    return recipe;
  } catch (err) {
    console.log(err);
    return false;
  }
}

export async function saveUserRecipe(recipeId: Number, userId: Number) {
  try {
    const result = await prisma.savedRecipe.create({
      data: {
        recipeId,
        userId,
      },
    });
    console.log(result);
    return result;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function userRecipes(id: Number) {
  try {
    const user = await prisma.user.findMany({
      where: {
        id,
      },
      include: {
        postedRecipies: true,
        savedRecipes: {
          include: {
            recipe: true,
          },
        },
      },
    });
    return user;
  } catch (e) {
    console.log(e);
    return e;
  }
}

export async function getRecipe() {
  try {
    const result = prisma.recipe.findMany();
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function randomRecipe(limit: Number) {
  try {
    const randomRecipes = await prisma.$queryRaw`
      SELECT * FROM Recipe
      ORDER BY rand()
      LIMIT ${limit};
    `;

    return randomRecipes;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function getUniqueRecipe(id: Number) {
  try {
    const randomRecipes = await prisma.recipe.findUnique({
      where: {
        id,
      },
      include: {
        user: true,
      },
    });

    return randomRecipes;
  } catch (e) {
    console.log(e);
    return false;
  }
}
export async function insertImageUrl(link: String, id: Number) {
  try {
    const result = await prisma.recipe.update({
      where: {
        id,
      },
      data: {
        image: link,
      },
    });
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function getRecipeIngredients(id: Number) {
  try {
    const result = await prisma.ingredients.findMany({
      where: {
        recipeId: id,
      },
    });
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function deletePostedRecipe(id: Number) {
  try {
    const deleteIngredients = await prisma.ingredients.deleteMany({
      where: {
        recipeId: id,
      },
    });
    const deleteSavedRecipe = await prisma.savedRecipe.deleteMany({
      where: {
        recipeId: id,
      },
    });
    const result = await prisma.recipe.delete({
      where: {
        id,
      },
    });

    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function addRating(userRating: Number, recipeId: Number) {
  try {
    const prevRating = await prisma.recipe.findUnique({
      where: {
        id: recipeId,
      },
    });
    console.log("User Rating ", userRating);
    const avgRating = (prevRating?.rating + userRating) / 2;
    const result = await prisma.recipe.update({
      where: {
        id: recipeId,
      },
      data: {
        rating: avgRating,
      },
    });
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
}
export async function removeFromSaved(id: Number, recipeId: Number) {
  try {
    const result = await prisma.savedRecipe.delete({
      where: {
        userId_recipeId: {
          userId: id,
          recipeId,
        },
      },
    });
    console.log("From the removed wishList", result);
    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
}

export async function getFollowingfeed(id: Number) {
  try {
    const followingIds = await prisma.followers.findMany({
      where: {
        followerId: id,
      },
      select: {
        followingId: true,
      },
    });
    console.log("Following Id ", followingIds);
    const result = await prisma.recipe.findMany({
      where: {
        userId: {
          in: followingIds.map((entry) => entry.followingId),
        },
      },
      include: {
        user: true,
      },
    });

    console.log(result);

    return result;
  } catch (e) {
    console.log(e);
    return false;
  }
}
