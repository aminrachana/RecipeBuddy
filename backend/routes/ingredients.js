const ingredientsRouter = require('express').Router()
const multer = require("multer");
const fs = require('fs');
const Ingredients = require('./../models/Ingredients');
const path = require('path');

const Storage = multer.diskStorage({
    destination: "uploads/ingredients",
    filename: (req, file, cb) => {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({
    storage: Storage
}).fields([
    { name: 'photo', maxCount: 1 },
]);


ingredientsRouter.post('/upload', (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.log(err);
        } else {
            let errors = [];
            if (!req.body?.name) {
                errors.push('Name is required')
            }
            if (!req.body?.season) {
                errors.push('Season is required')
            }
            if (!req.files['photo'] || (!req.files['photo'][0] || !req.files['photo'][0]?.filename)) {
                errors.push('Photo is required')
            }
            if (errors.length) {
                return res.status(400).json({
                    message: JSON.stringify(errors),
                    success: false
                })
            }
            const photo = {
                data: fs.readFileSync(path.join(__dirname, '..', 'uploads/ingredients', req.files['photo'][0].filename)),
                contentType: 'image/png'
            };
            let ingredientObj = {
                name: req.body.name,
                season: req.body.season,
                is_vegetarian: req.body.is_vegetarian,
                is_non_vegetarian: req.body.is_non_vegetarian,
                is_egg: req.body.is_egg,
                is_dairy: req.body.is_dairy,
                photo: photo
            }

            if (req.body.season) {
                ingredientObj = { ...ingredientObj, season: req.body.season }
            }

            const newIngredients = new Ingredients(ingredientObj);

            newIngredients.save()
                .then(() =>
                    res.json({
                        success: true,
                        message: "Ingredients added successfully"
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


ingredientsRouter.get('/', async (req, res) => {
    Ingredients.find({})
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

ingredientsRouter.delete('/delete/:id', async (req, res) => {
    try {
        const ingredient_id = req.params.id;
        const deletedIngredient = await Ingredients.findByIdAndDelete(ingredient_id);

        if (!deletedIngredient) {
            return res.status(404).json({
                success: false,
                error: 'Ingredient not found',
            });
        }

        res.status(200).json({
            success: true,
            data: deletedIngredient,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            error: 'Server error',
        });
    }
});

module.exports = ingredientsRouter