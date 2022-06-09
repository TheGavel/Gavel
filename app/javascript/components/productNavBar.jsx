import React from "react";
import LogoImage from "images/gavel_reverse-modified.png";
import NavBarSuggestions from "./navBarSuggestions";

const ProductNavbar = ({ props }) => {
  const token = document.querySelector('meta[name~="csrf-token"]').content;
  console.log(token);
  const current_user = props.current_user;
  console.log("current_user", current_user?.id);
  return (
    <div className="fixed z-100 top-0 right-0 left-0">
      <input type="checkbox" id="menu_control" />
      <div
        id="nav"
        className="bg-gradient-to-r from-gavel-blue to-blue-400 shadow-lg items-center flex h-20 justify-between"
      >
        <div className="flex items-center ml-2 md:ml-8">
          <a href="/" className="logo flex w-full items-center">
            <img
              src={LogoImage}
              alt="Gavel logo"
              className="logo cursor-pointer w-8 md:w-12"
            />
            <h1 className="Gavel text-white font-mono font-bold pl-2 cursor-pointer text-3xl md:text-5xl">
              Gavel
            </h1>
          </a>
        </div>
        <NavBarSuggestions />
        <div className="main-nav text-white xl:mx-6">
          {current_user ? (
            <>
              {!(current_user?.role == "seller") ? (
                <>
                  <ul>
                    <li>
                      <a
                        className="xl:mx-0 hover:text-blue-200 text-xl"
                        href="/sms_auth/registration/new"
                      >
                        成為賣家
                      </a>
                    </li>
                    <li>
                      <a
                        className="xl:mx-0 hover:text-blue-200 text-xl"
                        href="#"
                      >
                        買家中心
                      </a>
                      <ul className="sub-nav">
                        <li>
                          <a
                            className="navitem xl:mx-0 text-xl"
                            href={`/users/${current_user?.id}`}
                          >
                            個人資訊
                          </a>
                        </li>
                        <li>
                          <a
                            className="navitem xl:mx-0 text-xl"
                            href="/orders/buyer_order"
                          >
                            得標清單
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <a
                    className="xl:mx-0 hover:text-blue-200 text-xl"
                    rel="nofollow"
                    data-method="delete"
                    href="/user_sessions"
                  >
                    登出
                  </a>
                </>
              ) : (
                <>
                  <ul>
                    <li>
                      <a
                        className="xl:mx-0 hover:text-blue-200 text-xl font-normal"
                        href="#"
                      >
                        賣家中心
                      </a>
                      <ul className="sub-nav">
                        <li>
                          <a
                            className="navitem xl:mx-0 text-xl"
                            href="/products/own"
                          >
                            我的商品
                          </a>
                        </li>
                        <li>
                          <a
                            className="navitem xl:mx-0 text-xl"
                            href="/orders/seller_order"
                          >
                            成交清單
                          </a>
                        </li>
                      </ul>
                    </li>
                    <li>
                      <a
                        className="xl:mx-0 hover:text-blue-200 text-xl"
                        href="#"
                      >
                        買家中心
                      </a>
                      <ul className="sub-nav">
                        <li>
                          <a
                            className="navitem xl:mx-0 text-xl"
                            href={`/users/${current_user?.id}`}
                          >
                            個人資訊
                          </a>
                        </li>
                        <li>
                          <a
                            className="navitem xl:mx-0 text-xl"
                            href="/orders/buyer_order"
                          >
                            得標清單
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                  <a
                    className="xl:mx-0 hover:text-blue-200 text-xl"
                    rel="nofollow"
                    data-method="delete"
                    href="/user_sessions"
                  >
                    登出
                  </a>
                </>
              )}
            </>
          ) : (
            <>
              <a className="hover:text-blue-200 text-xl" href="/users/new">
                註冊
              </a>
              <a
                className="hover:text-blue-200 text-xl"
                href="/user_sessions/new"
              >
                登入
              </a>
            </>
          )}
        </div>
        <label htmlFor="menu_control" className="menu_btn mr-1 md:mr-8">
          <span></span>
          <span></span>
          <span></span>
        </label>
      </div>
    </div>
  );
};
export default ProductNavbar;
