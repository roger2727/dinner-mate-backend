import { RecipeModel } from "../models/recipe.js";

//

//SEARCH  RECIPES FOR SPECIFIC INGREDIENTS
router.get("/search-ingredients", async (req, res) => {
  try {
    // Get the ingredients from the query parameters
    const ingredients = JSON.parse(req.query.ingredients);
    // Find all recipes that contain the ingredients
    const recipes = await RecipeModel.find({
      ingredients: { $in: ingredients },
    });
    // Send the recipes as the response
    res.json({ recipes });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: err.message });
  }
});

// GETS ALL RECIPES
router.get("/get-all", async (req, res) => {
  try {
    //Find all recipes created by the current user
    const recipes = await RecipeModel.find({ isPublic: true });
    // Send the recipes as the response
    res.json({ recipes });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: err.message });
  }
});

// GETS ALL RECIPES
router.get("/get-all", async (req, res) => {
  try {
    //Find all recipes created by the current user
    const recipes = await RecipeModel.find({ isPublic: true });
    // Send the recipes as the response
    res.json({ recipes });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: err.message });
  }
});

// GETS ALL RECIPES
router.get("/get-all", async (req, res) => {
  try {
    //Find all recipes created by the current user
    const recipes = await RecipeModel.find({ isPublic: true });
    // Send the recipes as the response
    res.json({ recipes });
  } catch (err) {
    console.log("error", err);
    res.status(500).json({ error: err.message });
  }
});
// get 4 random recipes for home page
router.get("/home", async (req, res) => {
  try {
    const randomRecipes = await RecipeModel.aggregate([
      { $match: { isPublic: true } },
      { $sample: { size: 4 } },
    ]);
    const newRecipes = randomRecipes.map((recipe) => {
      recipe.image = cloudinary.url(recipe.image, {
        width: 300,
        height: 300,
        crop: "fill",
      });
      return recipe;
    });
    res.json(newRecipes);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// gets recipe by id
router.get("/:id", async (req, res) => {
  try {
    const recipe = await RecipeModel.findById(req.params.id);
    if (!recipe) {
      return res.status(404).send({ error: "Recipe not found" });
    }
    res.send(recipe);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

router.get("/category/:category", (req, res) => {
  RecipeModel.find({ category: req.params.category }, (err, recipes) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).json(recipes);
    }
  });
});

export default router;
