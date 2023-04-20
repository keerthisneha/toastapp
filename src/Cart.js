import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./cart.css";
import "./project.css";
import "./button.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
const Cart = ({ cart, setCart ,previousOrders, setPreviousOrders}) => {
    const [dropdown, setDropdown] = useState(true);

  const [currentOrders, setCurrentOrders] = useState([]);
 

  useEffect(() => {
    cartupdate();
  }, []);

  const addToCart = (item) => {
    const itemIndex = cart.map((e) => e.item_id).indexOf(item.item_id);
    if (itemIndex !== -1) {
      const newCart = [...cart];
      newCart[itemIndex] = { ...item, count: cart[itemIndex].count + 1 };
      setCart(newCart);
    } else {
      const itemToAdd = { ...item, count: 1 };

      setCart([...cart, itemToAdd]);
    }
  };

  const removeFromCart = (item) => {
    const itemIndex = cart.map((e) => e.item_id).indexOf(item.item_id);
    const newCart = [...cart];
    if (cart[itemIndex].count > 1) {
      newCart[itemIndex] = { ...item, count: cart[itemIndex].count - 1 };
      setCart(newCart);
    } else {
      console.log(newCart);
      newCart.splice(itemIndex, 1);
      setCart(newCart);
      // need to remove the item from the current order display
      setCurrentOrders(cart);
    }
  };
  const updateprevious = () => {
    setCurrentOrders([]);
  };
  const getItemCountInCart = (item) =>
    cart.find((e) => e.item_id === item.item_id)?.count;

    const dropdownclicked =() => {
  setDropdown(dropdown == true ? false : true)
}
  let cartupdate = () => {
    setCurrentOrders((prev) => ({
      ...prev,
      cart,
    }));
  };
  return (
    <div>
      {cart.length == 0 && (
        <section className="emptycart">
          <h3>No Orders Yet!</h3>
          <p>Add something from the menu</p>
          <a type="button" className="orderbutton" href="/food">
            START ORDERING
          </a>
        </section>
      )}
      <div>
        {cart.length > 0 && (
          <div className="cartheader">
            <div className="headingdropdown" onClick={dropdownclicked}>
              <h2>Current Order</h2>
              <span className="borders"></span>
              <span>
                <ArrowDropDownIcon />
              </span>
            </div>
            <div>
              {dropdown &&
                Object.keys(currentOrders).map((cartitems) => {
                  return (
                    <div key={cartitems}>
                      {currentOrders[cartitems].map((detail) => {
                        return (
                          <div className="flexing" key={detail.item_id}>
                            <div className="itemdisplay">
                              {detail.item_image_url && (
                                <img
                                  src={detail.item_image_url}
                                  className="itemimage"
                                  alt=""
                                />
                              )}
                              <div className="flex">
                                <h2>{detail.item_name}</h2>
                                <h4
                                  style={{
                                    fontSize: "14px",
                                    fontWeight: "500",
                                  }}
                                >
                                  {detail.item_type == "veg" && (
                                    <span className="VeganStatus-veg"></span>
                                  )}
                                  {detail.item_type != "veg" && (
                                    <span className="VeganStatus-nonveg"></span>
                                  )}
                                  ₹
                                  {detail.item_price_details[0].item_base_price}
                                </h4>
                              </div>
                            </div>
                            <div>
                              {getItemCountInCart(detail) ? (
                                <div>
                                  <button className="AddButton" type="button">
                                    <button
                                      className="AddButton-minus"
                                      onClick={() => removeFromCart(detail)}
                                    >
                                      <RemoveOutlinedIcon />
                                    </button>
                                    <span>{getItemCountInCart(detail)}</span>
                                    <button
                                      className="AddButton-plus"
                                      onClick={() => addToCart(detail)}
                                    >
                                      <AddOutlinedIcon />
                                    </button>
                                  </button>
                                </div>
                              ) : (
                                <div
                                  className="AddButton"
                                  type="button"
                                  onClick={() => addToCart(detail)}
                                >
                                  <span className="AddButton-plus">
                                    <AddOutlinedIcon />
                                  </span>
                                  ADD
                                </div>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  );
                })}
            </div>
            <div>
              <div className="previousheader">
                <div className="headingdropdown" onClick={dropdownclicked}>
                  <h2>Previous Order</h2>
                  <span className="borders"></span>
                  <span>
                    <ArrowDropDownIcon />
                  </span>
                </div>
                {!dropdown &&
                  Object.keys(currentOrders).map((cartitems) => {
                    return (
                      <div key={cartitems}>
                        {currentOrders[cartitems].map((detail) => {
                          return (
                            <div className="flexing" key={detail.item_id}>
                              <div className="itemdisplay">
                                {detail.item_image_url && (
                                  <img
                                    src={detail.item_image_url}
                                    className="itemimage"
                                    alt=""
                                  />
                                )}
                                <div className="flex">
                                  <h2>{detail.item_name}</h2>
                                  <h4
                                    style={{
                                      fontSize: "14px",
                                      fontWeight: "500",
                                    }}
                                  >
                                    {detail.item_type == "veg" && (
                                      <span className="VeganStatus-veg"></span>
                                    )}
                                    {detail.item_type != "veg" && (
                                      <span className="VeganStatus-nonveg"></span>
                                    )}
                                    ₹
                                    {
                                      detail.item_price_details[0]
                                        .item_base_price
                                    }
                                  </h4>
                                </div>
                              </div>
                              <div>
                                
                                  <div>
                                    
                                     
                                      <span>{getItemCountInCart(detail)}</span>
                                      
                                  </div>
                               
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default Cart;
