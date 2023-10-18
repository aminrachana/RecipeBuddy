import React from 'react'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import AddIngredient from '../pages/AddIngredient'
import AddRecipe from '../pages/AddRecipe'
import FavoriteRecipes from '../pages/FavoriteRecipes'
import Home from '../pages/Home'
import Login from '../pages/Login'
import RecipeDetail from '../pages/RecipeDetail'
import Ingredients from '../pages/Ingredients'
import Recipes from '../pages/Recipes'
import Register from '../pages/Register'
import { AuthLayout } from './AuthLayout'
import { ProtectedLayout } from './ProtectedLayout'

export const NavigationStack = () => {
    return (
        <>
            <Router>
                <Routes>
                    {/* Cant be accessed to logged user */}
                    <Route path='/auth' element={<AuthLayout />}>
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<Register />} />
                    </Route>
                    {/* Only accessed to logged user */}
                    <Route path='/dashboard' element={<ProtectedLayout />}>
                        <Route path="favorite-recipes" element={<FavoriteRecipes />} />
                        <Route path="add-recipe" element={<AddRecipe />} />
                        <Route path="addIngredient" element={<AddIngredient />} />
                    </Route>
                    {/* Open for all */}
                    <Route path="/recipes" element={<Recipes />} />
                    <Route path="/ingredients" element={<Ingredients />} />
                    <Route path="/recipe-detail" element={<RecipeDetail />} />
                    <Route path="/" element={<Home />} />
                </Routes>
            </Router>
        </>
    )
}