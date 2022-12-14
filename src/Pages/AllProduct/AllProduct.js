import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { AuthContext } from "../../contexts/AuthProvider/AuthProvider";
import useTitle from "../../hooks/useTitle";
import AllProductDetails from "./AllProductDetails";

const AllProduct = () => {
  useTitle("AllProduct");
  const { data: allProduct = [] } = useQuery({
    queryKey: ["AllProduct"],
    queryFn: () =>
      fetch(`${process.env.REACT_APP_API}/AllProduct`).then((res) =>
        res.json()
      ),
  });
  const { loading } = useContext(AuthContext);
  if (loading) {
    return (
      <div className="text-center m-56">
        <button className="btn btn-square loading"></button>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center text-4xl mt-5">
        <h3>Resale Phone</h3>
        <hr className="w-56 mx-auto" />
        <h3 className="mt-5">Total Product: {allProduct?.length}</h3>
        <hr className="w-36 mx-auto" />
      </div>
      {allProduct?.map((product) => (
        <AllProductDetails
          key={product._id}
          product={product}
        ></AllProductDetails>
      ))}
    </div>
  );
};

export default AllProduct;
