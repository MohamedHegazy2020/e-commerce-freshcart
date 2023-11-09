import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import { useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useEffect } from "react";
import Loading from "../Loading/Loading";
import { Helmet } from "react-helmet";

export default function BrandProducts() {
	const { id } = useParams();

	const [brandProducts, setbrandProducts] = useState(null);
	const [brand, setbrand] = useState(null);
	useEffect(() => {
		// getAllBrandProducts();
		if(!brandProducts){


		getAllBrandProducts();

		}
		if(!brand){

			getBrandDetails();
		}
	});
	async function getBrandDetails() {
		try {
			const { data } = await axios.get(
				`https://ecommerce.routemisr.com/api/v1/brands/${id}`,
			);
			setbrand(data.data);
		} catch (error) {
			console.log(error);
		}
	}
	// console.log({ brand });

	async function getAllBrandProducts() {
		try {
			const { data } = await axios.get(
				"https://ecommerce.routemisr.com/api/v1/products",
				{ params: { brand: id } }
			);
			setbrandProducts(data.data);
		} catch (error) {
			console.log(error);
		}
	}
	// console.log(brandProducts);
	return (
		<>
		{brand?<Helmet>
				<title>{brand.name}</title>
			</Helmet>:''}
			
			<div className="container" style={{ minHeight: "50vh" }}>
				{brandProducts ? (
					<div className="row py-5 g-3">
						{brandProducts.length ? (
							brandProducts.map((product, idx) => {
								return <ProductCard key={idx} product={product} />;
							})
						) : (
							<h3 className="text-center text-capitalize ">
								no products Available to this brand now
							</h3>
						)}
					</div>
				) : (
					<Loading/>
				)}
			</div>
		</>
	);
}
