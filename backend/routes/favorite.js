const favoriteRouter = require('express').Router()
const Favorite = require('../models/Favorite')

// POST - toggle favorite
favoriteRouter.post('/toggleFavorite', async (req, res) => {
    try {
        const { recipe_id, user_id } = req.body

        if (!recipe_id || !user_id) {
            return res.status(400).json({
                message: 'Missing required fields',
                success: false
            })
        }

        let favoriteRecipe = await Favorite.findOne({ recipe_id, user_id })
        if (favoriteRecipe) {
            favoriteRecipe.deleteOne()
            return res.json({
                isAdded: false,
                message: 'Removed from favorites',
                success: true
            })
        }

        favoriteRecipe = new Favorite({
            recipe_id, user_id
        })

        await favoriteRecipe.save()
        const data = await favoriteRecipe.populate('recipe_id')
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

// GET - get favorite recipes of user
favoriteRouter.get('/getByUser', async (req, res) => {
    try {
        const { user_id } = req.query
        
        if (!user_id) {
            return res.status(400).json({
                message: 'user_id is required',
                success: false
            })
        }

        let favorites = await Favorite.find({ user_id }).populate('recipe_id')

        res.status(200).json({
            success: true,
            data: favorites,
        })
    } catch (err) {
        console.log(err)
        res.status(400).json({ success: false })
    }
})

module.exports = favoriteRouter