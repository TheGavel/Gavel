import React from "react";
import { Link } from "react-router-dom";

const Hello = () =>{
  // {overflow-x-scroll }
  return (
    <div className="scroll overflow-y-hidden relative my-5" >
      <div className="navbar flex whitespace-nowrap tracking-wider font-semibold text-xl ">
        <Link className="category" to="/products/category/3c"><h3>3c</h3></Link>
        <Link className="category" to="/products/category/數位"><h3>數位</h3></Link>
        <Link className="category" to="/products/category/家電"><h3>家電</h3></Link>
        <Link className="category" to="/products/category/食品"><h3>食品</h3></Link>
        <Link className="category" to="/products/category/運動戶外"><h3>運動戶外</h3></Link>
        <Link className="category" to="/products/category/衣鞋包錶"><h3>衣鞋包錶</h3></Link>
        <Link className="category" to="/products/category/書店"><h3>書店</h3></Link>
        <Link className="category" to="/products/category/日常"><h3>日常</h3></Link>
      </div>
    </div>
  )
}
export default Hello;
