import React from "react";

const Hello = () =>{
  const style = {
    "max-height": "300px",
    width: "100%",
    height: "100%",
    overflow: "auto",
  }
  return (
<div style={style}>
    <div className=" my-5 tracking-wider font-semibold text-xl  flex  justify-evenly navbar relative  whitespace-nowrap">
      <h3 className="category">3c</h3>
      <h3 className="category">數位</h3>
      <h3 className="category">家電</h3>
      <h3 className="category">食品</h3>
      <h3 className="category">運動戶外</h3>
      <h3 className="category">衣鞋包錶</h3>
      <h3 className="category">書店</h3>
      <h3 className="category">日常</h3>
      </div>

    </div>
  )
}
export default Hello;
