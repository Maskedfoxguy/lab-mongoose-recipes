const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://127.0.0.1:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    const myrecipe = {
      "title": "Chicken Paprikash",
      "level": "Amateur Chef",
      "ingredients": [
        "2 tablespoon porklad ",
        "3 pounds of Chicken",
        "2 medium onions, very finely chopped",
        "2 cloves of garlic, finely minced",
        "2 Roma tomatoes, finely diced",
        "1 HUngarian bell pepper, diced",
        "salt and pepperto taste",
        "4 tablespoons of hungarian sweet paprika powder"
      ],
      "cuisine": "Hungarian",
      "dishType": "main_course",
      "image": "https://www.oliviascuisine.com/wp-content/uploads/2020/12/chicken-paprikash-720x1080.jpg", 
      "duration": 60,
      "creator": "Chef Edina"
    }
    Recipe.create(myrecipe)
    .then((createdRecipe)=> {
      console.log(createdRecipe.title)
    })
    Recipe.insertMany(data)
    .then((createdRecipes)=> {
      console.log(createdRecipes)
      for (let i = 0 ; i < createdRecipes.length ; i++) {
        const currentElement = createdRecipes[i]
        console.log(currentElement.title)
      }
    })
    Recipe.findOneAndUpdate({title: 'Rigatoni alla Genovese'}, {duration: 100}, {new: true} ,(error, data) => {
      if(error){
        console.log(error)
      }else{
        console.log(data)
      }
    })
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
