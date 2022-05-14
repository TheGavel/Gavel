import React from "react";
import Card from "./product";
import Bar from "./productClassificationBar";
import { BrowserRouter,Routes,Route,Link } from "react-router-dom";

const Hello = () => {

  const data = {
    sellerImg: "https://tailwindcss.com/img/card-top.jpg",
    productImg: "https://tailwindcss.com/img/card-top.jpg",
    productTitle: "我是商品我是商品",
    productContent: "我是內文我是內文我是內文我是內文我是內文我是內文我是內文我是內文我是內文",
    labelList: ["標籤1","標籤2","標籤3","標籤4","標籤5"]
  }

  return(
    <div className="bg-white relative mx-auto">
      <h2 className="text-center text-3xl py-6">Explore Collections </h2>
      <BrowserRouter>
      <Bar/>

      <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-2xl lg:max-w-[1420px] ">
        <div className="relative mt-6 grid gridfit-[18rem]  gap-y-12 gap-x-8">
        <Routes>

        <Route path={encodeURI("/products/category/3c")} element= {<Card {...data} />}/>
        <Route path={encodeURI("/products/category/數位")} element={<Card{...data}/>}/>

        </Routes>
        <Card {...data} /><Card {...data} /><Card {...data} /><Card {...data} />
        </div>
      </div>
      </BrowserRouter>
    </div>

  )}
export default Hello;


// json

// sellerImg(url)
// productImg(url)
// productTitle(string)
// productContent(string)
// labelList(array)
