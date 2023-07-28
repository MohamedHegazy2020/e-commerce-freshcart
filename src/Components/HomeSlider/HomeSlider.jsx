import React from "react";
import Slider from "react-slick";

export default function HomeSlider() {
	const settings = {
		dots: true,
		infinite: true,
		slidesToShow: 1,
		slidesToScroll: 1,
		autoplay: true,
		speed: 4000,
		autoplaySpeed: 3000,
		cssEase: "linear",
	};
	return (
		<>
			<Slider {...settings}>
				<div>
					<img
						src={require("../../Assets/homeSlider_black_friday_facebook_banner_02.png")}
						alt=""
						className="w-100"
						style={{ maxHeight: "450px" }}
					/>
				</div>

				<div>
					<img
						src={require("../../Assets/homeSlider2.jpg")}
						alt=""
						className="w-100"
						style={{ maxHeight: "450px" }}
					/>
				</div>
				<div>
					<img
						src={require("../../Assets/homeSlider3.jpg")}
						alt=""
						className="w-100"
						style={{ maxHeight: "450px" }}
					/>
				</div>
				<div>
					<img
						src={require("../../Assets/homeSlider4.jpg")}
						alt=""
						className="w-100"
						style={{ maxHeight: "450px" }}
					/>
				</div>
				<div>
					<img
						src={require("../../Assets/homeSlider5.jpg")}
						alt=""
						className="w-100"
						style={{ maxHeight: "450px" }}
					/>
				</div>
				<div>
					<img
						src={require("../../Assets/homeSlider6.jpg")}
						alt=""
						className="w-100"
						style={{ maxHeight: "450px" }}
					/>
				</div>
			</Slider>
		</>
	);
}
