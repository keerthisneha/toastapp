import React, { useState } from "react";
import logo from "./logi.jpeg";
import { useLocation } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import {tabs as headings} from "./data";
import { useNavigate } from "react-router-dom"
import "./Header.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";
const CommonHeader = () => {
  const [value, setValue] = useState(0);
let navigate = useNavigate()
  const handleChange = (event, index) => {
    setValue(index);
    navigate(headings[index])
  };

  return (
    <header className="header">
      <div>
        <div className="logo-flex">
          <div className="logo-flexing">
            <img
              src={logo}
              alt="logo"
              width="35"
              height="35"
              className="image"
            ></img>
            <div className="dropdown">
              <h2>
                Pick Up{" "}
                <span>
                  <ArrowDropDownIcon />
                </span>
              </h2>
              <div className="dropdown-content">
                <p>Delivery</p>
                <p>Pick Up</p>
              </div>
            </div>
          </div>
          <div>
            <SearchIcon className="search" />
          </div>
        </div>
      </div>
      <div className="tabstyle">
        <Tabs value={value} onChange={handleChange} className="tabstyle">
          <Tab label="Special" />
          <Tab label="Main" />
          <Tab label="Beverages" />
          <Tab label="Desserts" />
        </Tabs>
      </div>
    </header>
  );
};

const CartHeader = () => {
  return (
    <header className="carthead">
      <a className="cartback" href='/special'>
        
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path
            d="M19 11H7.82998L12.71 6.11997C13.1 5.72997 13.1 5.08997 12.71 4.69997C12.32 4.30997 11.69 4.30997 11.3 4.69997L4.70998 11.29C4.31998 11.68 4.31998 12.31 4.70998 12.7L11.3 19.29C11.69 19.68 12.32 19.68 12.71 19.29C13.1 18.9 13.1 18.27 12.71 17.88L7.82998 13H19C19.55 13 20 12.55 20 12C20 11.45 19.55 11 19 11Z"
            fill="#4A5662"
          ></path>
        </svg>
      </a>
      <h1>Place Order</h1>
    </header>
  );
};

const Header = () => {
  const { pathname } = useLocation();
  const isCartPage = pathname.includes("cart");

  if (isCartPage) {
    return <CartHeader />;
  }
  return <CommonHeader />;
};

export default Header;
