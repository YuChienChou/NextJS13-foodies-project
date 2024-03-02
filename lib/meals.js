import sql from 'better-sqlite3';

const db = sql('meals.db')

export async function getMeals() {
    await new Promise((resolve) => setTimeout(resolve, 2000)); //to simulate a slow connection for a loading spinner
    return db.prepare('SELECT * FROM meals').all(); //return all meals from the database
}
