import React from "react";

const Hello = () =>{

return (
  <div className="transition relative rounded overflow-hidden mx-auto shadow hover:shadow-lg hover:scale-110 hover:z-50 group duration-300">
    <img className="w-full" src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
    <div className="flex items-center justify-center overflow-hidden">
      <img className="w-10 h-10 rounded-full group-hover:rotate-[360deg] transition duration-300 " src="https://tailwindcss.com/img/card-top.jpg" alt="Sunset in the mountains"/>
    </div>
    <div className="px-6 py-4 bg-gray-300">
      <div className="font-bold text-xl mb-2">The Coldest Sunset</div>
      <p className="text-gray-600 text-base">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
      </p>
    </div>
    <div className="px-6 py-4 bg-gray-200">
      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mr-2">#photography</span>
      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mr-2">#travel</span>
      <span className="inline-block bg-gray-100 rounded-full px-3 py-1 text-sm font-semibold text-gray-600">#winter</span>
    </div>
  </div>
)
}
export default() => Hello()
{/* <div className="grid auto-cols-fr " >
  <div className="col-span-full  bg-lime-500 ">1</div>
  <div className="col-span-full row-start-4 row-end-6 bg-indigo-600">2</div>
</div> */}
