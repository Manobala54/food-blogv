import React from 'react'
import './App.css'
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import Home from './pages/Home'
import MainNavigation from './components/MainNavigation'
import AddFoodRecipe from './pages/AddFoodRecipe'
import EditRecipe from './pages/EditRecipe'
import RecipeDetails from './pages/RecipeDetails'
import Api from "./api"   //  use the API instance

// Get all recipes
const getAllRecipes = async () => {
  let allRecipes = []
  const res = await Api.get('/recipe')   //  no localhost
  allRecipes = res.data
  return allRecipes
}

// Get recipes created by logged-in user
const getMyRecipes = async () => {
  let user = JSON.parse(localStorage.getItem("user"))
  let allRecipes = await getAllRecipes()
  return allRecipes.filter(item => item.createdBy === user._id)
}

// Get favourite recipes from localStorage
const getFavRecipes = () => {
  return JSON.parse(localStorage.getItem("fav")) || []
}

// Get a single recipe + createdBy user email
const getRecipe = async ({ params }) => {
  let recipe;
  
  const recipeRes = await Api.get(`/recipe/${params.id}`)   //  no localhost
  recipe = recipeRes.data

  const userRes = await Api.get(`/user/${recipe.createdBy}`)   //  no localhost
  recipe = { ...recipe, email: userRes.data.email }

  return recipe
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainNavigation />,
    children: [
      { path: "/", element: <Home />, loader: getAllRecipes },
      { path: "/myRecipe", element: <Home />, loader: getMyRecipes },
      { path: "/favRecipe", element: <Home />, loader: getFavRecipes },
      { path: "/addRecipe", element: <AddFoodRecipe /> },
      { path: "/editRecipe/:id", element: <EditRecipe /> },
      { path: "/recipe/:id", element: <RecipeDetails />, loader: getRecipe }
    ]
  }
])

export default function App() {
  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  )
}