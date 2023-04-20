import React, { useState } from "react";
import { beverages as data } from "./data";
import "./project.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./button.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

const Beverages = ({ cart, setCart }) => {
  const [beverages, setBeverages] = useState(data);
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
      newCart.splice(itemIndex, 1);
      setCart(newCart);
    }
  };

  const getItemCountInCart = (item) =>
    cart.find((e) => e.item_id === item.item_id)?.count;

  const dropdownclicked = (beverage) => {
    // loop over all beverages - Object.keys
    const temp = { ...beverages };
    temp[beverage].isCollapsed = !temp[beverage].isCollapsed;
    setBeverages(temp);
    setDropdown(dropdown == true ? false : true)
  };
  return (
    <div className="itemheaders">
      {Object.keys(beverages).map((beverage) => {
        
        return (
          <div key={beverage}>
            <div
              className="headingdropdown"
              onClick={() => dropdownclicked(beverage)}
            >
              <h2>{beverage}</h2>
              <span className="borders" ></span>
              <span>
                <ArrowDropDownIcon />
              </span>
            </div>
            {dropdown &&
              beverages[beverage].map((detail) => {
                return (
                  <div
                    className="flexing"
                    key={detail.item_id}
                    id={detail.xF1F22cL}
                  >
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
                        {detail.item_price_details.map((prices, index) => {
                          return (
                            <h3 key={`${detail.item_id}_${index}`}>
                              {detail.item_type == "veg" && (
                                <span className="VeganStatus-veg"></span>
                              )}
                              {detail.item_type != "veg" && (
                                <span className="VeganStatus-nonveg"></span>
                              )}
                              ₹{prices.item_base_price}
                            </h3>
                          );
                        })}
                      </div>
                    </div>
                    <div>
                      {getItemCountInCart(detail) ? (
                        <div>
                          
                          <div className="AddButton" type="button">
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
                          </div>
                        </div>
                      ) : (
                        <button
                          className="AddButton"
                          type="button"
                          onClick={() => addToCart(detail)}
                        >
                          <span className="AddButton-plus">
                            <AddOutlinedIcon />
                          </span>
                          ADD
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};
export default Beverages;
