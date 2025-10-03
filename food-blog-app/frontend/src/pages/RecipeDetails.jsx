import React from 'react'
import profileImg from '../assets/profile.png'
import { useLoaderData } from 'react-router-dom'
import Api from '../api'

export default function RecipeDetails() {
  const recipe = useLoaderData()
  console.log(recipe)

  return (
    <>
      <div className="outer-container">
        <div className="profile">
          <img src={profileImg} width="50px" height="50px" alt="profile" />
          <h5>{recipe.email}</h5>
        </div>
        <h3 className="title">{recipe.title}</h3>

        {/* use env variable for backend URL */}
        <img
          src={`${import.meta.env.VITE_API_URL}/images/${recipe.coverImage}`}
          width="220px"
          height="200px"
          alt={recipe.title}
        />

        <div className="recipe-details">
          <div className="ingredients">
            <h4>Ingredients</h4>
            <ul>
              {recipe.ingredients.map((item, index) => (
                <li key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="instructions">
            <h4>Instructions</h4>
            <span>{recipe.instructions}</span>
          </div>
        </div>
      </div>
    </>
  )
}