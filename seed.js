import { UserModel } from ".//models/user.js";
import { RecipeModel } from "./models/recipe.js";
import { CommentModel } from "./models/comment.js";
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
  // breakfast recipe's x3
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,h_1000,w_1000/v1675571179/Breakfast-Sandwiches-10_hp011l.jpg",
    title: "Egg and Cheese Breakfast Sandwich",
    ingredients: [
      "English muffin",
      "cheese slice",
      "egg",
      "butter or cooking spray",
    ],
    instructions: [
      "Toast the English muffin until lightly golden brown",
      "In a separate pan, cook egg to desired doneness (e.g. over easy, sunny side up, scrambled)",
      "Place cheese slice on one half of the English muffin and egg on the other half",
      "Sandwich the two halves together and serve",
    ],
    category: "Breakfast",
    cookingTime: 10,
    servingSize: 1,
    rating: 4,
    user: String(usersids[0]._id),
  },
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,h_1000,w_1000/v1675571029/__opt__aboutcom__coeus__resources__content_migration__simply_recipes__uploads__2010__04__eggs-benedict-horiz-a-1600-6f8850c8046b412b940fb1d657a5ba9a_mn6goh.jpg",
    title: "Eggs Benedict",
    ingredients: [
      "English muffins",
      "Canadian bacon",
      "eggs",
      "lemon juice",
      "white wine vinegar",
      "salt",
      "pepper",
      "butter",
      "heavy cream",
      "egg yolks",
    ],
    instructions: [
      "Split English muffins in half and toast",
      "In a pan, cook Canadian bacon until heated through",
      "Poach eggs by cracking them into a simmering water bath with a drop of lemon juice until whites are set and yolks are still runny",
      "Make Hollandaise sauce by melting butter in a saucepan and whisking in egg yolks, lemon juice, white wine vinegar, salt, pepper, and heavy cream",
      "Assemble the dish by placing a piece of Canadian bacon on each muffin half, then a poached egg, and finally drizzling Hollandaise sauce on top",
      "Serve immediately",
    ],
    category: "Breakfast",
    cookingTime: 25,
    servingSize: 2,
    rating: 4.5,
    user: String(usersids[0]._id),
  },
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,h_1000,w_1000/v1675571029/cereal_with_blueberries_and_milk-1296x728-header-1_ed6euy.webp",

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
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,h_1000,w_1000/v1675571634/brikieroll_wy8uda.jpg",
    title: "Big Breakfast Burrito",
    ingredients: [
      "tortilla wraps",
      "scrambled eggs",
      "cooked bacon",
      "shredded cheddar cheese",
      "salsa",
      "avocado",
      "sour cream",
    ],
    instructions: [
      "Warm a tortilla wrap in a dry pan over medium heat",
      "In the center of the wrap, layer scrambled eggs, cooked bacon, shredded cheddar cheese, and salsa",
      "Top with slices of avocado and a dollop of sour cream",
      "Fold in the sides of the wrap and roll tightly to enclose the filling",
      "Serve hot",
    ],
    category: "Breakfast",
    cookingTime: 15,
    servingSize: 1,
    rating: 4.5,
    user: String(usersids[0]._id),
  },

  // dinner recipe's x4
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,h_1000,w_1000/v1675571029/carbonara-horizontal-articleLarge-v2_gcb1jy.jpg",
    title: "Spaghetti Carbonara",
    ingredients: [
      "spaghetti",
      "bacon",
      "eggs",
      "Parmesan cheese",
      "heavy cream",
      "garlic",
      "salt",
      "pepper",
    ],
    instructions: [
      "Cook spaghetti according to package instructions",
      "In a separate pan, cook bacon until crispy, then set aside",
      "In a bowl, whisk together eggs, Parmesan cheese, heavy cream, and garlic",
      "Drain spaghetti and add to the bowl with the egg mixture, tossing to combine",
      "Add cooked bacon to the pasta, along with salt and pepper to taste",
      "Serve immediately",
    ],
    category: "Dinner",
    cookingTime: 20,
    servingSize: 4,
    rating: 3,
    user: String(usersids[0]._id),
  },
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,h_1000,w_1000/v1675571030/Spaghetti-Bolognese-square-FS-0204_nszxoq.jpg",
    title: "Spaghetti Bolognese",
    ingredients: [
      "spaghetti",
      "ground beef",
      "onion",
      "garlic",
      "can of crushed tomatoes",
      "olive oil",
    ],
    instructions: [
      "Cook spaghetti according to package instructions",
      "In a separate pan, heat olive oil and sauté onion and garlic until softened",
      "Add ground beef and cook until browned",
      "Stir in crushed tomatoes and simmer for 10 minutes",
      "Serve sauce over cooked spaghetti",
    ],
    category: "Dinner",
    cookingTime: 30,
    servingSize: 4,
    rating: 4,
    user: String(usersids[0]._id),
  },

  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,h_1000,w_1000/v1675571029/chili-cheese-nacho-final_ny6xon.jpg",

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
  // lunch recipes x3
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,h_1000,w_1000/v1675571030/k_archive_c3a8c1079c6970caf7188768531f20699d22f0d7_xqk3bn.jpg",
    title: "Grilled Cheese Sandwich",
    ingredients: ["bread", "cheese", "butter"],
    instructions: [
      "Butter one side of each slice of bread",
      "Place cheese between slices of bread",
      "Grill sandwich on both sides until cheese is melted and bread is toasted",
    ],
    category: "Lunch",
    cookingTime: 10,
    servingSize: 1,
    rating: 4,
    user: String(usersids[0]._id),
  },
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,h_1000,w_1000/v1675571029/delish-20210423-ultimate-veggie-sandwich-001-ab-1622826517_bkptxl.jpg",
    title: "Veggie Sandwich",
    ingredients: [
      "whole wheat bread",
      "mayonnaise",
      "mustard",
      "lettuce",
      "tomato",
      "avocado",
      "red onion",
      "cheddar cheese",
    ],
    instructions: [
      "Toast the whole wheat bread",
      "Spread mayonnaise and mustard on the toasted bread",
      "Layer lettuce, tomato, avocado, red onion, and cheddar cheese on the sandwich",
      "Put the two slices of bread together and cut in half",
    ],
    category: "Lunch",
    cookingTime: 10,
    servingSize: 1,
    rating: 4,
    user: String(usersids[0]._id),
  },
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,h_1000,w_1000/v1675571030/Spicy-Tuna-Salad-Copy_nvyumb.jpg",
    title: "Spicy Tuna Salad",
    ingredients: [
      "2 cans of tuna",
      "1 avocado",
      "1/4 cup mayonnaise",
      "1 tablespoon Sriracha sauce",
      "1 tablespoon lemon juice",
      "1/4 teaspoon salt",
      "1/4 teaspoon black pepper",
      "1/4 cup chopped cilantro",
    ],
    instructions: [
      "Drain the canned tuna and place in a bowl",
      "Add diced avocado, mayonnaise, Sriracha sauce, lemon juice, salt, and pepper to the bowl with the tuna",
      "Mix until ingredients are well combined",
      "Gently stir in chopped cilantro",
      "Serve as a sandwich or on top of greens",
    ],
    category: "Lunch",
    cookingTime: 10,
    servingSize: 2,
    rating: 4,
    user: String(usersids[0]._id),
  },
  // desert recipes
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,h_1000,w_1000/v1675571030/chocolate-lava-cakes-79308-1_tryacn.jpg",
    title: "Chocolate Lava Cake",
    ingredients: [
      "1/2 cup (1 stick) unsalted butter",
      "8 oz. semisweet chocolate, chopped",
      "3/4 cup granulated sugar",
      "3 large eggs",
      "3 large egg yolks",
      "1 tsp vanilla extract",
      "1/2 cup all-purpose flour",
    ],
    instructions: [
      "Preheat oven to 425°F and grease a muffin tin or ramekins",
      "Melt butter and chocolate in a heatproof bowl over a pot of simmering water",
      "Whisk in sugar, eggs, egg yolks, and vanilla extract",
      "Stir in flour until just combined",
      "Divide batter evenly among the muffin cups or ramekins",
      "Bake for 12-15 minutes or until edges are set and centers are still soft",
      "Let cool for 2 minutes, then turn cakes out onto plates and serve",
    ],
    category: "Dessert",
    cookingTime: 30,
    servingSize: 6,
    rating: 5,
    user: String(usersids[0]._id),
  },
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,h_1000,w_1000/v1675571030/homemade-banana-bread_e17q2o.jpg",
    title: "Banana Bread",
    ingredients: [
      "3 ripe bananas",
      "1/3 cup melted butter",
      "1 teaspoon baking soda",
      "Pinch of salt",
      "3/4 cup sugar",
      "1 large egg",
      "1 teaspoon vanilla extract",
      "1 1/2 cups all-purpose flour",
    ],
    instructions: [
      "Preheat the oven to 350°F (175°C)",
      "Mash the ripe bananas in a large mixing bowl",
      "Stir in melted butter, baking soda, salt, and sugar",
      "Beat in egg and vanilla extract",
      "Stir in flour until just blended",
      "Pour mixture into a buttered 4x8 inch loaf pan",
      "Bake for 1 hour",
      "Let cool on a rack for 10 minutes, then remove from pan and let cool completely",
    ],
    category: "Dessert",
    cookingTime: 60,
    servingSize: 10,
    rating: 4,
    user: String(usersids[0]._id),
  },
  {
    image:
      "https://res.cloudinary.com/dkpp2nfjo/image/upload/c_fill,h_1000,w_1000/v1675571031/Best-Chocolate-Chip-Cookies_ou6ukw.jpg",
    title: "Chocolate Chip Cookies",
    ingredients: [
      "1 cup (2 sticks) unsalted butter, at room temperature",
      "3/4 cup granulated sugar",
      "3/4 cup light brown sugar",
      "2 large eggs",
      "2 teaspoons vanilla extract",
      "2 1/4 cups all-purpose flour",
      "1 teaspoon baking soda",
      "1 teaspoon salt",
      "2 cups semisweet chocolate chips",
    ],
    instructions: [
      "Preheat oven to 375°F (190°C)",
      "In a medium bowl, whisk together the flour, baking soda, and salt.",
      "Using an electric mixer, cream the butter, granulated sugar, and brown sugar together until light and fluffy",
      "Beat in the eggs, one at a time, then stir in the vanilla.",
      "Stir the dry ingredients into the wet ingredients until just combined.",
      "Stir in the chocolate chips.",
      "Drop by rounded spoonfuls onto ungreased cookie sheets.",
      "Bake for 8 to 10 minutes or until light golden brown.",
    ],
    category: "Dessert",
    cookingTime: 15,
    servingSize: 24,
    rating: 5,
    user: String(usersids[0]._id),
  },
];

await RecipeModel.insertMany(recipes);
console.log("Inserted recipes");

const recipeids = await RecipeModel.find();

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
  },
];

await CommentModel.insertMany(newcomments);
console.log("Inserted comments");

// Close the MongoDB connection
dbClose();
