import React, { useState } from "react";
import { useContext } from "react";
import { cartContext } from "../../Context/cartContext";
import detail from "../ProdDetails/prodDetails.module.css";

export default function CartRow({ product }) {
	const { removeProductFromCart, updateProductCount } = useContext(cartContext);
	const [counter, setcounter] = useState(product.count);
	let count = counter;

	return (
		<>
			<tr className="">
				<td>
					{" "}
					<div className="">
						<img
							src={product.product.imageCover}
							style={{ maxHeight: "70px" }}
							alt={product.product.title}
						/>{" "}
						<h6 className="text-muted">{product.product.title}</h6>
					</div>
				</td>
				<td>
					<div className="mb-4">
						<button
							className="btn btn-outline-secondary  "
							onClick={() => {
								if (count > 1) {
									updateProductCount(product.product._id, counter - 1);
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
								updateProductCount(product.product._id, counter + 1);
							}}
						>
							+
						</button>
					</div>
				</td>
				<td>
					<div className="col-lg-4 col-md-5 col-6 d-grid">
						{/* <!-- button --> */}
						{/* <!-- btn --> */}
						<button
							type="button"
							className="btn btn-danger "
							onClick={() => {
								removeProductFromCart(product.product._id);
							}}
						>
							<i className="fa-solid fa-trash-can me-1"></i>
						</button>
					</div>
				</td>
				<td>{"$" + product.price}</td>
			</tr>
		</>
	);
}
