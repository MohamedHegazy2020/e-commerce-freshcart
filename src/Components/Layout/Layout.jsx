import React from "react";
import Navbar from "./../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import Toast from "../Toast/Toast";

export default function Layout({ currUser, clearUserData }) {


// $('.toast').fadeIn(1000 , ()=>{
//   setTimeout(()=>{
//     $('.toast').fadeOut(1000)
//   },2000)
// })




	return (
		<>
			
      
      
      <Navbar currUser={currUser} clearUserData={clearUserData} />
			<Toast/>
      <Outlet />

			<Footer />
			
		</>
	);
}
