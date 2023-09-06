import { FastifyReply, FastifyRequest } from "fastify";
import { getUserId } from "../Recipes/recipies.dao";
import { mealplans } from "./mealplan.interface";
import { MealPlan, getMealDetails } from "./mealplan.dao";
export async function createMealPlan(req:FastifyRequest,res:FastifyReply)
{
    try{
        const {emailId} = req.user;
        const id = await getUserId(emailId);
        const {mealPlan,day} = req.body as mealplans;
        const result = await MealPlan(id,mealPlan,day);
        res.status(200).send(result)
    }
    catch(e){
        res.status(403).send(e)
    }
}

export async function getMealPlan(req:FastifyRequest,res:FastifyReply)
{
    try{
        const {emailId} = req.user;
        const id = await getUserId(emailId);
        const result = await getMealDetails(id);
        res.status(200).send(result)
    }
    catch(e){
        res.status(403).send(e)
    }
}