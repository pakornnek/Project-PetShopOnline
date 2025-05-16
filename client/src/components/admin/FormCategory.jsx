import React, { useEffect, useState } from "react";
import {
  createCategory,
  listCategory,
  removeCategory,
} from "../../api/category";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";

const FormCategory = () => {
  const token = useEcomStore((state) => state.token);
  const [name, setName] = useState("");
  // const [categories, setCategories] = useState([]);
const categories = useEcomStore((state)=>state.categories)
const getCategory = useEcomStore((state)=>state.getCategory)
  useEffect(() => {
    getCategory(token);
  }, []);



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      return toast.warning("Please fill in the category name");
    }

    try {
      const res = await createCategory(token, { name });
      toast.success(`Category "${res.data.name}" added successfully!`);
      setName("");
      getCategory(token);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add category");
    }
  };

  const handleRemove = async (id) => {
    try {
      const res = await removeCategory(token, id);
      toast.success(`Deleted category "${res.data.name}"`);
      getCategory(token);
    } catch (err) {
      console.log(err);
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <h1 className="text-2xl font-semibold text-gray-800 mb-6">
        📁 Category Management
      </h1>

      {/* ฟอร์มเพิ่มหมวดหมู่ */}
      <form onSubmit={handleSubmit} className="flex gap-3 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
          type="text"
          placeholder="Enter category name"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
        >
          Add
        </button>
      </form>

      {/* รายการหมวดหมู่ */}
      <div>
        <h2 className="text-lg font-medium text-gray-700 mb-2">
          Existing Categories
        </h2>
        <ul className="space-y-3">
          {categories.length === 0 ? (
            <p className="text-gray-500">No categories available.</p>
          ) : (
            categories.map((item, index) => (
              <li
                key={index}
                className="flex justify-between items-center bg-gray-100 rounded-lg px-4 py-2 shadow-sm"
              >
                <span className="text-gray-800">{item.name}</span>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default FormCategory;
