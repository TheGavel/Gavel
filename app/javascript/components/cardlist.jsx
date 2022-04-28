import React from "react";
import Card from "./card";
const Hello = () => (


<div className="bg-white relative">
{/* <div className= "w-96 h-96 bg-lime-500 bg-shadow-[red]"> 111</div> */}
  <h2 className="text-center">Explore Collections </h2>
  <div className="mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 max-w-2xl lg:max-w-[1420px] ">
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
