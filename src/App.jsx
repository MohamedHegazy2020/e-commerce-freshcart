import React, { useEffect } from "react";
import {
	Navigate,
	RouterProvider,
	createBrowserRouter,
} from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import NotFound from "./Components/NotFound/NotFound";
import Brands from "./Components/Brands/Brands";
import ProdDetails from "./Components/ProdDetails/ProdDetails";
import BrandProducts from "./Components/BrandProducts/BrandProducts";
import Profile from "./Components/Profile/Profile";
import jwtDecode from "jwt-decode";
import { useState } from "react";
import Cart from "./Components/Cart/Cart";
import CartContextProvider from "./Context/cartContext";
import UserOrder from "./Components/UserOrder/UserOrder";

export default function App() {
	// current user data
	const [currUser, setcurrUser] = useState(null);
	useEffect(() => {
		if (localStorage.getItem("token") && !currUser) {
			getUserData();
		}
	}, [currUser]);

	function getUserData() {
		const userData = jwtDecode(localStorage.getItem("token"));
		// console.log(userData);
		setcurrUser(userData);
	}

	function clearUserData() {
		localStorage.removeItem("token");
		setcurrUser(null);
	}

	// protected Route

	function ProtectedRoute({ children }) {
		if (currUser) {
			return <>{children}</>;
		} else {
			return <Navigate to="/login" />;
		}
	}

	// Routing

	const router = createBrowserRouter([
		{
			path: "",
			element: (
				<CartContextProvider>
					
						<Layout currUser={currUser} clearUserData={clearUserData} />
					
				</CartContextProvider>
			),
			children: [
				{ path: "home", element: <Home /> },
				{
					path: "cart",
					element: (
						<>
							<ProtectedRoute>
								<Cart currUser={currUser} />
							</ProtectedRoute>
						</>
					),
				},
				{
					path: "profile",
					element: (
						<ProtectedRoute>
							<Profile currUser={currUser} />
						</ProtectedRoute>
					),
				},{
					path: "cashOrder",
					element: (
						<ProtectedRoute>
							<UserOrder currUser={currUser} />
						</ProtectedRoute>
					),
				},
				{ path: "brands", element: <Brands /> },
				{ path: "prodDetails/:id", element: <ProdDetails /> },
				{ path: "brandProducts/:id", element: <BrandProducts /> },
				{ path: "login", element: <Login getUserData={getUserData} /> },
				{ path: "register", element: <Register /> },
				{ path: "", element: <Home /> },
				{ path: "*", element: <NotFound /> },
			],
		},
	]);

	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}
