require('dotenv').config();
const express = require('express');
const app = express()
const cors = require('cors');
const authRouter = require('./routes/auth');
const recipeRouter = require('./routes/recipe');
const favoriteRouter = require('./routes/favorite');
const ingredientsRouter = require('./routes/ingredients');
const ratingRouter = require('./routes/rating');
const commentRouter = require('./routes/comment');
const { PORT = 3000 } = process.env;

// MIDDLEWARE
require('./config/db')
app.use(cors())
app.use(express.json())

app.use('/api/auth', authRouter)
app.use('/api/recipe', recipeRouter)
app.use('/api/favorite', favoriteRouter)
app.use('/api/rating', ratingRouter)
app.use('/api/comment', commentRouter)
app.use('/api/ingredient', ingredientsRouter)


app.listen(PORT, () => {
    console.log(`Server Started at ${PORT}`)
})