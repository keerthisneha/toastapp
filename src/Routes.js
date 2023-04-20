import Beverages from "./beverages";
import Desserts from "./desserts";
import Special from "./special";
import Food from "./food";
import { Route, Routes, Navigate } from "react-router-dom";
import Cart from "./Cart";

const AppRoutes = ({ cart, setCart }) => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/special" />} />

      <Route
        path="/special"
        element={<Special cart={cart} setCart={setCart} />}
      />
      <Route
        excat
        path="/food"
        element={<Food cart={cart} setCart={setCart} />}
      />
      <Route
        path="/beverages"
        element={<Beverages cart={cart} setCart={setCart} />}
      />
      <Route
        path="/desserts"
        element={<Desserts cart={cart} setCart={setCart} />}
      />
      <Route path="/cart" element={<Cart cart={cart} setCart={setCart} />} />
    </Routes>
  );
};

export default AppRoutes;
