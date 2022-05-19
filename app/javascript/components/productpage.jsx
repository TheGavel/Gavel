import React from "react";
import Card from "./product";
import Bar from "./productClassificationBar";
import { BrowserRouter as Router,Routes,Route } from "react-router-dom";

const App = () => {
  return(
    <div className="bg-white relative mx-auto">
      <h2 className="text-center text-3xl py-6">Explore Collections </h2>
      <Router>
        <Bar/>
        <div className="mx-auto py-6 px-4 sm:px-6 lg:px-8 max-w-2xl lg:max-w-[1420px] ">
          <div className="relative mt-6 grid gridfit-[18rem]  gap-y-12 gap-x-8">
          <Routes>
            <Route path={encodeURI("/products/category/:id")}
                    element={<Card/>} />
          </Routes>
          </div>
        </div>
      </Router>
    </div>
  )}
export default App;
