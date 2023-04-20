import React from 'react'
import App from './App';
import {food as data} from './data';
import { useState } from 'react';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import "./button.css";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";

const Food = ({ cart, setCart }) => {
  const [food, setFood] = useState(data);
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

    const dropdownclicked = () => {
      setDropdown(dropdown === true ? false : true);
    };

  return (
    <div className="itemheaders">
      {Object.keys(food).map((items_list) => {
        return (
          <div key={items_list}>
            <h2 className="headingdropdown" onClick={dropdownclicked}>
              {items_list}
              <span className="borders"></span>
              <span>
                <ArrowDropDownIcon />
              </span>
            </h2>
            {dropdown &&
              food[items_list].map((detail) => {
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
                        <h4 style={{ fontSize: "14px", fontWeight: "500" }}>
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

export default Food;
