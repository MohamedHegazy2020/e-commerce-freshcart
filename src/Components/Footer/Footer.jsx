import React from "react";

export default function Footer() {
  return (
    <>
      <footer className="p-3 p-md-5 position-relative ">
        <h2>fresh cart footer</h2>
        <p>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium,
          omnis.
        </p>
        <div className="container-fluid d-flex justify-content-center align-items-between py-4 ">
          <input type="text" className="form-control w-75 me-auto " />
          <button className="btn btn-success btn-lg ms-auto text-capitalize">
            {" "}
            share app link
          </button>
        </div>
        <div className="container-fluid ">
          <div className="row py-3 border-top border-bottom border-1 border-dark justify-content-between align-items-center">
            <div className="leftPart col-md-4 ">
              <ul className="list-unstyled d-flex m-0 ">
                <li className="">
                  <h6 className="text-capitalize">payment partner: </h6>
                </li>

                <li className="ms-2">
                  <i className="fa-brands fa-paypal text-primary"></i>
                </li>
                <li className="ms-2">
                  <i className="fa-brands fa-amazon-pay text-primary"></i>
                </li>
                <li className="ms-2">
                  <i className="fa-brands fa-cc-mastercard text-primary"></i>
                </li>
              </ul>
            </div>
            <div className="rightPart col-md-6 d-flex align-items-center">
              <h6 className="text-capitalize  ">
                Get deliveries with freshCart
              </h6>

              <button className="btn btn-dark mx-3">
                <span className="me-1">
                  <i className="fa-brands fa-app-store "></i>
                </span>
                available on app store
              </button>
              <button className="btn btn-dark  ">
                <span className="me-1">
                  <i className="fa-brands fa-google-play "></i>
                </span>
                get it from google play
              </button>
            </div>
          </div>
        </div>

 
       
      </footer>
    </>
  );
}
