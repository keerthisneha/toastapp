import "./project.css";
import Header from "./Header";
import Footer from "./Footer";
import { useState } from "react";
import Routes from "./Routes";
import { BrowserRouter } from "react-router-dom";
import Special from "./special";
function App() {
  const [cart, setCart] = useState([]);
  const [previousOrders, setPreviousOrders] = useState([]);

  //  const updatepreviousorder = () => {
  //    setPreviousOrders((prev) => ({
  //      ...prev,
  //      cart,
  //    }));
     
  //  };
  
 
  return (
    <BrowserRouter>
      <div className="App" >
        <Header />
        <Routes
          cart={cart}
          setCart={setCart}
          previousOrders={previousOrders}
          setPreviousOrders={setPreviousOrders}
        />
        <Footer
          cart={cart}
          setCart={setCart}
          previousOrders={previousOrders}
          setPreviousOrders={setPreviousOrders}
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
