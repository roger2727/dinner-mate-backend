import { UserModel } from './/models/user.js';
import { RecipeModel } from './models/recipe.js';
import { CommentModel } from './models/comment.js';
import { dbClose } from './db.js';

// Delete all existing users
await UserModel.deleteMany();
console.log("Deleted all users");

// Delete all existing recipes
await RecipeModel.deleteMany();
console.log("Deleted all users");

const categories = ['Breakfast', 'Lunch', 'Dinner', 'Dessert', 'Snacks']

// Initial users to insert
const users = [
  { email: "user1@example.com", password: "password1", username: "user1" },
  { email: "user2@example.com", password: "password2", username: "user2" },
  { email: "user3@example.com", password: "password3", username: "user3" },
];

// Insert the initial users
await UserModel.insertMany(users);
console.log("Inserted users");

const usersids = await UserModel.find()

const recipes = [
    {
        title: "Bacon and Eggs",
        ingredients: ["eggs", "Bacon", "toast", "butter"],
        instructions: ["Dice ingredients", "Fry it up", "plate on toast", "Serve"],
        category: categories[0],
        cookingTime: 20,
        servingSize: 4,
        rating: 9,
        vegetarian: false,
        user: String(usersids[0]._id)
    },
    {
        title: "Pasta",
        ingredients: ["eggs", "ham", "cream", "pasta", "herbs"],
        instructions: ["Cute everything up", "Mix together", "Cook on heat", "Serve", "Enjoy!"],
        category: categories[2],
        cookingTime: 90,
        servingSize: 8,
        rating: 8,
        vegetarian: false,
        user: String(usersids[1]._id)
    },
    {
        title: "Cereal",
        ingredients: ["Favourite Cereal", "Milk", "Any toppings"],
        instructions: ["Put cereal in bowl", "Put milk in", "Add toppings", "Enjoy!"],
        category: categories[0],
        cookingTime: 5,
        servingSize: 1,
        rating: 5,
        vegetarian: true,
        user: String(usersids[0]._id)     
    },
    {
        title: "Cereal",
        ingredients: ["Favourite Cereal", "Milk", "Any toppings"],
        instructions: ["Put cereal in bowl", "Put milk in", "Add toppings", "Enjoy!"],
        category: categories[0],
        cookingTime: 5,
        servingSize: 1,
        rating: 5,
        vegetarian: true,
        user: String(usersids[0]._id)     
    },
]

await RecipeModel.insertMany(recipes);
console.log("Inserted recipes");

const recipeids = await RecipeModel.find()

const newcomments = [
    {
        title: "WOW",
        commentText: "Best thing ever!",
        user: String(usersids[1]._id),
        userRating: 10,
        recipe: String(recipeids[0]._id),
    },
    {
        title: "Terrible",
        commentText: "Who made this, it does not make sense!",
        user: String(usersids[2]._id),
        userRating: 1,
        recipe: String(recipeids[0]._id),
    },
    {
        title: "Pretty good",
        commentText: "Would give it another try I guess",
        user: String(usersids[0]._id),
        userRating: 10,
        recipe: String(recipeids[2]._id),
    }
]

await CommentModel.insertMany(newcomments);
console.log("Inserted comments");

// Close the MongoDB connection
dbClose();