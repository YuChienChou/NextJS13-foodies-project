import fs from "fs";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const db = sql("meals.db");

export async function getMeals() {
  await new Promise((resolve) => setTimeout(resolve, 5000)); //to simulate a slow connection for a loading spinner

  // throw Error("Failed to fetch meal data. Please try again later.");
  return db.prepare("SELECT * FROM meals").all(); //return all meals from the database
}

export function getMeal(slug) {
  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug); //return the meal with the given slug. This way prevents SQL injection attacks
}

export async function saveMeal(meal) {
  meal.slug = slugify(meal.title, { lower: true }); //create a slug from the title
  meal.instructions = xss(meal.instructions); //sanitize the instructions

  const extension = meal.image.name.split(".").pop(); //get the file extension
  const fileName = `${meal.slug}.${extension}`; //create a unique file name

  const stream = fs.createWriteStream(`public/images/${fileName}`); //create a write stream
  const bufferedImage = await meal.image.arrayBuffer(); //convert the image to a buffer

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      throw new Error("Saving image failed.");
    }
  }); //write the buffer to the stream

  meal.image = `/images/${fileName}`; //update the image property with the new file path

  db.prepare(
    `
        INSERT INTO meals (title, summary, instructions, image, creator, creator_email, slug)
        VALUES (@title, @summary, @instructions, @image, @creator, @creator_email, @slug) 
    `
  ).run(meal); //insert the new meal into the database
  
}
