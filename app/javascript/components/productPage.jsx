import React from "react";
import ProductList from "./productList";
import CategoryBar from "./productCategoryBar";
import NavBar from "./productNavBar";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

const Productpage = ({ props }) => {
  console.log("props.policy", props.policy);
  return (
    <div className="bg-blue-50 relative mx-auto z-1 ">
      <Router>
        <NavBar props={props} />
        {/* <h2 className="text-center text-3xl py-6 mt-14">Explore Collections </h2> */}

        <CategoryBar />
        <div className="mx-auto py-2 px-4 sm:px-6 lg:px-8 max-w-2xl lg:max-w-[1420px] z-20">
          <div className="relative mt-6 grid gridfit-[18rem]  gap-y-12 gap-x-8">
            <Routes>
              <Route path="/" element={<ProductList />} />
              <Route path="/products" element={<ProductList />} />
              <Route
                path={encodeURI("/products/:mode/:id")}
                element={<ProductList />}
              />
              <Route
                path={encodeURI("/products/:mode/:id")}
                element={<ProductList />}
              />
            </Routes>
          </div>
        </div>
      </Router>
    </div>
  );
};
export default Productpage;
