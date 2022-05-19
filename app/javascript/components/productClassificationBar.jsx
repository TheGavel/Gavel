import React from "react";
import { NavLink } from "react-router-dom";

const ClassificationBar = () => {
  // {overflow-x-scroll }
  const category = ["3c","數位","家電","食品","運動戶外","衣鞋包錶","書店","日常"];
  return (
    <div className="scroll overflow-y-hidden relative my-5" >
      <div className="navbar flex whitespace-nowrap tracking-wider font-semibold text-xl ">
        {
          category.map( (item) => {
            return  <NavLink
              className={({ isActive }) =>
                "category " + (isActive ? "activeStyle" : "")}
              to={`/products/category/${encodeURI(item)}`}>{item}</NavLink>
          })
        }
      </div>
    </div>
  )
}
export default ClassificationBar;
