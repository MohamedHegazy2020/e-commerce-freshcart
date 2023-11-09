import React, { useEffect, useState } from "react";
import { useContext } from "react";
import { cartContext } from "../../Context/cartContext";
import Loading from "./../Loading/Loading";
import axios from "axios";
import { Helmet } from "react-helmet";
export default function Profile({ currUser }) {
	const { cartProductsCount } = useContext(cartContext);

	const [userOrder, setuserOrder] = useState(null);
	useEffect(() => {
		if (!userOrder) {
			getUserOrder(currUser.id);
		}
	});

	async function getUserOrder(UserId) {
		try {
			const { data } = await axios.get(
				`https://ecommerce.routemisr.com/api/v1/orders/user/${UserId}`
			);

			setuserOrder(data);
		} catch (error) {
			console.log("error", error);
		}
	}
	console.log(userOrder);
	return (
		<><Helmet>
		<title>{currUser.name.charAt(0).toUpperCase()+ currUser.name.slice(1) + ' Profile'}</title>
	</Helmet>
			{userOrder ? (
				<>
					<section className="vh-100">
						<div className="container py-5 h-100">
							<div className="row d-flex justify-content-center align-items-center h-100">
								<div className="col col-md-9 col-lg-7 col-xl-5">
									<div className="card" style={{ borderRadius: "15px" }}>
										<div className="card-body p-4">
											<div className="d-flex text-black">
												<div className="flex-shrink-0">
													<i className="fa-solid fa-circle-user fa-xl"></i>
												</div>
												<div className="flex-grow-1 ms-3">
													<h5 className="mb-1"> Name: {currUser.name}</h5>
													<h5 className="mb-1"> Role: {currUser.role}</h5>
													{userOrder ? (
														<>
															<h5 className="mb-1">
																{" "}
																Email: {userOrder[0].user.email}
															</h5>
															<h5 className="mb-1">
																{" "}
																Phone: {userOrder[0].user.phone}
															</h5>
														</>
													) : (
														""
													)}

													<div
														className="d-flex justify-content-start rounded-3 p-2 mb-2"
														style={{ backgroundColor: "#efefef" }}
													>
														<div className="col-md-6">
															<p className="small text-muted mb-1">
																cart product count
															</p>
															<p className="mb-0">{cartProductsCount}</p>
														</div>
														<div className="border-start ps-2 ms-2 col-md-6">
															<p className="small text-muted mb-1 ">
																user order count
															</p>
															<div className="d-flex justify-content-between pe-2">
																<p className="mb-0">{userOrder.length}</p>
																<span class="badge bg-primary">
																	{userOrder[0].paymentMethodType}
																</span>
															</div>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</section>
				</>
			) : (
				<Loading />
			)}
		</>
	);
}
