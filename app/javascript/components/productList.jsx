import React, { useState, useRef, useCallback } from "react";
import { useParams } from "react-router-dom";
import useSearch from "./useSearch";
const Product = (data) => {
  const { sellerImg, productImg, productTitle, productContent, labelList, id } =
    data;
  return (
    <a
      href={`/rooms/${id}`}
      className="transition relative rounded-lg overflow-hidden mx-auto shadow-xl hover:shadow-lg hover:scale-[107%] hover:z-50 group duration-300"
    >
      <div className="w-[310px] max-w-[430px] transition bg-white relative rounded-lg overflow-hidden mx-auto shadow-xl hover:shadow-2xl hover:z-50 hover:scale-[107%] group">
        <div className="w-[310px] max-w-[430px] h-[182px] flex justify-center bg-white pt-6 drop-shadow-sm">
          <img
            className="h-full object-cover"
            src={productImg}
            alt="productImg"
          />
        </div>
        <div className="h-[39px] absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[-2rem] flex items-center justify-center overflow-hidden ">
          <img
            className="w-10 h-10 p-1 bg-white rounded-full group-hover:animate-waving border-2 shadow-inner"
            src={sellerImg}
            alt="sellerImg"
          />
        </div>
        <div className="h-[142px] px-6 pt-10 bg-white overflow-hidden">
          <div className="font-bold text-xl mb-6 text-gray-800 truncate text-center">
            {productTitle}
          </div>
          <div className="">
            <p className="text-gray-600 text-base text-center">
              {productContent}
            </p>
          </div>
        </div>
        <div className="h-[56px] px-6 py-4 bg-blue-200 flex justify-center mt-4">
          {labelList.map((element, idx) => {
            return (
              <span
                key={"label" + idx}
                className="inline-block bg-blue-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mr-2"
              >
                {element}
              </span>
            );
          })}
        </div>
      </div>
    </a>
  );
};

const productList = () => {
  const params = useParams();
  const [pageNumber, setPageNumber] = useState(1);
  const { products, hasMore, loading, error } = useSearch(
    params.id,
    pageNumber,
    setPageNumber,
    params
  );

  const observer = useRef();
  const lastBookElementRef = useCallback(
    (node) => {
      if (loading) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore) {
          setPageNumber((prevPageNumber) => prevPageNumber + 1);
        }
      });
      if (node) observer.current.observe(node);
    },
    [loading, hasMore]
  );

  return (
    <>
      {products.map((product, idx) => {
        if (products.length === idx + 1) {
          return (
            <div ref={lastBookElementRef} key={`product${idx}`}>
              <Product {...product} />
            </div>
          );
        } else {
          return (
            <div key={`product${idx}`}>
              <Product {...product} />
            </div>
          );
        }
      })}
      {/* <div>{loading && 'Loading...'}</div>
    <div>{error && 'Error'}</div> */}
    </>
  );
};

export default productList;
