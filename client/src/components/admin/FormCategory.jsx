import React, { useEffect, useState } from "react";
import { createCategory, removeCategory } from "../../api/category";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";

const FormCategory = () => {
  const token = useEcomStore((state) => state.token);
  const categories = useEcomStore((state) => state.categories);
  const getCategory = useEcomStore((state) => state.getCategory);

  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (token) getCategory(token);
  }, [token]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) return toast.warning("Please fill in the category name");

    setIsLoading(true);
    try {
      const res = await createCategory(token, { name });
      toast.success(`Category "${res.data.name}" added successfully!`);
      setName("");
      getCategory(token);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add category");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRemove = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this category?"
    );
    if (!confirmDelete) return;

    try {
      const res = await removeCategory(token, id);
      toast.success(`Deleted category "${res.data.name}"`);
      getCategory(token);
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete category");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-xl">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 flex items-center gap-2">
        📁 Category Management
      </h1>

      {/* Form Input */}
      <form
        onSubmit={handleSubmit}
        className="flex flex-col sm:flex-row gap-3 mb-8"
      >
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="flex-1 border border-gray-300 rounded-lg px-4 py-2 text-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 transition"
          type="text"
          placeholder="Enter new category"
        />
        <button
          type="submit"
          disabled={isLoading}
          className={`px-5 py-2 rounded-lg text-white font-semibold transition duration-200 ${
            isLoading
              ? "bg-blue-300 cursor-not-allowed"
              : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {isLoading ? "Adding..." : "Add"}
        </button>
      </form>

      {/* Category List */}
      <div>
        <h2 className="text-xl font-medium text-gray-700 mb-3">
          🗂 Existing Categories
        </h2>
        <ul className="space-y-3">
          {categories.length === 0 ? (
            <p className="text-gray-500 italic">No categories available.</p>
          ) : (
            categories.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center bg-gray-50 border border-gray-200 rounded-lg px-4 py-2 hover:shadow transition"
              >
                <span className="text-gray-800 font-medium">{item.name}</span>
                <button
                  onClick={() => handleRemove(item.id)}
                  className="bg-red-500 text-white px-4 py-1.5 rounded-md hover:bg-red-600 transition"
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
