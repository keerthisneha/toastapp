import React, { useEffect } from "react";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import "./cart.css";
import "./project.css";
import "./button.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
const Cart = ({ cart, setCart, previousOrders }) => {
  const [dropdown, setDropdown] = useState(true);

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
    }
  };

  const getItemCountInCart = (item) =>
    cart.find((e) => e.item_id === item.item_id)?.count;

  const dropdownclicked = () => {
    setDropdown(dropdown == true ? false : true);
  };

  return (
    <div>
      {!cart.length && !previousOrders.length ? (
        <section className="emptycart">
          <h3>No Orders Yet!</h3>
          <p>Add something from the menu</p>
          <a type="button" className="orderbutton" href="/food">
            START ORDERING
          </a>
        </section>
      ) : (
        <div>
          <div className="cartheader">
            <div className="headingdropdown" onClick={dropdownclicked}>
              <h2>Current Order</h2>
              <span className="borders"></span>
              <span>
                <ArrowDropDownIcon />
              </span>
            </div>
            {cart.length > 0 && (
              <div>
                {dropdown &&
                  cart.map((detail) => {
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
                              ₹{detail.item_price_details?.[0]?.item_base_price}
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
            )}
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
                  previousOrders.map((detail) => {
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
                              ₹{detail.item_price_details[0].item_base_price}
                            </h4>
                          </div>
                        </div>
                        <div>
                          <div>
                            <span>{detail.count}</span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default Cart;
