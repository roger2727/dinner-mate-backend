import { UserModel } from ".//models/user.js";
import { RecipeModel } from "./models/recipe.js";
import { dbClose } from "./db.js";

// Delete all existing users
await UserModel.deleteMany();
console.log("Deleted all users");

// Delete all existing recipes
await RecipeModel.deleteMany();
console.log("Deleted all users");

// Initial users to insert
const users = [
  { email: "user1@example.com", password: "password1", username: "user1" },
  { email: "user2@example.com", password: "password2", username: "user2" },
  { email: "user3@example.com", password: "password3", username: "user3" },
];

// Insert the initial users
await UserModel.insertMany(users);
console.log("Inserted users");

const usersids = await UserModel.find();

const recipes = [
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,h_1000,w_1000/v1674466263/nathan-dumlao-IjovY65WQiE-unsplash_yi5j69.jpg",
    title: "Bacon and Eggs",
    ingredients: ["eggs", "Bacon", "toast", "butter"],
    instructions: ["Dice ingredients", "Fry it up", "plate on toast", "Serve"],
    category: "Breakfast",
    cookingTime: 20,
    servingSize: 4,
    rating: 9,
    user: String(usersids[0]._id),
  },
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,h_1000,w_1000/v1674465935/ivan-torres-MQUqbmszGGM-unsplash_oxbh4t.jpg",
    title: "Pasta",
    ingredients: ["eggs", "ham", "cream", "pasta", "herbs"],
    instructions: [
      "Cute everything up",
      "Mix together",
      "Cook on heat",
      "Serve",
      "Enjoy!",
    ],
    category: "Dinner",
    cookingTime: 90,
    servingSize: 8,
    rating: 8,
    user: String(usersids[1]._id),
  },
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,h_1000,w_1000/v1674465935/ca-creative-bpPTlXWTOvg-unsplash_eifmd0.jpg",
    title: "Cereal",
    ingredients: ["Favourite Cereal", "Milk", "Any toppings"],
    instructions: [
      "Put cereal in bowl",
      "Put milk in",
      "Add toppings",
      "Enjoy!",
    ],
    category: "Breakfast",
    cookingTime: 5,
    servingSize: 1,
    rating: 4,
    user: String(usersids[0]._id),
  },
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,h_1000,w_1000/v1674465935/natasha-bhogal-7sStoaxfJh0-unsplash_snwlzp.jpg",
    title: "Cereal",
    ingredients: ["Favourite Cereal", "Milk", "Any toppings"],
    instructions: [
      "Put cereal in bowl",
      "Put milk in",
      "Add toppings",
      "Enjoy!",
    ],
    category: "Breakfast",
    cookingTime: 5,
    servingSize: 1,
    rating: 5,
    user: String(usersids[0]._id),
  },
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,h_1000,w_1000/v1674385504/table-2777180_1920_jrydui.jpg",
    title: "pizza",
    ingredients: ["meat", "sauce", "topping"],
    instructions: ["ring dominos", "pay", "wait", "Enjoy!"],
    category: "Dinner",
    cookingTime: 5,
    servingSize: 1,
    rating: 2,
    user: String(usersids[0]._id),
  },
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,h_1000,w_1000/v1674385503/macarons-2548827_1920_bwaf9m.jpg",
    title: "nachos",
    ingredients: ["chips", "Milk", "Any toppings"],
    instructions: [
      "Put cereal in bowl",
      "Put milk in",
      "Add toppings",
      "Enjoy!",
    ],
    category: "Dinner",
    cookingTime: 5,
    servingSize: 1,
    rating: 1,
    user: String(usersids[0]._id),
  },
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,h_1000,w_1000/v1674385503/macarons-2548827_1920_bwaf9m.jpg",
    title: "toast",
    ingredients: ["Favourite Cereal", "Milk", "Any toppings"],
    instructions: [
      "Put cereal in bowl",
      "Put milk in",
      "Add toppings",
      "Enjoy!",
    ],
    category: "Breakfast",
    cookingTime: 5,
    servingSize: 1,
    rating: 4,
    user: String(usersids[0]._id),
  },
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,h_1000,w_1000/v1674385503/macarons-2548827_1920_bwaf9m.jpg",
    title: "Cereal",
    ingredients: ["Favourite Cereal", "Milk", "Any toppings"],
    instructions: [
      "Put cereal in bowl",
      "Put milk in",
      "Add toppings",
      "Enjoy!",
    ],
    category: "Breakfast",
    cookingTime: 5,
    servingSize: 1,
    rating: 3,
    user: String(usersids[0]._id),
  },
];

await RecipeModel.insertMany(recipes);
console.log("Inserted recipes");

// Close the MongoDB connection
dbClose();
