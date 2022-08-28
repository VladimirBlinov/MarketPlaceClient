import React from 'react';
import { useForm, SubmitHandler } from "react-hook-form";
import './App.css';
import { Header } from './components/Header';
import { ProductList } from './components/ProductList';
import { Register } from './components/Register';

function App() {
  return (
    <div className="App">
      <Header />
      <Register />



      {/* <ProductList products={[
        {product_name: "Менажница", 
        category_id: 11111111,
        pieces_in_pack: 1,
        material_id:1,
        weight: 200,
        height: 10,
        lenght: 300,
        width: 200,
        description: "описание", }
      ]} /> */}

    </div>
  );
}

export default App;
