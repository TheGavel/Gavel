import React , { useState,useEffect } from "react";
import MyImage from 'images/gavel_logo.png'
import Hamburger from 'images/hamburger.png'

import NavBarSuggestions from "./navBarSuggestions"

const ProductNavbar = ({props}) => {
  const token = document.querySelector('meta[name~="csrf-token"]').content;
  console.log(token);
  const current_user = props.current_user
  const isLoggedIn = Boolean(props.current_user);
  console.log("current_user",current_user,current_user?.role);
  return(



<nav className="bg-gray-900 w-full  h-[56px] fixed top-0 z-100" >
  <div className="text-center inline-block">
    <a href="/" className="flex items-center">
      <img src={ MyImage } alt= "Gavel logo" className="logo w-12 ml-4 cursor-pointer"/>
      <p className="Gavel text-gray-200 text-2xl font-mono font-bold pl-2 cursor-pointer">Gavel</p>
    </a>
  </div>
  <NavBarSuggestions />
  <label htmlFor="switch"><img src={Hamburger}/></label>
  <input className="checkbox" type="checkbox" id="switch"/>

  <div className="menu h-full text-white xl:ml-28">
    {
    current_user?
      <>
      {!(current_user?.role == "seller")?
        <ul>
          <li className="firstlayer">
           <a className="xl:mx-0 hover:text-blue-500" href="/sms_auth/registration/new">成為賣家</a>
          </li>
          <li className="firstlayer">
            <a className="link hover:text-blue-500" href="#">買家中心</a>
            <ul className="sub-nav">
              <li><a className="xl:text-center hover:text-blue-500" href="/users/18">個人資訊</a></li>
              <li><a className="xl:mx-0 hover:text-blue-500" href="#">得標紀錄</a></li>
              <li><a className="xl:mx-0 hover:text-blue-500" href="#">交易紀錄</a></li>
            </ul>
          </li>
          <li className="firstlayer">
          <a class="xl:mx-1 hover:text-blue-500" rel="nofollow" data-method="delete" href="/user_sessions">登出</a>
          </li>
        </ul>
        :
        <ul>
          <li className="firstlayer">
            <a className="link hover:text-blue-500" href="#">賣家中心</a>
            <ul className="sub-nav">
              <li><a className="xl:mx-0 hover:text-blue-500" href="/products/own">我的商品</a></li>
              <li><a className="xl:mx-0 hover:text-blue-500" href="#">已賣清單</a></li>
              <li><a className="xl:mx-0 hover:text-blue-500" href="#">成交紀錄</a></li>
            </ul>
          </li>
          <li className="firstlayer">
            <a className="link hover:text-blue-500" href="#">買家中心</a>
            <ul className="sub-nav">
              <li><a className="xl:text-center hover:text-blue-500" href="/users/18">個人資訊</a></li>
              <li><a className="xl:mx-0 hover:text-blue-500" href="#">得標紀錄</a></li>
              <li><a className="xl:mx-0 hover:text-blue-500" href="#">交易紀錄</a></li>
            </ul>
          </li>
          <li className="firstlayer">
          <a class="xl:mx-1 hover:text-blue-500" rel="nofollow" data-method="delete" href="/user_sessions">登出</a>
          </li>
        </ul>
      }
      </>
      :
      <>
      <ul>
      <li className="firstlayer">
        <a className="xl:mx-0  hover:text-blue-500" href="/users/new">註冊</a>
      </li>
      <li className="firstlayer">
        <a className="xl:mx-0 link  hover:text-blue-500" href="/user_sessions/new">登入</a>
      </li>
      </ul>
      </>
    }
    </div>

</nav>


  )
}
export default ProductNavbar
