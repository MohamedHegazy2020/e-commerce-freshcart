import React, { Suspense } from "react";
import Navbar from "./../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { Outlet } from "react-router-dom";
import Toast from "../Toast/Toast";
import { Helmet } from "react-helmet";

export default function Layout({ currUser, clearUserData }) {
  // $('.toast').fadeIn(1000 , ()=>{
  //   setTimeout(()=>{
  //     $('.toast').fadeOut(1000)
  //   },2000)
  // })

  return (
    <>
      <Helmet>
        <title>FreshCart</title>
      </Helmet>
      <Suspense>
        <Navbar currUser={currUser} clearUserData={clearUserData} />
        <Toast />
        <Outlet />

        <Footer />
      </Suspense>
    </>
  );
}
