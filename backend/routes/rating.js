const ratingRouter = require('express').Router()
const Rating = require('../models/Rating')

// POST - add rating
ratingRouter.post('/addRating', async (req, res) => {
    try {
        const { recipe_id, user_id, rating_stars } = req.body

        if (!recipe_id || !user_id || !rating_stars) {
            return res.status(400).json({
                message: 'Missing required fields',
                success: false
            })
        }

        let ratingRecipe = await Rating.findOne({ recipe_id, user_id })
        if (ratingRecipe) {
            ratingRecipe.deleteOne()
        }

        ratingRecipe = new Rating({
            recipe_id, user_id, rating_stars
        })

        await ratingRecipe.save()
        const data = await ratingRecipe.populate('recipe_id')
        res.status(200).json({
            isAdded: true,
            success: true,
            data,
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false })
    }
})

// GET - get rating by recipe
ratingRouter.get('/getByRecipe', async (req, res) => {
    try {
        const { recipe_id } = req.query

        if (!recipe_id) {
            let ratings = await Rating.find({})
            return res.status(400).json({
                message: 'recipe_id is required',
                success: false,
                data: ratings,
            })
        }

        let ratings = await Rating.find({ recipe_id }).populate('user_id')

        let ratingsAvg = 0;
        let ratingSum = 0;
        ratings?.map((item) => ratingSum += item.rating_stars)
        ratingsAvg = ratingSum / (ratings?.length || 0);

        res.status(200).json({
            success: true,
            ratingsAvg: ratingsAvg,
            data: ratings,
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false })
    }
})

module.exports = ratingRouter