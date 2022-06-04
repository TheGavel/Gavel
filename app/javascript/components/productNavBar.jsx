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
        className="bg-gradient-to-r from-gavel-blue to-green-400 shadow-lg items-center flex h-20 justify-between"
      >
        <div className="flex items-center ml-8">
          <a href="/" className="flex logo w-12">
            <img
              src={LogoImage}
              alt="Gavel logo"
              className="logo w-12 cursor-pointer"
            />
            <br />
            <p className="Gavel text-white text-5xl font-mono font-bold pl-2 cursor-pointer">
              Gavel
            </p>
          </a>
        </div>
        <NavBarSuggestions />
        <div className="text text-white mx-6">
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
                            className="xl:mx-0 hover:text-blue-200 text-xl"
                            href={`/users/${current_user?.id}`}
                          >
                            個人資訊
                          </a>
                        </li>
                        <li>
                          <a
                            className="xl:mx-0 hover:text-blue-200 text-xl"
                            href="/products/buyerlist"
                          >
                            得標紀錄
                          </a>
                        </li>
                        <li>
                          <a
                            className="xl:mx-0 hover:text-blue-200 text-xl"
                            href="/orders/record"
                          >
                            交易紀錄
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
                        className="xl:mx-0 hover:text-blue-200 text-xl"
                        href="#"
                      >
                        賣家中心
                      </a>
                      <ul className="sub-nav">
                        <li>
                          <a
                            className="xl:mx-0 hover:text-blue-200 text-xl"
                            href="/products/own"
                          >
                            我的商品
                          </a>
                        </li>
                        <li>
                          <a
                            className="xl:mx-0 hover:text-blue-200 text-xl"
                            href="#"
                          >
                            成交清單
                          </a>
                        </li>
                        <li>
                          <a
                            className="xl:mx-0 hover:text-blue-200 text-xl"
                            href="#"
                          >
                            成交紀錄
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
                            className="xl:mx-0 hover:text-blue-200 text-xl"
                            href={`/users/${current_user?.id}`}
                          >
                            個人資訊
                          </a>
                        </li>
                        <li>
                          <a
                            className="xl:mx-0 hover:text-blue-200 text-xl"
                            href="/products/buyerlist"
                          >
                            得標紀錄
                          </a>
                        </li>
                        <li>
                          <a
                            className="xl:mx-0 hover:text-blue-200 text-xl"
                            href="/orders/record"
                          >
                            交易紀錄
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
              <span className="none">|</span>
              <a
                className="hover:text-blue-200 text-xl"
                href="/user_sessions/new"
              >
                登入
              </a>
            </>
          )}
        </div>
        <label htmlFor="menu_control" className="menu_btn">
          <div className="btn"></div>
        </label>
      </div>
    </div>
  );
};
export default ProductNavbar;
