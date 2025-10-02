import React from 'react'

import foodRecipe from '../assets/foodRecipe.png'
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import RecipeItems from '../components/RecipeItems';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Modal from '../components/Modal';
import InputForm from '../components/InputForm';


export default function Home(){
     const navigate=useNavigate()
     const[isOpen,setIsOpen]=useState(false)

     const addRecipe=()=>{
        let token=localStorage.getItem("token")
        if(token)
        navigate("/addRecipe")
        else{
            setIsOpen(true)
        }
     }

  return (
        <>
           
            <section className='home'>
                <div className='left'>
                    <h1>Food Recipe</h1>
                    <h4>Welcome to Food Recipe Hub, your place to discover and share delicious recipes from around the world.
Whether you’re a beginner or an experienced cook, you’ll find easy-to-follow recipes with step-by-step instructions, ingredients, and cooking times.<br></br>
Share your own recipes and inspire others to try something new today!</h4>
                    <button onClick={addRecipe}>Share your recipe</button>
                </div>
                <div className='right'>
                    <img src={foodRecipe} width="320px" height="300px"></img>
                </div>
            </section>
            <div className='bg'>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#af8440ff" fillOpacity="1" d="M0,32L24,26.7C48,21,96,11,144,53.3C192,96,240,192,288,218.7C336,245,384,203,432,186.7C480,171,528,181,576,197.3C624,213,672,235,720,245.3C768,256,816,256,864,250.7C912,245,960,235,1008,224C1056,213,1104,203,1152,202.7C1200,203,1248,213,1296,218.7C1344,224,1392,224,1416,224L1440,224L1440,320L1416,320C1392,320,1344,320,1296,320C1248,320,1200,320,1152,320C1104,320,1056,320,1008,320C960,320,912,320,864,320C816,320,768,320,720,320C672,320,624,320,576,320C528,320,480,320,432,320C384,320,336,320,288,320C240,320,192,320,144,320C96,320,48,320,24,320L0,320Z"></path></svg>
            </div>
            { (isOpen) && <Modal onClose={()=>setIsOpen(false)}><InputForm setIsOpen={()=>setIsOpen(false)}/></Modal>}
            <div className='recipe'>
                <RecipeItems/>
            </div>
            
            
        </>
    );
}

