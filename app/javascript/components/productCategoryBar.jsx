import React, { useState,useEffect } from "react";
import { NavLink } from "react-router-dom";
import Rails from "@rails/ujs"

const categoryBar = () => {
  const [firstLayerCategory, setfirstLayerCategory] = useState([]);
  useEffect(() => {
    const getData = async () => {
      Rails.ajax({
        type: "get",
        url: '/api/v1/products/categories/architecture',
        success: (category) => {
          setfirstLayerCategory(() => Object.keys(category) );
        }
      })
    };
    getData();
  }, []);

  return (
    <div className="scroll mt-28 overflow-y-hidden relative my-5" >
      <div className="navbar flex whitespace-nowrap tracking-wider font-semibold text-xl ">
        {
          firstLayerCategory.map( (item,idx) => {
            return  <NavLink key={"NavLink"+idx}
              className={({ isActive }) =>
                "category " + (isActive ? "activeStyle" : "")}
              to={`/products/categories/${encodeURI(item)}`}>{item}</NavLink>
          })
        }
      </div>
    </div>
  )
}
export default categoryBar;