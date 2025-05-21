import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct } from "../../api/product";
import { toast } from "react-toastify";
import Uploadfile from "./Uploadfile";
import { Link } from "react-router-dom";

const initialState = {
  title: "",
  description: "",
  price: "",
  quantity: "",
  categoryId: "",
  images: [],
};

const FormProduct = () => {
  const token = useEcomStore((state) => state.token);
  const getCategory = useEcomStore((state) => state.getCategory);
  const categories = useEcomStore((state) => state.categories);
  const getProduct = useEcomStore((state) => state.getProduct);
  const products = useEcomStore((state) => state.products);
  const [form, setForm] = useState(initialState);

  useEffect(() => {
    if (token) {
      getCategory(token);
      getProduct(token, 100);
    }
  }, [token]);

  const handleonChange = (e) => {
    const { name, value, type } = e.target;
    setForm({
      ...form,
      [name]: type === "number" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await createProduct(token, form);
      toast.success(`เพิ่มข้อมูล ${res.data.title} สำเร็จ`);
      await getProduct(token, 20);
      setForm(initialState);
    } catch (err) {
      console.error(err);
      toast.error("เกิดข้อผิดพลาดในการเพิ่มสินค้า");
    }
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-xl">
      <form onSubmit={handleSubmit} className="space-y-4">
        <h1 className="text-2xl font-bold text-gray-700 mb-4">
          🛒 เพิ่มข้อมูลสินค้า
        </h1>

        <input
          type="text"
          className="border p-2 w-full rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.title}
          onChange={handleonChange}
          placeholder="ชื่อสินค้า"
          name="title"
          required
        />
        <input
          type="text"
          className="border p-2 w-full rounded-md"
          value={form.description}
          onChange={handleonChange}
          placeholder="รายละเอียดสินค้า"
          name="description"
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="number"
            className="border p-2 w-full rounded-md"
            value={form.price}
            onChange={handleonChange}
            placeholder="ราคา"
            name="price"
            min={0}
            required
          />
          <input
            type="number"
            className="border p-2 w-full rounded-md"
            value={form.quantity}
            onChange={handleonChange}
            placeholder="จำนวนในคลัง"
            name="quantity"
            min={0}
            required
          />
        </div>

        <select
          className="border p-2 w-full rounded-md"
          name="categoryId"
          onChange={handleonChange}
          required
          value={form.categoryId}
        >
          <option value="" disabled>
            เลือกหมวดหมู่
          </option>
          {categories.map((item) => (
            <option key={item.id} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <Uploadfile form={form} setForm={setForm} />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg transition"
        >
          ➕ เพิ่มสินค้า
        </button>
      </form>

      {/* ตารางสินค้า */}
      <hr className="my-6" />
      <h2 className="text-xl font-semibold text-gray-700 mb-4">
        📦 รายการสินค้า
      </h2>

      <div className="overflow-auto">
        <table className="min-w-full border text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-700 font-semibold">
              <th className="border px-3 py-2">No.</th>
              <th className="border px-3 py-2">รูปภาพ</th>
              <th className="border px-3 py-2">ชื่อ</th>
              <th className="border px-3 py-2">รายละเอียด</th>
              <th className="border px-3 py-2">ราคา</th>
              <th className="border px-3 py-2">จำนวน</th>
              <th className="border px-3 py-2">ขายแล้ว</th>
              <th className="border px-3 py-2">อัปเดต</th>
              <th className="border px-3 py-2">การจัดการ</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="border px-3 py-2 text-center">{index + 1}</td>
                <td className="border px-3 py-2 text-center">
                  {item.images.length > 0 ? (
                    <img
                      src={item.images[0].url}
                      alt={item.title}
                      className="w-16 h-16 object-cover rounded-md shadow"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-gray-200 rounded flex items-center justify-center text-xs text-gray-500">
                      No Image
                    </div>
                  )}
                </td>
                <td className="border px-3 py-2">{item.title}</td>
                <td className="border px-3 py-2">{item.description}</td>
                <td className="border px-3 py-2 text-right">{item.price}</td>
                <td className="border px-3 py-2 text-right">{item.quantity}</td>
                <td className="border px-3 py-2 text-right">{item.sold}</td>
                <td className="border px-3 py-2 text-center">
                  {new Date(item.updatedAt).toLocaleDateString()}
                </td>
                <td className="border px-3 py-2 text-center space-y-1">
                  <Link
                    to={`/admin/product/${item.id}`}
                    className="inline-block bg-yellow-500 hover:bg-yellow-600 text-white px-3 py-1 rounded-md shadow"
                  >
                    แก้ไข
                  </Link>
                  <button className="block bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md shadow mt-1">
                    ลบ
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default FormProduct;
