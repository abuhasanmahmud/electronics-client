import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { productFeatching } from "../../app/feature/productSlice";
import Loading from "../../sharied/Loading/Loading";
import ProductCard from "./../Product/ProductCard";

const FeatureProduct = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.products);

  // console.log(products, isLoading, err);
  useEffect(() => {
    dispatch(productFeatching());
  }, [dispatch]);

  return (
    <div className="mx-5">
      <p className="my-10 flex justify-center text-2xl text-red-600 font-semibold ">Feature Product</p>
      {isLoading ? (
        <div className="flex justify-center">
          <Loading></Loading>
        </div>
      ) : (
        <p></p>
      )}
      <div className="feature-product grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-3 my-5">
        {products &&
          products?.products?.map((product) => (
            <ProductCard key={product._id} product={product}></ProductCard>
          ))}
      </div>
    </div>
  );
};

export default FeatureProduct;
