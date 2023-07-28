import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import $ from "jquery";
import detSlider from "./detailSlider.module.css";
export default function DetailSlider({ imgs }) {
	function setActiveDot(elem) {
		const li = $(`.slick-dots`).children().children().children().children();
		// console.log(li[0].classList.contains(`${detSlider.active_dot}`));
		if (!li[0].classList.contains(`${detSlider.active_dot}`)) {
			$(li[0]).addClass(`${detSlider.active_dot}`);
		}
		$(`.${detSlider.active_dot}`).removeClass(`${detSlider.active_dot}`);
		$(elem).addClass(`${detSlider.active_dot}`);
	}

	const settings = {
		dots: true,
		infinite: true,
		speed: 500,
		slidesToShow: 1,
		slidesToScroll: 1,
		appendDots: (dots) => (
			<div style={{ position: "relative", bottom: "0" }}>
				<ul
					className="d-flex justify-content-evenly position-absolute  start-0 end-0  my-3 list-unstyled "
					style={{ padding: "0" }}
				>
					{" "}
					{dots}{" "}
				</ul>
			</div>
		),
		customPaging: (i) => {
			let img = imgs.filter((img, id) => {
				return id === i;
			});
			return (
				<div
					className={"mb-5"}
					style={{
						width: "30px",
					}}
				>
					<img
						src={img}
						alt=""
						className={
							i === 0 ? detSlider.active_dot + " img-fluid" : "img-fluid"
						}
						onClick={(e) => {
							setActiveDot(e.target);
						}}
					/>
				</div>
			);
		},
	};

	return (
		<>
			<div>
				<Slider {...settings}>
					{imgs.map((img) => {
						return (
							<img
								src={img}
								key={img}
								className="img-fluid rounded-top"
								alt=""
							/>
						);
					})}
				</Slider>
			</div>
		</>
	);
}
