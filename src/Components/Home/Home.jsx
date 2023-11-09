import React, { useEffect, useState } from "react";
import ProductCard from "../ProductCard/ProductCard";
import axios from "axios";
import Loading from "../Loading/Loading";
import HomeSlider from "../HomeSlider/HomeSlider";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import * as $ from "jquery";

export default function Home() {
	async function getAllProducts() {
		try {
			const { data } = await axios.get(
				"https://ecommerce.routemisr.com/api/v1/products",
				{ params: { page: currPage } }
			);

			console.log(data);
			setAllProducts(data.data);
			setcurrPage(data.metadata.currentPage);
			// setNextPage(data.metadata.nextPage);
			// setPrevPage(data.metadata.prevPage);
			setNoOfPages(data.metadata.numberOfPages);
		} catch (error) {
			console.log(error);
		}
	}

	const [allProducts, setAllProducts] = useState(null);
	const [currPage, setcurrPage] = useState(1);
	// const [nextPage, setNextPage] = useState(null);
	// const [prevPage, setPrevPage] = useState(null);
	const [noOfPages, setNoOfPages] = useState(null);
	// console.log(currPage);

	function setActivePage(e) {
		$(".page-link").removeClass("active");
		$(e).addClass("active");
		setcurrPage($(e).text());
		setAllProducts(null);
	}

	const allPages = [];

	for (let index = 1; index <= noOfPages; index++) {
		allPages.push(index);
	}
	useEffect(() => {
		if (!allProducts) {
			getAllProducts();
		}
	});

	return (
		<>
			<Helmet>
				<title>FreshCart</title>
			</Helmet>
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
				{noOfPages > 1 ? (
					<div className="d-flex align-item-center justify-content-center">
						<ul className="pagination bg-transparent pagination-lg ">
							{allPages.map((page) => {
								return (
									<li className="page-item" key={page}>
										<Link
											className={"page-link "}
											onClick={(e) => {
												setActivePage(e.target);
											}}
										>
											{page}
										</Link>
									</li>
								);
							})}
						</ul>
					</div>
				) : (
					""
				)}
			</div>
		</>
	);
}
