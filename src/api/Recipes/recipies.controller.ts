import { FastifyReply, FastifyRequest } from "fastify";
import { createRecipe, getUserId, saveUserRecipe, userRecipes } from "./recipies.dao";
import { recipe } from "./recipies.interface";

export async function generateRecipe(req:FastifyRequest,res:FastifyReply){
    try{
        const {emailId} = req.user;
        const id = await getUserId(emailId);
        const {recipeName,description,ingredients,procedure,image} = req.body as recipe;
        const result = await createRecipe(emailId,recipeName,description,ingredients,procedure,image,id);
        res.status(200).send(result)
    }
    catch(e)
    {
        res.status(403).send(e)
    }
    
}

export async function saveRecipe(req:FastifyRequest,res:FastifyReply){
    try{
        const {emailId} = req.user;
        const {recipeId}= req.body as {recipeId :Number};
        const id = await getUserId(emailId);
        const result = await saveUserRecipe(recipeId,id);
        res.status(200).send(result)
    }
    catch(e)
    {
        res.status(403).send(e)
    }
}

export async function getUserRecipe(req:FastifyRequest,res:FastifyReply){
    try{
        const {emailId} = req.user;
        // const {recipeId}= req.body as {recipeId :Number};
        const id = await getUserId(emailId);
        const result = await userRecipes(id);
        res.status(200).send(result)
    }
    catch(e)
    {
        res.status(403).send(e)
    }
    
}
