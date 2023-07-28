import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../Loading/Loading";
import { Link, useParams } from "react-router-dom";
import detail from "./prodDetails.module.css";
import DetailSlider from "../DetailSlider/DetailSlider";
import { useContext } from "react";
import { cartContext } from "../../Context/cartContext";
// import { useFormik } from "formik";
export default function ProdDetails() {
	// const formik = useFormik({initialValues:{count:1}})

	const {
		addProductToCart,
		isProductInUserCart,
		removeProductFromCart,
		updateProductCount,
	} = useContext(cartContext);

	const { id } = useParams();

	async function getProdDetails() {
		try {
			const { data } = await axios.get(
				`https://ecommerce.routemisr.com/api/v1/products/${id}`
			);
			setprodDetails(data.data);

			// console.log(data);
		} catch (error) {
			console.log(error);
		}
	}

	const [prodDetails, setprodDetails] = useState(null);

	const [counter, setcounter] = useState(1);
	let count = counter;

	useEffect(() => {
		if (prodDetails == null) {
			getProdDetails();
		}
	});

	return (
		<>
			{prodDetails ? (
				<div className="container py-5">
					<div className="row">
						<div className="col-md-4">
							<div className="position-relative">
								{prodDetails.priceAfterDiscount ? (
									<div
										className="position-absolute top-0 start-0 ms-3 mt-3 p-0"
										style={{ zIndex: "2222222" }}
									>
										<span
											className="fa-layers     text-center fw-bold"
											style={{ fontSize: "4rem" }}
										>
											<i className="fa-solid fa-certificate text-danger"></i>
											<span
												className="fa-layers-text fa-inverse text-capitalize text-center"
												data-fa-transform="shrink-11.5 rotate--45  "
												style={{ fontSize: "3rem" }}
											>
												{`sale
                        -` +
													(
														100 -
														(prodDetails.priceAfterDiscount /
															prodDetails.price) *
															100
													).toFixed(1) +
													"%"}
											</span>
										</span>
									</div>
								) : (
									""
								)}
								<div className="my-5 poistion-relative">
									<DetailSlider imgs={prodDetails.images} />
								</div>
							</div>
						</div>

						<div className="col-md-8">
							<Link className="mb-4 d-block">{prodDetails.category.slug}</Link>
							<h2 className="mb-1 h1">{prodDetails.title}</h2>
							<div className="mb-4 fs-5 ">
								<span className="badge bg-warning my-1 p-2  me-1 ">
									<i className="fa-solid fa-star me-1"></i>
									{prodDetails.ratingsAverage}
								</span>
								( {prodDetails.ratingsQuantity + " reviews"})
							</div>
							<div className="fs-4">
								{prodDetails.priceAfterDiscount ? (
									<>
										<span className="text-decoration-line-through text-black-50 ">
											${prodDetails.price}
										</span>
										<span className="ms-1">
											<i className="fa-solid fa-arrow-right "></i> $
											{prodDetails.priceAfterDiscount}
										</span>
									</>
								) : (
									<>
										<span>${prodDetails.price}</span>
									</>
								)}
							</div>
							<hr className="my-6" />
							{isProductInUserCart(prodDetails._id) ? (
								<div>
									{/* product count*/}
									<div className="mb-4">
										<button
											className="btn btn-outline-secondary  "
											onClick={() => {
												if (count > 1) {
													updateProductCount(prodDetails.id, counter - 1);
													setcounter(count - 1);
												}
											}}
										>
											-
										</button>
										{/* <!-- input --> */}

										<input
											type="number"
											name=""
											id="count"
											min={1}
											onChange={(e) => {
												if (counter !== e.target.value) {
													setcounter(e.target.value);
												}
											}}
											value={counter}
											className={"form-control-sm " + detail.form_input}
										/>
										<button
											className="btn btn-outline-secondary  "
											onClick={() => {
												setcounter(count + 1);
												updateProductCount(prodDetails.id, counter + 1);
											}}
										>
											+
										</button>
									</div>
								</div>
							) : (
								""
							)}

							<div className="mt-3 row justify-content-start g-2 align-items-center">
								<div className="col-lg-4 col-md-5 col-6 d-grid">
									{/* <!-- button --> */}
									{/* <!-- btn --> */}
									<button
										type="button"
										className="btn btn-success "
										onClick={() => {
											addProductToCart(prodDetails.id);
										}}
									>
										<i className="fa-solid fa-cart-plus me-1"> </i>Add to cart
									</button>
								</div>

								{isProductInUserCart(prodDetails.id) ? (
									<div className="col-lg-4 col-md-5 col-6 d-grid">
										{/* <!-- button --> */}
										{/* <!-- btn --> */}
										<button
											type="button"
											className="btn btn-danger "
											onClick={() => {
												removeProductFromCart(prodDetails.id);
											}}
										>
											<i class="fa-solid fa-trash-can me-1"></i>Remove from cart
										</button>
									</div>
								) : (
									""
								)}
								
							</div>
							<hr className="my-6" />
							<div>
								<table className="table table-borderless">
									<tbody>
										<tr>
											<td className="w-25">Product Code:</td>
											<td>{prodDetails.id}</td>
										</tr>
										<tr>
											<td className="w-25">Description:</td>
											<td>{prodDetails.description}</td>
										</tr>
										<tr>
											<td className="w-25">Availability:</td>
											<td>{prodDetails.quantity}</td>
										</tr>
										<tr>
											<td>Sold:</td>
											<td>{prodDetails.sold}</td>
										</tr>
										<tr>
											<td className="w-25">Type:</td>
											<td>
												{prodDetails.subcategory.map((subCategory, id) => {
													return subCategory.name;
												})}{" "}
											</td>
										</tr>
									</tbody>
								</table>
							</div>
						</div>
					</div>
				</div>
			) : (
				<Loading />
			)}
		</>
	);
}
