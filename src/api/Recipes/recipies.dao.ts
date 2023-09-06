import prisma from "../../utils/prisma";

export async function getUserId(emailId :String){
    const userId = await prisma.user.findFirst({
        where : {
            emailId
        }
    })
    console.log(userId)
    return userId?.id
}
export async function createRecipe(emailId:String,recipeName :String,
    description :String,
    ingredients :String,
    procedure :String,
    image :String,
    id:Number
    ){
        try{
            
        const recipe = await prisma.recipe.create({
            data : {

                recipeName,
                description,
                ingredients,
                procedure,
                image,
                userId : id,
            }
        })
        return recipe
        }
        catch(err){
            console.log(err)
            return false
        }
}


export async function saveUserRecipe(recipeId :Number,userId :Number)
{
    try{
        const result  = await prisma.savedRecipe.create({
            data :{
                recipeId,
                userId
            }
        })
        console.log(result);
        return result;
    }
    catch(e)
    {
        console.log(e)
        return e
    }
}

export async function userRecipes(id :Number)
{
    try{
        const user = await prisma.user.findUnique({
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

    }
    catch(e)
    {
        console.log(e)
        return e
    }
}