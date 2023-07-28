import React, { useContext } from "react";
import card from "./productCard.module.css";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../../Context/cartContext";

export default function ProductCard({ product }) {
	const navigate = useNavigate();

	function displayProdDetails(id) {
		navigate(`/prodDetails/${id}`);
	}
	const { addProductToCart } =
		useContext(cartContext);

	

	return (
		<>
			<div
				className="col-md-2 text-decoration-none text-black"
				// to={"/prodDetails/" + product.id}
			>
				<div>
					<div className={card.card + " card bg-light"}>
						<div className={"position-relative " + card.card_upper}>
							<img className="card-img" src={product.imageCover} alt="Title" />
							<div className={card.overlay}>
								<div
									className={card.ico_container + "  rounded-2 me-1 "}
									onClick={() => {
										displayProdDetails(product.id);
									}}
								>
									<i className="fa-regular  fa-eye"></i>
								</div>

								
								<div
										className={card.ico_container + " rounded-2 me-1 "}
										onClick={() => {
											addProductToCart(product.id);
										}}
									>
										<i className="fa-solid fa-cart-plus"></i>
									</div>
							</div>
						</div>

						<div className="card-img-overlay  ">
							{product.priceAfterDiscount ? (
								<span
									className="fa-layers     text-center fw-bold"
									style={{ fontSize: "3rem" }}
								>
									<i className="fa-solid fa-certificate text-danger"></i>
									<span
										className="fa-layers-text fa-inverse text-capitalize text-center"
										data-fa-transform="shrink-11.5 rotate--45  "
										style={{ fontSize: "2rem" }}
									>
										{`sale
                        -` +
											(
												100 -
												(product.priceAfterDiscount / product.price) * 100
											).toFixed(1) +
											"%"}
									</span>
								</span>
							) : (
								""
							)}
						</div>
						<div className="">
							<div className="card-body position-relative">
								<p className="small text-black-50">{product.category.slug}</p>
								<h6 className="card-title text-black">
									{product.title.slice(0, product.title.indexOf(" ", 10))}
								</h6>
								{/* <p className="card-text fs-6 text-black-50 ">description : {product.description}</p> */}

								<p className="text-black-50">
									<span className="badge bg-warning my-1 me-1 ">
										{" "}
										<i className="fa-solid fa-star"></i>{" "}
										{product.ratingsAverage}
									</span>
									( {product.ratingsQuantity})
								</p>
								<h6>
									{product.priceAfterDiscount ? (
										<>
											<span className="text-decoration-line-through text-black-50 ">
												${product.price}
											</span>
											<span className="ms-1">
												<i className="fa-solid fa-arrow-right "></i> $
												{product.priceAfterDiscount}
											</span>
										</>
									) : (
										<>
											<span>${product.price}</span>
										</>
									)}
								</h6>
								{/* <h6>available quantity : {product.quantity}</h6>
              <h6>sold quantity : {product.sold}</h6> */}
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
