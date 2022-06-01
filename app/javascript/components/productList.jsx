import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Rails from "@rails/ujs";

const Product = (data) => {
  const { sellerImg, productImg, productTitle, productContent, labelList ,id } =
    data;
    console.log("room",id);
  return (
    <a href={`/rooms/${id}`} className="transition relative rounded overflow-hidden mx-auto shadow hover:shadow-lg hover:scale-110 hover:z-50 group duration-300">
      <div className="w-[310px] md:w-full transition relative rounded overflow-hidden mx-auto shadow hover:shadow-lg hover:scale-[102%] hover:z-50 group">
        <img className="w-full h-[182px]  object-cover" src={productImg} alt="productImg" />
        <div className="h-[39px] absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-[-1.85rem]  flex items-center justify-center overflow-hidden ">
          <img
            className="w-10 h-10 p-1 bg-white rounded-full group-hover:animate-waving	 border-2 shadow-inner"
            src={sellerImg}
            alt="sellerImg"
          />
        </div>
        <div className="h-[142px] px-6 pt-4 bg-white overflow-hidden">
          <div className="font-bold text-xl mb-2">{productTitle}</div>
          <p className="text-gray-600 text-base text-ellipsis ">{productContent}</p>
        </div>
        <div className="h-[56px] px-6 py-4 bg-white">
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
    </a>
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
            data["id"] = item.id;
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
