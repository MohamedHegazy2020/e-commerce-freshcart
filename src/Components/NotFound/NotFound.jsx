import React from "react";
import error from "../../Assets/Monster 404 Error.gif";

export default function NotFound() {
  return (
    <>
      <div className="my-5 text-center container ">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <img src={error} className="w-100" alt="not found " />
            <h2 className=" text-capitalize text-success"> not found</h2>
          </div>
        </div>
      </div>
    </>
  );
}
