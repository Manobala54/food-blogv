import React from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { Outlet } from 'react-router-dom'

export default function MainNavigation(){
    return(
        <>
           <Navbar/>
           <Outlet/>  {/* outlet from react router it basically render the children */}
           <Footer/>
        
        </>
    )
}