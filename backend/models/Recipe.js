const mongoose = require('mongoose');
const Comment = require('./Comment');
const Favorite = require('./Favorite');
const Rating = require('./Rating');

const RecipeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    thumbnail: {
        data: Buffer,
        contentType: String
    },
    photos: [{
        data: Buffer,
        contentType: String
    }],
    detail: {
        type: String,
        required: true,
    },
    country: {
        type: String,
    },
    cook_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    steps: [{
        type: String,
    }],
    ingredients: [
        {
            ingredient_id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Ingredients'
            },
            quantity: {
                type: String,
            }
        }
    ]
}, { versionKey: false })

RecipeSchema.pre('remove', async function (next) {
    const recipeId = this._id;
    // // Perform cascading delete for related records in Favorite, Rating, Comment models
    // Favorite.remove({ recipe_id: recipeId }).exec();
    // Rating.remove({ recipe_id: recipeId }).exec();
    // Comment.remove({ recipe_id: recipeId }).exec();
    // next();

    try {
        // Delete related records from other models
        await Favorite.deleteMany({ recipe_id: recipeId });
        await Rating.deleteMany({ recipe_id: recipeId });
        await Comment.deleteMany({ recipe_id: recipeId });

        next();
    } catch (err) {
        // Handle any errors here
        next(err);
    }
});

module.exports = mongoose.model('Recipe', RecipeSchema)