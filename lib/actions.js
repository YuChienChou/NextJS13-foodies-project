"use server";

import { redirect } from "next/navigation";
import { saveMeal } from "./meals";
import { revalidatePath } from "next/cache";

function isValidInput(text) {
  return !text && text.trim().length === 0;
};

export async function shareMeal(currentState, formData) { //formData is the form data passed from the form and prevState is the previous state of the form that passed from the useFormState hook in the share page component
  //async keyword is required when use server actions

  "use server"; //required to use server actions
  // console.log("formData: ", formData); //log the form data to the console

  const meal = {
    title: formData.get("title"),
    summary: formData.get("summary"),
    instructions: formData.get("instructions"),
    image: formData.get("image"),
    creator: formData.get("name"),
    creator_email: formData.get("email"),
  };
  // console.log("meal: ", meal);
  // console.log("meal image: ", meal.image);

  if (
    isValidInput(meal.title) ||
    isValidInput(meal.summary) ||
    isValidInput(meal.instructions) ||
    isValidInput(meal.creator) ||
    isValidInput(meal.creator_email) ||
    !meal.creator_email.includes("@") ||
    !meal.image || 
    meal.image.size === 0
  ) {
    // throw new Error("Invalid Input.");
    return {
      message: "Invalid Input."
    }
  }

  await saveMeal(meal);
  revalidatePath("/meals"); //this function is a built-in function in Next.js and will revalidate the cache for the given path and it's a good practice to revalidate the cache after a successful form submission
  redirect("/meals");
}
