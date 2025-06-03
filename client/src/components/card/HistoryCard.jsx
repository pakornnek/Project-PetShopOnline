import { useState, useEffect } from "react";
import { getOrders } from "../../api/user";
import useEcomStore from "../../store/ecom-store";
import { dateFormat } from "../../utils/dateformat";
import { numberFormat } from "../../utils/number";

const HistoryCard = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    hdlGetOrders(token);
  }, []);

  const hdlGetOrders = (token) => {
    getOrders(token)
      .then((res) => {
        setOrders(res.data.orders);
      })
      .catch((err) => console.log(err));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-gray-200 text-gray-800";
      case "Processing":
        return "bg-blue-200 text-blue-800";
      case "Completed":
        return "bg-green-200 text-green-800";
      case "Cancelled":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const translateStatus = (status) => {
    switch (status) {
      case "Not Process":
        return "ยังไม่ดำเนินการ";
      case "Processing":
        return "กำลังดำเนินการ";
      case "Completed":
        return "เสร็จสิ้น";
      case "Cancelled":
        return "ยกเลิก";
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto px-4">
      <h1 className="text-3xl font-bold text-gray-800">ประวัติการสั่งซื้อ</h1>

      {orders.length === 0 && (
        <div className="text-center text-gray-500 mt-8">
          ไม่มีประวัติคำสั่งซื้อ
        </div>
      )}

      {orders.map((item, index) => (
        <div
          key={index}
          className="bg-white p-6 rounded-xl shadow-md border border-gray-200 space-y-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b pb-3">
            <div>
              <p className="text-sm text-gray-500">วันที่สั่งซื้อ</p>
              <p className="text-md font-semibold text-gray-700">
                {dateFormat(item.updatedAt)}
              </p>
            </div>
            <span
              className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                item.orderStatus
              )}`}
            >
              {translateStatus(item.orderStatus)}
            </span>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left border-collapse">
              <thead className="bg-gray-100 text-gray-700 font-medium">
                <tr>
                  <th className="px-4 py-2 border">สินค้า</th>
                  <th className="px-4 py-2 border">ราคา</th>
                  <th className="px-4 py-2 border">จำนวน</th>
                  <th className="px-4 py-2 border">ราคารวม</th>
                </tr>
              </thead>
              <tbody className="text-gray-800">
                {item.products.map((p, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="px-4 py-2 border">{p.product.title}</td>
                    <td className="px-4 py-2 border">
                      {numberFormat(p.product.price)} บาท
                    </td>
                    <td className="px-4 py-2 border">{p.count}</td>
                    <td className="px-4 py-2 border">
                      {numberFormat(p.count * p.product.price)} บาท
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Total */}
          <div className="text-right">
            <p className="text-sm text-gray-600">ราคาสุทธิ</p>
            <p className="text-lg font-bold text-green-700">
              {numberFormat(item.cartTotal)} บาท
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default HistoryCard;
