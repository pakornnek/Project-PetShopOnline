import { useEffect, useState } from "react";
import useEcomStore from "../../store/ecom-store";
import { createProduct } from "../../api/product";
import { toast } from "react-toastify";

const initialState = {
  title: "",
  description: "",
  price: 0,
  quantity: 0,
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
      getProduct(token, 20);
    }
  }, [token]);

  const handleonChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
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
      console.log(err);
      toast.error("เกิดข้อผิดพลาดในการเพิ่มสินค้า");
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-xl rounded-2xl">
      <form onSubmit={handleSubmit}>
        <h1 className="text-xl font-bold mb-4">เพิ่มข้อมูลสินค้า</h1>

        <input
          className="border p-2 w-full mb-2"
          value={form.title}
          onChange={handleonChange}
          placeholder="ชื่อสินค้า"
          name="title"
        />
        <input
          className="border p-2 w-full mb-2"
          value={form.description}
          onChange={handleonChange}
          placeholder="รายละเอียดสินค้า"
          name="description"
        />
        <input
          type="number"
          className="border p-2 w-full mb-2"
          value={form.price}
          onChange={handleonChange}
          placeholder="ราคา"
          name="price"
        />
        <input
          type="number"
          className="border p-2 w-full mb-2"
          value={form.quantity}
          onChange={handleonChange}
          placeholder="จำนวนในคลัง"
          name="quantity"
        />
        <select
          className="border p-2 w-full mb-4"
          name="categoryId"
          onChange={handleonChange}
          required
          value={form.categoryId}
        >
          <option value="" disabled>
            เลือกหมวดหมู่
          </option>
          {categories.map((item, index) => (
            <option key={index} value={item.id}>
              {item.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
        >
          เพิ่มสินค้า
        </button>

        <hr className="my-6" />

        <h2 className="text-lg font-semibold mb-2">รายการสินค้า</h2>
        <table className="table-auto w-full border">
          <thead>
            <tr className="bg-gray-100">
              <th className="border px-2 py-1">No.</th>
              <th className="border px-2 py-1">ชื่อ</th>
              <th className="border px-2 py-1">รายละเอียด</th>
              <th className="border px-2 py-1">ราคา</th>
              <th className="border px-2 py-1">จำนวน</th>
              <th className="border px-2 py-1">ขายแล้ว</th>
              <th className="border px-2 py-1">วันที่อัปเดต</th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => (
              <tr key={item.id || index}>
                <td className="border px-2 py-1">{index + 1}</td>
                <td className="border px-2 py-1">{item.title}</td>
                <td className="border px-2 py-1">{item.description}</td>
                <td className="border px-2 py-1">{item.price}</td>
                <td className="border px-2 py-1">{item.quantity}</td>
                <td className="border px-2 py-1">{item.sold}</td>
                <td className="border px-2 py-1">
                  {new Date(item.updatedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </form>
    </div>
  );
};

export default FormProduct;
