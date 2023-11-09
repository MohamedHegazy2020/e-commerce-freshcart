import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";
import logo from "../../Assets/freshcart-logo.svg";
import { useContext } from "react";
import { cartContext } from "../../Context/cartContext";
export default function Navbar({ currUser, clearUserData }) {
	// const navigate = useNavigate();
	const { cartProductsCount } = useContext(cartContext);

	function setAtiveNavItem(elem) {
		$(".nav-link").removeClass("active");
		$(elem).addClass("active");
	} // setcartProductsCount(null)
	// navi;

	return (
		<>
			<nav className="navbar navbar-expand-md navbar-light shadow">
				<div className="container-fluid">
					<Link className="navbar-brand" to="/">
						<img src={logo} alt="" />
					</Link>
					<button
						className="navbar-toggler d-lg-none"
						type="button"
						data-bs-toggle="collapse"
						data-bs-target="#collapsibleNavId"
						aria-controls="collapsibleNavId"
						aria-expanded="false"
						aria-label="Toggle navigation"
					>
						<span className="navbar-toggler-icon"></span>
					</button>
					<div className="collapse navbar-collapse" id="collapsibleNavId">
						<ul className="navbar-nav me-auto mt-2 mt-lg-0">
							<li className="nav-item">
								<Link
									className="nav-link text-capitalize active "
									onClick={(e) => {
										setAtiveNavItem(e.target);
									}}
									to="/home"
								>
									Home
								</Link>
							</li>
							<li className="nav-item">
								<Link
									className="nav-link text-capitalize "
									onClick={(e) => {
										setAtiveNavItem(e.target);
									}}
									to="/brands"
								>
									brands
								</Link>
							</li>
						</ul>

						{/* <ul className="navbar-nav  mt-2 mt-lg-0"> */}
							{/* <li>helo</li> */}
							{currUser ? (
								<>
									<ul className="navbar-nav  mt-2 mt-lg-0">
									<li className="nav-item">
										<Link
											className="nav-link text-capitalize "
											onClick={(e) => {
												setAtiveNavItem(e.target);
											}}
											to="/cart"
										>
											<span className="fa-layers fa-fw fa-xl">
												<i className="fa-solid fa-cart-shopping"></i>
												{cartProductsCount ? (
													<div>
														<span
															className="fa-layers-counter    fa-1x  "
															style={{ top: "-5px", right: "-5px" }}
														>
															<span className="fa-2x p-1">
																{cartProductsCount}
															</span>
														</span>
													</div>
												) : (
													""
												)}
											</span>
										</Link>
									</li>
									<li className="nav-item">
										<Link
											className="nav-link text-capitalize "
											onClick={(e) => {
												setAtiveNavItem(e.target);
											}}
											to="/profile"
										>
											<i className="fa-solid fa-circle-user fa-xl"></i>
										</Link>
									</li>{" "}
									<li className="nav-item">
										<Link
											to={"/login"}
											className="nav-link text-capitalize "
											onClick={() => {
												clearUserData();
											}}
										>
											logout
										</Link>
									</li>
									</ul>
								</>
							) : (
								<>
									<ul className="navbar-nav  mt-2 mt-lg-0">
									<li className="nav-item">
										<Link
											className="nav-link text-capitalize "
											onClick={(e) => {
												setAtiveNavItem(e.target);
											}}
											to="/login"
										>
											log in
										</Link>
									</li>{" "}
									<li className="nav-item">
										<Link
											className="nav-link text-capitalize "
											onClick={(e) => {
												setAtiveNavItem(e.target);
											}}
											to="/Register"
										>
											Register
										</Link>
									</li>
									</ul>
								</>
							)}
						{/* </ul> */}
					</div>
				</div>
			</nav>
		</>
	);
}
