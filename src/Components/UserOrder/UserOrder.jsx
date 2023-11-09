import axios from "axios";
import { useFormik } from "formik";
import React from "react";
import { useContext } from "react";
import { cartContext } from "../../Context/cartContext";
import { Helmet } from 'react-helmet';

export default function UserOrder() {
const{cartId} = useContext(cartContext)





	async function createCashOrder(values, cartId) {
		try {
			const { data } = await axios.post(
				`https://ecommerce.routemisr.com/api/v1/orders/${cartId}`,
				{ shippingAddress:values },
				{ headers: { token: localStorage.getItem("token") } }
			);
			console.log(data);
		} catch (error) {
			console.log(error);
		}
	}

	const formik = useFormik({
		initialValues: {
			 
				details: "",
				phone: "",
				city: "",
			
		},
		onSubmit: (values) => {
			createCashOrder( values ,cartId);
		},
		validate: (values) => {
			// validate function
			let errors = {};
            if (!values.city) {
				errors.city = "* city is required ";
            }
			if (!values.phone.match(/^(02)?01[0125][0-9]{8}$/)) {
				errors.phone = "* phone must be valid ";
			}

			return errors;
		},
	});

	return (
		<>
		<Helmet>
				<title>Order</title>
			</Helmet>
			<div className="container py-5">
				<div className="row justify-content-center">
                <div className="col-md-6">
                <div className="bg-light p-4 rounded-3 bg-opacity-75 shadow">
					<h2 className="text-center text-capitalize fw-bold"> Cash Order</h2>
					<form action="" onSubmit={formik.handleSubmit}>
						<div className="form-floating mt-3">
							<textarea
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.details}
								type="details"
								className="form-control"
								id="details"
								placeholder="details"
							/>
							<label className="" htmlFor="details">
								details
							</label>
						</div>
						

						<div className="form-floating mt-3">
							<input
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.phone}
								type="phone"
								className="form-control"
								id="phone"
								placeholder="phone"
							/>
							<label className="" htmlFor="phone">
								phone
							</label>
						</div>
                        {formik.touched.phone && formik.errors.phone ? (
							<div className="text-danger mt-1 text-capitalize">
								{formik.errors.phone}
							</div>
						) : (
							""
						)}
						<div className="form-floating mt-3">
							<input
								onBlur={formik.handleBlur}
								onChange={formik.handleChange}
								value={formik.values.city}
								type="city"
								className="form-control"
								id="city"
								placeholder="city"
							/>
							<label className="" htmlFor="city">
								city
							</label>
						</div>
						{formik.touched.city && formik.errors.city ? (
							<div className="text-danger mt-1 text-capitalize">
								{formik.errors.city}
							</div>
						) : (
							""
						)}
						<button
							className="btn btn-outline-primary w-100 mt-3 text-capitalize fw-bold"
							type="submit"
						>
							{" "}
							Shipping Now!
						</button>
					</form>
					<div className="mt-3 text-center ">
						<div className="alert alert-warning" role="alert">
							<i className="fa-solid fa-circle-exclamation"></i>{" "}
							<strong>Alert </strong> credit card payment is under mantiance
						</div>
					</div>
				</div>
                </div>
                </div>
			</div>
		</>
	);
}
