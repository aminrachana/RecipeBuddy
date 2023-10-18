const recipeRouter = require('express').Router()
const multer = require("multer");
const fs = require('fs');
const Recipe = require('./../models/Recipe');
const path = require('path');
const Favorite = require('../models/Favorite');

const Storage = multer.diskStorage({
    destination: "uploads",
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({
    storage: Storage
}).fields([
    { name: 'thumbnailImage', maxCount: 1 },
    { name: 'photoImages', maxCount: 10 }
]);


recipeRouter.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            let errors = [];
            if (!req.body?.name) {
                errors.push('Name is required')
            }
            if (!req.body?.detail) {
                errors.push('Detail is required')
            }
            if (!req.files['thumbnailImage'] || (!req.files['thumbnailImage'][0] || !req.files['thumbnailImage'][0]?.filename)) {
                errors.push('Thumbnail is required')
            }
            if (!req.files['photoImages']) {
                errors.push('Photo is required')
            }
            if (!JSON.parse(req.body.steps).length) {
                errors.push('At least 1 step is required')
            }
            if (!JSON.parse(req.body.ingredients).length) {
                errors.push('At least 1 ingredient is required')
            }
            if (errors.length) {
                return res.status(400).json({
                    message: JSON.stringify(errors),
                    success: false
                })
            }
            const thumbnailImage = {
                data: fs.readFileSync(path.join(__dirname, '..', 'uploads', req.files['thumbnailImage'][0].filename)),
                contentType: 'image/png'
            };

            const photoImages = req.files['photoImages'].map((file) => ({
                data: fs.readFileSync(path.join(__dirname, '..', 'uploads', file.filename)),
                contentType: 'image/png'
            }));

            const newRecipe = new Recipe({
                name: req.body.name,
                detail: req.body.detail,
                cook_id: req.body.cook_id,
                country: req.body.country || '',
                thumbnail: thumbnailImage,
                photos: photoImages,
                steps: JSON.parse(req.body.steps),
                ingredients: JSON.parse(req.body.ingredients)
            });

            newRecipe.save()
                .then(() =>
                    res.json({
                        success: true,
                        message: "Recipe added successfully"
                    }))
                .catch((err) => {
                    console.log(err)
                    res.status(400).json({
                        success: false,
                        error: "Something went wrong"
                    })
                })
        }
    });
})


recipeRouter.get('/', async (req, res) => {
    const filters = req.query;
    console.log('filters', filters);

    const selectedIngredients = filters.selectedIngredients;

    // Create the query object based on selectedIngredients
    const query = selectedIngredients
        ? { 'ingredients.ingredient_id': { $in: selectedIngredients } }
        : {};

    console.log('query', query);

    Recipe.find(query).populate('ingredients.ingredient_id')
        .then((data, err) => {
            if (err) {
                console.log(err);
                res.status(400).json({
                    success: false,
                    error: err
                })
            }
            res.json({
                success: true,
                data: [...data]
            })
        })
});

recipeRouter.delete('/delete/:id', async (req, res) => {
    try {
        const recipeId = req.params.id;
        const deletedRecipe = await Recipe.findByIdAndDelete(recipeId);

        if (!deletedRecipe) {
            return res.status(404).json({
                success: false,
                error: 'Recipe not found',
            });
        }

        res.status(200).json({
            success: true,
            data: deletedRecipe,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Server error',
        });
    }
});

module.exports = recipeRouter