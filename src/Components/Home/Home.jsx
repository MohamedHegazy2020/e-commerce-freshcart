import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import Loading from "../Loading/Loading";
import HomeSlider from "../HomeSlider/HomeSlider";

export default function Home() {
	async function getAllProducts() {
		try {
			const { data } = await axios.get(
				"https://ecommerce.routemisr.com/api/v1/products"
			);

			// console.log(data);
			setAllProducts(data.data);
		} catch (error) {
			console.log(error);
		}
	}

	const [allProducts, setAllProducts] = useState(null);

	useEffect(() => {
		if (allProducts == null) {
			getAllProducts();
		}
	});

	return (
		<>
			<div className="container">
				<div className="pt-5 ">
					<HomeSlider />
				</div>

				<div className="row g-3 py-5">
					{allProducts ? (
						allProducts.map((product, idx) => {
							return <ProductCard product={product} key={idx} />;
						})
					) : (
						<Loading />
					)}
				</div>
			</div>
		</>
	);
}
