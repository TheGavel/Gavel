import React from "react";

const Hello = (props) =>{
  const {sellerImg,productImg,productTitle,productContent,labelList} = props;
  return (
    <div className="transition relative rounded overflow-hidden mx-auto shadow hover:shadow-lg hover:scale-110 hover:z-50 group duration-300">
      <img className="w-full" src={productImg} alt="productImg"/>
      <div className="flex items-center justify-center overflow-hidden">
        <img className="w-10 h-10 rounded-full group-hover:rotate-[360deg] transition duration-[600ms]" src={sellerImg} alt="sellerImg"/>
      </div>
      <div className="px-6 py-4 bg-gray-300">
        <div className="font-bold text-xl mb-2">{productTitle}</div>
        <p className="text-gray-600 text-base">
          {productContent}
        </p>
      </div>
      <div className="px-6 py-4 bg-gray-200">
        {
          labelList.map( element => {
            return <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mr-2">#{element}</span>
          })
        }
      </div>
    </div>
  )
}
export default Hello;
