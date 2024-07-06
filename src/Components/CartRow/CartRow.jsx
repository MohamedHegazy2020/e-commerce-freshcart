import React, { useState } from "react";
import { useContext } from "react";
import { cartContext } from "../../Context/cartContext";
import detail from "../ProdDetails/prodDetails.module.css";

export default function CartRow({ product }) {
  const { removeProductFromCart, updateProductCount } = useContext(cartContext);
  const [counter, setcounter] = useState(product.count);
  let count = counter;
  console.log(product);
  return (
    <>
      <div className="col-md-3 p-2" title={product.product.title}>
        <div class="card text-start ">
          <img
            class="card-img-top"
            src={product.product.imageCover}
            alt={product.product.title}
          />
          <div class="card-body border-top">
            <h6 class="card-title text-truncate">{product.product.title}</h6>
            <div className="mb-4 ">
              <div className="d-flex justify-content-between">
                <button
                  className="btn btn-outline-secondary  "
                  onClick={() => {
                    if (count > 1) {
                      updateProductCount(product.product._id, counter - 1);
                      setcounter(count - 1);
                    }
                  }}
                >
                  -
                </button>

                <input
                  type="number"
                  name=""
                  id="count"
                  min={1}
                  onChange={(e) => {
                    if (counter !== e.target.value) {
                      setcounter(e.target.value);
                    }
                  }}
                  value={counter}
                  className={"form-control-sm " + detail.form_input}
                />
                <button
                  className="btn btn-outline-secondary  "
                  onClick={() => {
                    setcounter(count + 1);
                    updateProductCount(product.product._id, counter + 1);
                  }}
                >
                  +
                </button>
              </div>
            </div>
            <div>
              <p className="text-capitalize">
                price / piece :{" "}
                <span className="fw-bold">{product.price} </span>
              </p>
            </div>
            <div>
              <button
                type="button"
                className="btn btn-danger w-100 "
                onClick={() => {
                  removeProductFromCart(product.product._id);
                }}
              >
                <i className="fa-solid fa-trash-can me-1"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
