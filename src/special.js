import React from "react";
import {food , beverages , desserts} from "./data"
import { useState } from "react";
import "./special.css";
import "./project.css"
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import RemoveOutlinedIcon from "@mui/icons-material/RemoveOutlined";
const Special =({cart , setCart })=>{

     const data ={...food , ...beverages , ...desserts}
   
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
     //  // loop over all beverages - Object.keys
     //  const temp = { ...beverages };
     //  temp[beverage].isCollapsed = !temp[beverage].isCollapsed;
     //  setBeverages(temp);
      setDropdown(dropdown == true ? false : true);
    };

     return (
       <div>
         <div className="special-banner">
           <div className="special-image">
             <img
               src="https://toast-prod-data.s3.ap-south-1.amazonaws.com/restruant/52553522735652184/2020-06-20/feature_image_2.jpeg"
               alt="banner "
               width="637px"
               height="122px"
               style={{ borderRadius: "10px" }}
               className="image"
             />
             <h3 className="special-h3">
               Welcome to
               <br></br> Sacred Earth
             </h3>
           </div>
         </div>
         <div className="headingdropdowns" onClick={dropdownclicked}>
           <div
            className="headingdropdown"
           >
             <h3>Today's Special</h3>
             <span className="borders"></span>
             <span>
               <ArrowDropDownIcon />
             </span>
           </div>
         </div>
         {dropdown && Object.values(data).map((allitems, y) => {
           return (
             <div key={y} className="special-flex">
               <div>
                 {allitems.map((detail) => {
                   return (
                     <div key={detail.item_id}>
                       <div key={detail.item_id}>
                         {detail.is_special && detail.item_type == "veg" && (
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
                                 {detail.item_price_details.map(
                                   (prices, index) => {
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
                                   }
                                 )}
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
                         )}
                       </div>
                     </div>
                   );
                 })}
               </div>
             </div>
           );
         })}
       </div>
     
     );
}
export default Special