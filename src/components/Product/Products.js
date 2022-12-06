import React, { useEffect, useState } from "react";
import Navbar from "../../sharied/Navbar/Navbar";
import Footer from "../../sharied/Footer/Footer";
import { useDispatch, useSelector } from "react-redux";
import { getSearchProducts } from "./../../app/feature/searchProductSlice";
import ProductCard from "./ProductCard";
import Loading from "./../../sharied/Loading/Loading";
import ReactPaginate from "react-paginate";
import { useLocation } from "react-router-dom";

const Products = () => {
  const categorys = [
    "Electronics",
    "Cameras",
    "Laptops",
    "Accessories",
    "Headphones",
    "Food",
    "Books",
    "Clothes/Shoes",
    "Beauty/Health",
    "Sports",
    "Outdoor",
    "Home",
  ];
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState(0);
  //   console.log("price is ", price);
  //   console.log("category", category);
  //   if (category) {
  //     console.log("ase");
  //   }
  const { state } = useLocation();
  //   const { id, color } = state;
  //   console.log("using nagigae pass data", state?.searchProduct);
  const { searchProduct } = state;
  //   console.log("search product ", searchProduct);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(0);

  const { products, isLoading } = useSelector((state) => state.searchProducts);
  const pageCount = Math.ceil(products?.filteredProductsCount / products?.resPerPage);
  useEffect(() => {
    const query = { page: currentPage, keyword: searchProduct, category, price };
    dispatch(getSearchProducts(query));
  }, [dispatch, currentPage, searchProduct, category, price]);
  const handelpageChange = ({ selected }) => {
    setCurrentPage(selected + 1);
  };
  //   console.log("corrent page ", currentPage);
  return (
    <>
      <Navbar></Navbar>

      <div className="my-5 text-center font-semibold">Product Gallery</div>

      {isLoading ? (
        <div className="flex justify-center">
          <Loading></Loading>
        </div>
      ) : (
        <p></p>
      )}
      <div className="grid sm:grid-cols-5">
        <div>
          <div className="mx-4">
            <p className="my-3 font-bold">Price</p>
            <input
              type="range"
              min="1"
              max="1000"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="range range-primary"
            />
          </div>
          <div className="ml-5">
            <h3 className="my-3 font-bold">Category</h3>
            {categorys.map((category) => (
              <ul key={category}>
                <li className="cursor-pointer" onClick={() => setCategory(category)}>
                  {category}
                </li>
              </ul>
            ))}
          </div>
        </div>
        {products?.filteredProductsCount < 1 ? (
          <div className="flex justify-center items-center my-10 font-bold text-red-700">
            <p>Your searches product not founded</p>
          </div>
        ) : (
          <div className="col-span-3 mx-2">
            <div className="grid lg:grid-cols-2 md:grid-cols-2 gap-5 mb-5">
              {products?.products?.map((product) => (
                <ProductCard product={product} key={product._id}></ProductCard>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="grid justify-center my-5">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handelpageChange}
          pageRangeDisplayed={products?.resPerPage}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          containerClassName="pagination"
          activeClassName="active-page"
          pageClassName="page-class"
          previousClassName="previous"
          nextClassName="previous"
        />
      </div>

      <Footer></Footer>
    </>
  );
};

export default Products;
