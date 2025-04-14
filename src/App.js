import React from "react";
import "./App.css";
import ProductList from "./components/ProductList";
import ProductForm from "./components/ProductForm";
import ProductItem from "./components/ProductItem";
import MainHeader from "./components/homepage/MainHeader";
import MainFooter from "./components/homepage/MainFooter";
import { Routes, Route } from "react-router-dom";

function App() {

  return (
  <>
    <div className="App bg-white text-dark">
      <MainHeader />
      <Routes>
        <Route
          path="/"
          element={
            <>
              <ProductForm />
              <ProductList />
            </>
          }
        />
        <Route path="/products/:id" element={<ProductItem />} />
      </Routes>
    </div>
    <MainFooter />
  </>
  );
}

export default App;
