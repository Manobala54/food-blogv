import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Api from '../api'   //  shared Axios instance

export default function AddFoodRecipe() {
  const [recipeData, setRecipeData] = useState({})
  const navigate = useNavigate()

  const onHandleChange = (e) => {
    let val =
      (e.target.name === "ingredients")
        ? e.target.value.split(",")
        : (e.target.name === "file")
          ? e.target.files[0]
          : e.target.value

    setRecipeData(pre => ({ ...pre, [e.target.name]: val }))
  }

  const onHandleSubmit = async (e) => {
    e.preventDefault()
    console.log(recipeData)

    try {
      await Api.post("/recipe", recipeData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "authorization": "bearer " + localStorage.getItem("token")
        }
      })
      navigate("/")   // redirect home on success
    } catch (err) {
      console.error("Error adding recipe:", err.response?.data || err.message)
    }
  }

  return (
    <div className="container">
      <form className="form" onSubmit={onHandleSubmit}>
        <div className="form-control">
          <label>Title</label>
          <input type="text" className="input" name="title" onChange={onHandleChange} required />
        </div>
        <div className="form-control">
          <label>Time</label>
          <input type="text" className="input" name="time" onChange={onHandleChange} required />
        </div>
        <div className="form-control">
          <label>Ingredients</label>
          <textarea className="input-textarea" name="ingredients" rows="5" onChange={onHandleChange} required />
        </div>
        <div className="form-control">
          <label>Instructions</label>
          <textarea className="input-textarea" name="instructions" rows="5" onChange={onHandleChange} required />
        </div>
        <div className="form-control">
          <label>Recipe Image</label>
          <input type="file" className="input" name="file" onChange={onHandleChange} required />
        </div>
        <button type="submit">Add Recipe</button>
      </form>
    </div>
  )
}