import React, { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { readProduct, updateProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { useParams, useNavigate } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
  categoryId: "",
  images: [],
};

const FormEditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);

  const [form, setForm] = useState(initialState);

  useEffect(() => {
    getCategory();
    fetchProduct();
  }, []);

  const fetchProduct = async () => {
    try {
      const res = await readProduct(token, id);
      setForm(res.data);
    } catch (err) {
      console.error("Error fetching product:", err);
    }
  };

  const handleOnChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await updateProduct(token, id, form);
      toast.success(`แก้ไข ${res.data.title} สำเร็จ`);
      navigate("/admin/product");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow-md">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h1 className="text-2xl font-bold mb-4">แก้ไขข้อมูลสินค้า</h1>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className="block font-medium mb-1">ชื่อสินค้า</label>
            <input
              className="w-full border border-gray-300 p-2 rounded"
              value={form.title}
              onChange={handleOnChange}
              name="title"
              placeholder="Title"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">รายละเอียด</label>
            <input
              className="w-full border border-gray-300 p-2 rounded"
              value={form.description}
              onChange={handleOnChange}
              name="description"
              placeholder="Description"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">ราคา</label>
            <input
              type="number"
              className="w-full border border-gray-300 p-2 rounded"
              value={form.price}
              onChange={handleOnChange}
              name="price"
              required
            />
          </div>

          <div>
            <label className="block font-medium mb-1">จำนวน</label>
            <input
              type="number"
              className="w-full border border-gray-300 p-2 rounded"
              value={form.quantity}
              onChange={handleOnChange}
              name="quantity"
              required
            />
          </div>

          <div className="col-span-1 sm:col-span-2">
            <label className="block font-medium mb-1">หมวดหมู่</label>
            <select
              className="w-full border border-gray-300 p-2 rounded"
              name="categoryId"
              onChange={handleOnChange}
              value={form.categoryId}
              required
            >
              <option value="">-- กรุณาเลือกหมวดหมู่ --</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="pt-4">
          <Uploadfile form={form} setForm={setForm} />
        </div>

        <div className="text-right">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-2 rounded shadow"
          >
            บันทึกการแก้ไข
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormEditProduct;
