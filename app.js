const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Recipe = require('./models/recipe');


const app = express();

//mongodb Atlas connection

mongoose.connect('mongodb+srv://kimutai:12kimgeorge@cluster0-wtkki.mongodb.net/kimuu?retryWrites=true&w=majority', {useUnifiedTopology: true, useNewUrlParser: true })
   .then(() => {
    console.log('Successfully connected to  DB!');
  })
  .catch((error) => {
    console.log('Unable to connect to DB!');
    console.error(error);
  });
//json format
app.use(bodyParser.json());

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

//add new recipe

app.post('/api/recipes', (req, res, next) => {
    const recipe = new Recipe({
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time,
    });

    recipe.save().then( () => {
        res.status(201).json({
            message: 'Successfully added a record'
        })
    }).catch((error) => {
        console.error(error);
        error:error
    });

  });


  // Get one Recipe
app.get('/api/recipes/:id',(req,res,next) => {
    console.log(req.body);
    Recipe.findOne({
        _id: req.params.id
    }).then(
        (recipes) => {
       res.status(200).json(recipes);
    }).catch((error) => {
        console.error(error);
            error:error
    });
});


//Update a recipe
app.put('/api/recipes/:id',(req,res,nex) => {
    console.log(req.body);

    const recipe = new Recipe({
        _id: req.params.id,
        title: req.body.title,
        ingredients: req.body.ingredients,
        instructions: req.body.instructions,
        difficulty: req.body.difficulty,
        time: req.body.time,
    });

    Recipe.updateOne({_id: req.params.id},recipe)
    .then((recipe) => {
        res.status(201).json({
            message: 'Record Updated Successfully'
        })
    }).catch((error) => {
        error:error
    });
});

app.delete('/api/recipes/:id',(req,res,next) => {
    Recipe.deleteOne({_id: req.params.id}).then((recipes) => {
        res.status(200).json({
            message: 'Record Deleted Successfully'
        })
    }).catch((error) => {
        error:error
    });
});

  // List all available Recipes
  app.use('/api/recipes', (req,res,next) => {
    Recipe.find().then((recipes) => {
        res.status(200).json(recipes);
    }).catch((error) => {
        res.status(400).json({
            error:error
        });
    });
  });

  




module.exports = app;