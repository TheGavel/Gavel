import React from "react";
import Card from "./product";
import Bar from "./productClassificationBar";
const Hello = () => (



<div className="bg-white relative">
  <h2 className="text-center text-3xl py-6">Explore Collections </h2>
  <Bar/>
  <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-2xl lg:max-w-[1420px] ">
    <div className="relative mt-6 grid gridfit-[22rem]  gap-y-12 gap-x-8">
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/>
    </div>
  </div>
</div>
)
export default() => Hello()


// json

// sellerImg(url)
// productImg(url)
// productTitle(string)
// productContent(string)
// labelList(array)
