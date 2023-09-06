import prisma from "../../utils/prisma";

export async function MealPlan(id :Number,mealPlan : String,day:String)
{
    try{
        const result = await prisma.mealPlans.create({
            data : {
                mealPlan ,
                day,
                userId :id
            }
        })
        return result;
    }
    catch(e)
    {
        console.log(e)
        return false
    }
}

export async function getMealDetails(id:Number)
{
    try{
        const result = await prisma.mealPlans.findMany({
            where:{
                userId : id
            }
        })
        return result;
    }
    catch(e)
    {
        console.log(e)
        return false
    }
}
