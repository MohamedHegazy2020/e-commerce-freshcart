import axios from "axios";
import React from "react";
import { createContext } from "react";
import $ from "jquery";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const cartContext = createContext();

// cartContext.Provider=

export default function CartContextProvider({ children }) {
	const [cartProducts, setcartProducts] = useState(null);
	const [cartProductsCount, setcartProductsCount] = useState(null);
	const [totalCartPrice, settotalCartPrice] = useState(null);
	const [cartId, setcartId] = useState(null);
	const [existCart, setexistCart] = useState(false);
	// console.log(cartId);
	const navigate = useNavigate();

	useEffect(() => {
		if (!cartProductsCount) getLoggedUserCart();
	});

	// animation effects function

	function displaySuccAddToast({ status, message, data }) {
		if (status === "success") {
			$(".toast-container")
				.append(`<div class="toast align-items-center  text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true" updatedAt ="${data.products.updatedAt}">
				<div class="toast-header text-capitalize">
				<strong class="me-auto">Add to cart </strong>
				<small class="text-muted"></small>
				</div>
				<div class="toast-body">
				${message}
				</div>
			      </div> `);

			$(`[updatedAt = ${data.products.updatedAt}] `).fadeIn(1000, () => {
				setTimeout(() => {
					$(`[updatedAt = ${data.products.updatedAt}]`).fadeOut(1000, () => {
						$(`[updatedAt = ${data.products.updatedAt}]`).remove();
					});
				}, 2000);
			});
		}
	}

	function displaySuccRemoveToast({ status, data }) {
		if (status === "success") {
			$(".toast-container")
				.append(`<div class="toast align-items-center  text-bg-danger border-0" role="alert" aria-live="assertive" aria-atomic="true" updatedAt ="${data.products.updatedAt}">
				<div class="toast-header text-capitalize">
				<strong class="me-auto">Remove from cart </strong>
				<small class="text-muted"></small>
				</div>
				<div class="toast-body">
				 Product removed successfully from your cart 
				</div>
			      </div> `);

			$(`[updatedAt = ${data.products.updatedAt}] `).fadeIn(1000, () => {
				setTimeout(() => {
					$(`[updatedAt = ${data.products.updatedAt}]`).fadeOut(1000, () => {
						$(`[updatedAt = ${data.products.updatedAt}]`).remove();
					});
				}, 2000);
			});
		}
	}

	//

	function displaySuccClearToast() {
		$(".toast-container")
			.append(`<div class="toast align-items-center  text-bg-danger     clrToast border-0" role="alert" aria-live="assertive" aria-atomic="true" >
				<div class="toast-header text-capitalize">
				<strong class="me-auto">Clear cart </strong>
				<small class="text-muted"></small>
				</div>
				<div class="toast-body">
				 Cart Cleared Suessfully
				</div>
			      </div> `);

		$(`.clrToast `).fadeIn(1000, () => {
			setTimeout(() => {
				$(`.clrToast`).fadeOut(1000, () => {
					$(`.clrToast`).remove();
				});
			}, 2000);
		});
	}

	function displaySuccUpdateToast({ status, data }) {
		if (status === "success") {
			$(".toast-container")
				.append(`<div class="toast align-items-center  text-bg-success border-0" role="alert" aria-live="assertive" aria-atomic="true" updatedAt ="${data.products.updatedAt}">
				<div class="toast-header text-capitalize">
				<strong class="me-auto"> Update count in cart </strong>
				<small class="text-muted"></small>
				</div>
				<div class="toast-body">
				Product count updated successfully in your cart
				</div>
			      </div>`);

			$(`[updatedAt = ${data.products.updatedAt}] `).fadeIn(1000, () => {
				setTimeout(() => {
					$(`[updatedAt = ${data.products.updatedAt}]`).fadeOut(1000, () => {
						$(`[updatedAt = ${data.products.updatedAt}]`).remove();
					});
				}, 2000);
			});
		}
	}

	//

	function displayWarnUnauthToast(message) {
		$(".toast-container")
			.append(` <div class="toast align-items-center  text-bg-warning authWarning border-0" role="alert" aria-live="assertive" aria-atomic="true" >
				<div class="toast-header text-capitalize">
				<strong class="me-auto"> Unauthraized Warning </strong>
				<small class="text-muted"></small>
				</div>
				<div class="toast-body">
				${message}
				</div>
			      </div>`);

		$(`.authWarning`).fadeIn(1000, () => {
			setTimeout(() => {
				$(`.authWarning `).fadeOut(1000, () => {
					$(`.authWarning `).remove();
					navigate("/login");
				});
			}, 2000);
		});
	}
	// cart APIs functions
	// add product
	async function addProductToCart(productId) {
		try {
			const { data } = await axios.post(
				"https://ecommerce.routemisr.com/api/v1/cart",
				{ productId: productId },
				{ headers: { token: localStorage.getItem("token") } }
			);
			// console.log(data);
			if (data.status === "success") {
				displaySuccAddToast(data);
				getLoggedUserCart();
			}
		} catch (error) {
			console.log("error:", error, error.code);
			if (error.response.request.statusText === "Unauthorized") {
				displayWarnUnauthToast(error.response.data.message);
			}
		}
	}

	// remove product

	async function removeProductFromCart(productId) {
		try {
			const { data } = await axios.delete(
				`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
				{ headers: { token: localStorage.getItem("token") } }
			);
			console.log(data);

			if (data.status === "success") {
				displaySuccRemoveToast(data);
				getLoggedUserCart();
			}
		} catch (error) {
			console.log("error:", error);
		}
	}
	async function clearUserCart() {
		try {
			const { data } = await axios.delete(
				`https://ecommerce.routemisr.com/api/v1/cart`,
				{ headers: { token: localStorage.getItem("token") } }
			);
			// console.log(data);

			if (data.message === "success") {
				getLoggedUserCart();
				displaySuccClearToast();
			}
		} catch (error) {
			console.log("error:", error);
		}
	}
	// get cart product

	async function getLoggedUserCart() {
		try {
			const { data } = await axios.get(
				`https://ecommerce.routemisr.com/api/v1/cart`,
				{ headers: { token: localStorage.getItem("token") } }
			);
			// console.log(data);

			if (data.status === "success") {
				setcartProducts(data.data.products);
				setcartProductsCount(data.numOfCartItems);
				settotalCartPrice(data.data.totalCartPrice);
				setexistCart(true);
				setcartId(data.data._id);
			}
		} catch (error) {
			console.log("error:", error);
			if (error.response.data.statusMsg === "fail") {
				setexistCart(false);
				setcartProductsCount(null);

				// console.log(existCart)
			}
		}
	}

	async function updateProductCount(productId, count) {
		try {
			const { data } = await axios.put(
				`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,
				{ count },
				{ headers: { token: localStorage.getItem("token") } }
			);

			if (data.status === "success") {
				getLoggedUserCart();
				displaySuccUpdateToast(data);
			}
		} catch (error) {
			console.log("error:", error);
		}
	}

	// check if product is in user cart

	function isProductInUserCart(productId) {
		if (cartProducts) {
			for (const product of cartProducts) {
				if (product.product._id === productId) {
					// console.log(true);

					return true;
				}
			}
		}

		return false;
	}

	return (
		<cartContext.Provider
			value={{
				addProductToCart,
				removeProductFromCart,
				cartProductsCount,
				isProductInUserCart,
				updateProductCount,
				cartProducts,
				totalCartPrice,
				clearUserCart,
				existCart,
				cartId,
			}}
		>
			{children}
		</cartContext.Provider>
	);
}
