import React from "react";

const Hello = () =>{
  // {overflow-x-scroll }
  return (
    <div className="scroll overflow-y-hidden relative my-5" >
      <div className="navbar flex whitespace-nowrap tracking-wider font-semibold text-xl ">
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
