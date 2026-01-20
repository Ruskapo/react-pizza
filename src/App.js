import React from "react";
import { Route, Routes } from "react-router-dom";
// import { useSelector, useDispatch } from 'react-redux';
// import { decrement, increment} from './redux/slices/filterSlice';

import Header from "./components/Header";
import Cart from "./pages/Cart";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";

import "./scss/app.scss";

 export const context = React.createContext();

function App() {
  const [searchValue, setSearchValue] = React.useState("");
  //  const filter = useSelector((state) => state.filter.value)
  // const dispatch = useDispatch()
  return (
    <div className="wrapper">
      <context.Provider value={{searchValue,  setSearchValue}}>
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </context.Provider>
    </div>
  );
}

export default App;
