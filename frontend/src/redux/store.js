import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slice/authSlice';
import recipeReducer from './slice/recipeSlice';
import favoriteReducer from './slice/favoriteSlice';
import ingredientReducer from './slice/ingredientSlice';
import ratingReducer from './slice/ratingSlice';
import commentReducer from './slice/commentSlice';

export default configureStore({
    reducer: {
        auth: authReducer,
        recipe: recipeReducer,
        favorite: favoriteReducer,
        ingredient: ingredientReducer,
        rating: ratingReducer,
        comment: commentReducer,
    },
});