import React, { useEffect } from "react";
import ProductCard from "../components/card/ProductCard";
import useEcomStore from "../store/ecom-store";
import SearchCard from "../components/card/SearchCard";
import CartCard from "../components/card/CartCard";
const Shop = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);

  useEffect(() => {
    getProduct();
  }, []);
  return (
    <div className="flex">
      {/* search Bar */}
      <div className="w-1/4 bg-gray-100">
      
      <SearchCard/>
  
      </div>

      {/* product */}
      <div className="w-1/2 p-4 h-screen overflow-auto">
        <p className="text-2xl font-bold mb-4">สินค้าทั้งหมด</p>
        <div className="flex flex-wrap gap-4">
          {/* product  card*/}
          {products.map((item, index) => (
            <ProductCard key={index} item={item} />
          ))}

          {/* product  card*/}
        </div>
      </div>

      {/* cart */}
      <div className="w-1/4 bg-gray-100 h-screen overflow-auto">
      <CartCard/>
      
      </div>
    </div>
  );
};

export default Shop;
