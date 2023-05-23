const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI = "mongodb://localhost:27017/recipe-app";

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(async (db) => {
    console.log(`Connected to the database: "${mongoose.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    await Recipe.deleteMany();

    const newRecipe = {
      title: "Thai Style Chicken Noodle Soup",
      level: "Easy Peasy",
      ingredients: ["Chicken", "Noodles", "Coconut milk", "Lime", "Vegetables"],
      cuisine: "Thai",
      dishType: "soup",
      image: "https://www.istockphoto.com/fr/photos/pad-thai",
      duration: 30,
      creator: "Chef Phueng",
    };

    const createdRecipe = await Recipe.create(newRecipe);
    console.log(`Recipe created: ${createdRecipe.title}`);

    const insertedRecipes = await Recipe.insertMany(data);
    console.log("Multiple recipes inserted:");
    insertedRecipes.forEach((recipe) => {
      console.log(`- ${recipe.title}`);
    });

    const updatedRecipe = await Recipe.findOneAndUpdate(
      { title: "Rigatoni alla Genovese" },
      { duration: 100 },
      { new: true }
    );
    console.log(`Recipe updated: ${updatedRecipe.title}`);

    await Recipe.deleteOne({ title: "Carrot Cake" });
    console.log("Recipe deleted: Carrot Cake");

    console.log("Recipe deleted");
    mongoose.connection.close();
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  })

  .finally(() => {
    mongoose.disconnect();
    console.log("Disconnected from database");
  });
