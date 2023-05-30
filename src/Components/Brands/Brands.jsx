import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import Loading from "../Loading/Loading";

export default function Brands() {
  const [allBrands, setallBrands] = useState(null);
  async function getAllBrands() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/brands"
      );
      // console.log(data);
      setallBrands(data.data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (allBrands == null) {
      getAllBrands();
    }
  });

  return (
    <>
      <div className="container py-5">


        {allBrands? <div className="row align-items-center">
          <div className="col-md-3  ">
            <div className="title">
              <div>
                <h3>Our Brands</h3>
                <p>
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                  Dolorem, illum?
                </p>
              </div>
            </div>
          </div>

          {
             allBrands.map((brand, idx) => {
                return (
                  <div className="col-md-3" key={idx}>
                    <div className="brand ">
                      <img
                        src={brand.image}
                        alt={brand.name}
                        className="img-fluid pointer"
                      />
                      <h6 className="text-center text-primary text-capitalize">
                        {brand.name}
                      </h6>
                    </div>
                  </div>
                );
              })
            }
        </div>:<Loading/>}
       
      </div>
    </>
  );
}
