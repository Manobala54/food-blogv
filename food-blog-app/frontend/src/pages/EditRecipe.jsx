import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import Api from '../api'   //  use shared API instance

export default function EditRecipe() {
  const [recipeData, setRecipeData] = useState({})
  const navigate = useNavigate()
  const { id } = useParams()

  useEffect(() => {
    const getData = async () => {
      try {
        const response = await Api.get(`/recipe/${id}`)   //  no localhost
        let res = response.data
        setRecipeData({
          title: res.title,
          ingredients: res.ingredients.join(","),
          instructions: res.instructions,
          time: res.time
        })
      } catch (err) {
        console.error("Error fetching recipe:", err.response?.data || err.message)
      }
    }
    getData()
  }, [id])

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
      await Api.put(`/recipe/${id}`, recipeData, {    //  no localhost
        headers: {
          "Content-Type": "multipart/form-data",
          "authorization": "bearer " + localStorage.getItem("token")
        }
      })
      navigate("/myRecipe")
    } catch (err) {
      console.error("Error updating recipe:", err.response?.data || err.message)
    }
  }

  return (
    <div className="container">
      <form className="form" onSubmit={onHandleSubmit}>
        <div className="form-control">
          <label>Title</label>
          <input
            type="text"
            className="input"
            name="title"
            onChange={onHandleChange}
            value={recipeData.title || ""}
            required
          />
        </div>
        <div className="form-control">
          <label>Time</label>
          <input
            type="text"
            className="input"
            name="time"
            onChange={onHandleChange}
            value={recipeData.time || ""}
            required
          />
        </div>
        <div className="form-control">
          <label>Ingredients</label>
          <textarea
            className="input-textarea"
            name="ingredients"
            rows="5"
            onChange={onHandleChange}
            value={recipeData.ingredients || ""}
            required
          />
        </div>
        <div className="form-control">
          <label>Instructions</label>
          <textarea
            className="input-textarea"
            name="instructions"
            rows="5"
            onChange={onHandleChange}
            value={recipeData.instructions || ""}
            required
          />
        </div>
        <div className="form-control">
          <label>Recipe Image</label>
          <input
            type="file"
            className="input"
            name="file"
            onChange={onHandleChange}
          />
        </div>
        <button type="submit">Edit Recipe</button>
      </form>
    </div>
  )
}