import { Link, useLocation } from "react-router-dom";
import "./Footer.css";
import { useState } from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ImportContactsIcon from "@mui/icons-material/ImportContacts";
import LocalMallOutlinedIcon from "@mui/icons-material/LocalMallOutlined";
import BoltIcon from "@mui/icons-material/Bolt";
const CommonFooter = ({ cart }) => {
  

  const getCartItemsCount = () =>
    cart.reduce((acc, item) => acc + item.count, 0);

    const menuclick =() =>{
      
    }

  return (
    <footer className="common-footer">
      <div className="menu" onClick={menuclick}> 
        menu
      </div>
      <div>
        <Link to="/event">
          <BoltIcon className="footericon" id='eventicon'/>
        </Link>
      </div>
      <div>
        <Link to="/special">
          <ImportContactsIcon className="footericon" />
        </Link>
      </div>
      <div>
        <Link to="/cart">
          <LocalMallOutlinedIcon className="footericon" /> {getCartItemsCount()}
        </Link>
      </div>
    </footer>
  );
};


const CartFooter = ({ cart,previousOrders , setPreviousOrders,currentOrders , setCurrentOrders }) => {
  
   const updatepreviousorderinchild = () => {
  //     setPreviousOrders(prev => ({
  //       ...prev,
  //       cart
  //     }))
  //     setCurrentOrders([])
   }

  const getCartItemsCount = () =>
    cart.reduce((acc, item) => acc + item.count, 0);

  return (
    <footer className="cart-footer">
      <div onClick={updatepreviousorderinchild}>
        <div className="cart-itemnumber">
          {getCartItemsCount()} items
          <span className="placeorder">
            Place Order
            <span className="place-arrow">
              <ArrowForwardIcon className="arrow-icon" />
            </span>
          </span>
        </div >
      </div>
    </footer>
  );
};

const Footer = ({ cart }) => {
  const { pathname } = useLocation();
  const isCartPage = pathname.includes("cart");

  if (isCartPage) {
    return <CartFooter cart={cart} />;
  }
  return <CommonFooter cart={cart} />;
};

export default Footer;
