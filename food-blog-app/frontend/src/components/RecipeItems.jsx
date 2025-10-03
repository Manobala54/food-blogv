import React, { useEffect, useState } from 'react'
import { Link, useLoaderData, useNavigate } from 'react-router-dom'
import foodImg from '../assets/foodRecipe.png'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faClock, faHeart, faPen, faTrash } from "@fortawesome/free-solid-svg-icons"
import Api from '../api'   //  use shared API instance

export default function RecipeItems() {
  const recipes = useLoaderData()
  const [allRecipes, setAllRecipes] = useState()
  let path = window.location.pathname === "/myRecipe" ? true : false
  let favItems = JSON.parse(localStorage.getItem("fav")) ?? []
  const [isFavRecipe, setIsFavRecipe] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    setAllRecipes(recipes)
  }, [recipes])

  const onDelete = async (id) => {
    await Api.delete(`/recipe/${id}`)   //  no localhost
      .then((res) => console.log(res))

    setAllRecipes(recipes => recipes.filter(recipe => recipe._id !== id))

    let filterItem = favItems.filter(recipe => recipe._id !== id)
    localStorage.setItem("fav", JSON.stringify(filterItem))
  }

  const favRecipe = (item) => {
    let filterItem = favItems.filter(recipe => recipe._id !== item._id)
    favItems = favItems.filter(recipe => recipe._id === item._id).length === 0
      ? [...favItems, item]
      : filterItem

    localStorage.setItem("fav", JSON.stringify(favItems))
    setIsFavRecipe(pre => !pre)
  }

  return (
    <>
      <div className='card-container'>
        {
          allRecipes?.map((item, index) => {
            return (
              <div key={index} className='card' onDoubleClick={() => navigate(`/recipe/${item._id}`)}>
                {/*  use baseURL from env variable */}
                <img src={`${import.meta.env.VITE_API_URL}/images/${item.coverImage}`} width="120px" height="100px" alt={item.title} />
                <div className='card-body'>
                  <div className='title'>{item.title}</div>
                  <div className='icons'>
                    <div className='timer'><FontAwesomeIcon icon={faClock} /> {item.time}</div>
                    {
                      (!path)
                        ? <FontAwesomeIcon
                            onClick={() => favRecipe(item)}
                            className='heart'
                            style={{ color: (favItems.some(res => res._id === item._id)) ? "red" : "" }}
                            icon={faHeart}
                          />
                        : <div className='action'>
                            <Link to={`/editRecipe/${item._id}`} className='editIcon'>
                              <FontAwesomeIcon icon={faPen} />
                            </Link>
                            <FontAwesomeIcon
                              onClick={() => onDelete(item._id)}
                              className='deleteIcon'
                              icon={faTrash}
                            />
                          </div>
                    }
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </>
  )
}