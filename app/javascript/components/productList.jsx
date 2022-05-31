import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Rails from "@rails/ujs";

const Product = (data) => {
  const { sellerImg, productImg, productTitle, productContent, labelList } =
    data;

  // 182 39 139 89
  // w-full
  return (
    <div className="w-[310px] md:w-full transition relative rounded overflow-hidden mx-auto shadow hover:shadow-lg hover:scale-110 hover:z-50 group duration-300">
      {/* <div className="h-[182px] flex items-center justify-center overflow-hidden">
      </div> */}
      {/*  */}
      {/*   object-cover */}
      {/**/}
      <img className="w-full h-[182px]  object-cover" src={productImg} alt="productImg" />
      <div className="h-[39px] flex items-center justify-center overflow-hidden">
        <img
          className="w-10 h-10 bg-gray-400 rounded-full group-hover:rotate-[360deg] transition duration-[600ms]"
          src={sellerImg}
          alt="sellerImg"
        />
      </div>
      {/* overflow-auto break-words */}
      {/* text-clip overflow-hidden */}
      <div className="h-[142px] px-6 pt-4 bg-gray-300 overflow-hidden">
        <div className="font-bold text-xl mb-2">{productTitle}</div>
        <p className="text-gray-600 text-base text-ellipsis ">{productContent}</p>
      </div>
      <div className="h-[89px] px-6 py-4 bg-gray-200">
        {labelList.map((element, idx) => {
          return (
            <span
              key={"label" + idx}
              className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mr-2"
            >
              #{element}
            </span>
          );
        })}
      </div>
    </div>
  );
};

const productList = () => {
  const params = useParams();
  console.log("paramsid",params.id  );
  const [myArray, setMyArray] = useState([]);
  let dataArray = []
  let url = ''
  if( params.mode == "categories" )
    url = `/api/v1/products/categories/${params.id != undefined ? params.id: '3C數位' }`
  else if(params.id == undefined){
    url = '/api/v1/products/categories/3C數位'
  }
  else{
    url = `/api/v1/products/search/${params.id}`
  }
  useEffect(() => {
    const getData = async () => {
      Rails.ajax({
        type: "get",
        url: url,
        success: (productData) => {
          dataArray = [];
          productData.forEach((item) => {
            let data = {};
            data["sellerImg"] = item.seller_image;
            data["productImg"] = item.product_image;
            data["productTitle"] = item.name;
            data["productContent"] = item.description;
            data["labelList"] = item.label_list
            console.log(data["labelList"]);
            dataArray.push(data);
          });
          setMyArray(() => dataArray);
        },
      });
    };
    getData();
  }, [params]); //<-- This is the dependency array

  return myArray.map((item, idx) => {
    return <Product key={"Product" + idx} {...item} />;
  });
};

export default productList;
