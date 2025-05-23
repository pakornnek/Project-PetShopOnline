import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
const SearchCard = () => {
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const actionSearchFilters = useEcomStore(
    (state) => state.actionSearchFilters
  );

  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [text, setText] = useState("");
  const [categorySelected, setCategorySelected] = useState([]);
  const [price, setprice] = useState([0, 5000]);
  const [ok, setOk] = useState(false);

  useEffect(() => {
    getCategory();
  });

  //Search by Text

  useEffect(() => {
    const delay = setTimeout(() => {
      if (text) {
        actionSearchFilters({ query: text });
      } else {
        getProduct();
      }
      return () => clearTimeout(delay);
    }, 300);
  }, [text]);

  //Search by Category
  const handleCheck = (e) => {
    const inCheck = e.target.value; //ค่าที่เรา ติ๊ก
    const inState = [...categorySelected]; // [1,2,3]arr ว่าง
    const findCheck = inState.indexOf(inCheck); //ถ้าไม่เจอ จะ return -1

    if (findCheck === -1) {
      inState.push(inCheck);
    } else {
      inState.splice(findCheck, 1);
    }
    setCategorySelected(inState);

    if (inState.length > 0) {
      actionSearchFilters({ category: inState });
    } else {
      getProduct();
    }
  };

  console.log(categorySelected);
  //Search by Price

  useEffect(() => {
    actionSearchFilters({price})
  }, [ok]);
  const handlePrice = (value) => {
    console.log(value);
    setprice(value)


    setTimeout(()=>{
      setOk(!ok)
    },300)
  };
  return (
    <div>
      <h1 className="text-xl font-bold mb-4">ค้นหาสินค้า</h1>
      {/* Search by Text*/}
      <input
        onChange={(e) => setText(e.target.value)}
        type="text"
        placeholder="ค้นหาสินค้า..."
        className="border rounded-md w-full md-4"
      />
      <hr />
      {/* Search by Text*/}
      <div>
        <h1>หมวดหมู่สินค้า</h1>
        <div>
          {categories.map((item, index) => (
            <div key={index} className="flex gap-2">
              <input onChange={handleCheck} value={item.id} type="checkbox" />
              <label>{item.name}</label>
            </div>
          ))}
        </div>
      </div>
      <hr />
      {/* Search by Price*/}
      <div>
        <h1>ค้นหาราคา</h1>
        <div>
          <div className="flex justify-between">
            <span>Min : {price[0]}</span>
            <span>Max : {price[1]} </span>
          </div>

          <Slider
            onChange={handlePrice}
            range
            min={0}
            max={5000}
            defaultValue={[0, 5000]}
          />
        </div>
      </div>
    </div>
  );
};

export default SearchCard;
