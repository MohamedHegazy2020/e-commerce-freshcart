import { useFormik } from "formik";
import React from "react";
import $ from "jquery";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

export default function Login({ getUserData }) {
	function displayWelcomeUserToast() {
		$(".toast-container")
			.append(`<div class="toast align-items-center  text-bg-success border-0 welUser"  role="alert" aria-live="assertive" aria-atomic="true">
				<div class="toast-body">
				 Welcome Back 
				</div>
			      </div> `);

		$(`.welUser`).fadeIn(1000, () => {
			setTimeout(() => {
				$(`.welUser`).fadeOut(1000, () => {
					$(`.welUser`).remove()
				});

			}, 3000); 
		});
	}
	function displayErrUserToast(message) {
		$(".toast-container")
			.append(`<div class="toast align-items-center  text-bg-danger border-0 errUser"  role="alert" aria-live="assertive" aria-atomic="true">
				<div class="toast-body">
				${message}
				</div>
			      </div> `);

		$(`.errUser`).fadeIn(1000, () => {
			console.log('hhhhh');
			setTimeout(() => {
				$(`.errUser`).fadeOut(1000, () => {
					$(`.errUser`).remove()
				});

			}, 3000); 
		});
	}

	const navigate = useNavigate();

	async function logInNewUser(userData) {
		try {
			const { data } = await axios.post(
				"https://ecommerce.routemisr.com/api/v1/auth/signin",
				userData
			);

			if (data.message === "success") {
				// console.log("succ");
				localStorage.setItem("token", data.token);
				displayWelcomeUserToast()
				getUserData();
				navigate("/");
			}
			//       console.log(data);
		} catch (error) {
			//       console.log(error.response.data.message);
			displayErrUserToast(error.response.data.message)
			
		}
	}

	const formik = useFormik({
		initialValues: {
			email: "",
			password: "",
		},
		onSubmit: (values) => {
			logInNewUser(values);
		},
		validate: (values) => {
			// validate function
			let errors = {};

			if (!values.email.match(/[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z0-9]{2,}/gim)) {
				errors.email = "* email must be valid ";
			}

			if (values.password.length < 6 || values.password.length > 12) {
				errors.password = " * password must be from 6 to 12 digit only  ";
			}

			return errors;
		},
	});

	return (
		<>
		<Helmet>
				<title>Log in</title>
			</Helmet>
			<div className="container py-5">
				<div className="row justify-content-center">
					<div className="col-md-6">
						<div className="bg-light p-4 rounded-3 bg-opacity-75 shadow">
							<h2 className="text-center text-capitalize fw-bold"> log in</h2>
							<form action="" onSubmit={formik.handleSubmit}>
								<div className="form-floating mt-3">
									<input
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										value={formik.values.email}
										type="email"
										className="form-control"
										id="email"
										placeholder="email"
									/>
									<label className="" htmlFor="email">
										email
									</label>
								</div>
								{formik.touched.email && formik.errors.email ? (
									<div className="text-danger mt-1 text-capitalize">
										{formik.errors.email}
									</div>
								) : (
									""
								)}

								<div className="form-floating mt-3">
									<input
										onBlur={formik.handleBlur}
										onChange={formik.handleChange}
										value={formik.values.password}
										type="password"
										className="form-control"
										id="password"
										placeholder="password"
									/>
									<label className="" htmlFor="password">
										password
									</label>
								</div>
								{formik.touched.password && formik.errors.password ? (
									<div className="text-danger mt-1 text-capitalize">
										{formik.errors.password}
									</div>
								) : (
									""
								)}

								<button
									className="btn btn-outline-primary w-100 mt-3 text-capitalize fw-bold"
									type="submit"
								>
									{" "}
									log in
								</button>
							</form>
							<div className="mt-3 text-center ">
								<p>
									don't hava an account {">"}{" "}
									<Link to={"/register"}>sign up</Link>{" "}
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
