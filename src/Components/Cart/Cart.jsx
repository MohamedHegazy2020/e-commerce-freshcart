import React, { useContext } from "react";
import CartRow from "../CartRow/CartRow";
import { cartContext } from "../../Context/cartContext";
import Loading from "../Loading/Loading";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";


export default function Cart({ currUser }) {
	const {
		cartProducts,
		totalCartPrice,
		cartProductsCount,
		clearUserCart,
		existCart,
	} = useContext(cartContext);

	return (
		<>
			<Helmet>
				<title>Cart</title>
			</Helmet>
			{existCart && cartProductsCount ? (
				<>
					{cartProducts ? (
						<div className="container py-5">
							<h2 className="text-capitalize text-center">
								{currUser.name} <span>Cart</span>
							</h2>
							<div className="row px-2 mt-3 justify-content-between  ">
								<div className="col-md-6">
									<h5 className="text-capitalize text-md-start  text-center ">
										total Products count:{" "}
										<span className="ms-2">{cartProductsCount}</span>
									</h5>
								</div>
								<div className="col-md-6 text-md-end text-center  ">
									<button
										type="button"
										className="btn btn-danger ms-auto"
										onClick={() => {
											clearUserCart();
										}}
									>
										<i className="fa-solid fa-trash-can me-1"></i>Remove from
										cart
									</button>
								</div>
							</div>

							<div className="row my-3 ">
								{cartProducts.map((product ,i)=><>
								
							<CartRow key={i} product={product}/>
								</>)}
								
								<div className="row px-2 ">
									<div className="col-md-6">
										<div className="totalPrice text-capitalize">
											<h5>
												total cart price :
												<span className="ms-2">{"$" + totalCartPrice}</span>
											</h5>
										</div>
									</div>
									<div className="col-md-6">
										<div className=" text-end">
											<Link to={"/cashOrder"}>
												<button className="btn btn-primary  ">
													{" "}
													create new order
												</button>
											</Link>
										</div>
									</div>
								</div>
							</div>
						</div>
					) : (
						<>
							<Loading />
						</>
					)}
				</>
			) : (
				<div className="container py-5 ">
					<h2 className="text-capitalize text-center">
						there is no cart for {currUser.name}
					</h2>

					<div className="text-center">
						<img Loading='lazy'
							className="w-25"
							src={require("../../Assets/no-shopping-cart.png")}
							alt=""
						/>
					</div>
				</div>
			)}
		</>
	);
}
