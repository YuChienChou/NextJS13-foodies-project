import sql from 'better-sqlite3';

const db = sql('meals.db')

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 5000)); //to simulate a slow connection for a loading spinner

    // throw Error("Failed to fetch meal data. Please try again later.");
    return db.prepare('SELECT * FROM meals').all(); //return all meals from the database
}


export function getMeal(slug) {

    return db.prepare('SELECT * FROM meals WHERE slug = ?').get(slug); //return the meal with the given slug. This way prevents SQL injection attacks
}