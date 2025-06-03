import React, { useEffect, useState } from "react";
import { getOrdersAdmin, changeOrderStatus } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { numberFormat } from "../../utils/number";
import { dateFormat } from "../../utils/dateformat";

const TableOrders = () => {
  const token = useEcomStore((state) => state.token);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    handleGetOrder(token);
  }, []);

  const handleGetOrder = (token) => {
    getOrdersAdmin(token)
      .then((res) => setOrders(res.data))
      .catch((err) => console.log(err));
  };

  const handleChangeOrderStatus = (token, orderId, orderStatus) => {
    changeOrderStatus(token, orderId, orderStatus)
      .then(() => {
        toast.success("อัปเดตสถานะสำเร็จ!");
        handleGetOrder(token);
      })
      .catch((err) => console.log(err));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Not Process":
        return "bg-gray-200 text-gray-700";
      case "Processing":
        return "bg-yellow-100 text-yellow-700";
      case "Completed":
        return "bg-green-100 text-green-700";
      case "Cancelled":
        return "bg-red-100 text-red-700";
      default:
        return "bg-gray-100 text-gray-600";
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
    <div className="max-w-7xl mx-auto p-6 bg-white shadow-xl rounded-2xl">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        รายการสั่งซื้อทั้งหมด
      </h2>

      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="min-w-full text-sm table-auto">
          <thead className="bg-gray-50 text-gray-700 uppercase tracking-wide text-xs font-semibold">
            <tr>
              <th className="px-4 py-3 border">ลำดับ</th>
              <th className="px-4 py-3 border">ผู้ใช้งาน</th>
              <th className="px-4 py-3 border">วันที่</th>
              <th className="px-4 py-3 border">สินค้า</th>
              <th className="px-4 py-3 border">รวม</th>
              <th className="px-4 py-3 border">สถานะ</th>
              <th className="px-4 py-3 border">อัปเดตสถานะ</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 text-gray-800">
            {orders.map((item, index) => (
              <tr key={index} className="hover:bg-gray-50 transition-all">
                <td className="px-4 py-3 text-center border">{index + 1}</td>
                <td className="px-4 py-3 border">
                  <p className="font-medium">{item.orderedBy.email}</p>
                  <p className="text-xs text-gray-500 truncate">
                    {item.orderedBy.address}
                  </p>
                </td>
                <td className="px-4 py-3 border">
                  {dateFormat(item.createdAt)}
                </td>
                <td className="px-4 py-3 border">
                  <ul className="space-y-1">
                    {item.products.map((p, i) => (
                      <li key={i}>
                        <span className="font-semibold">{p.product.title}</span>{" "}
                        <span className="text-xs text-gray-500">
                          ({p.count} × {numberFormat(p.product.price)})
                        </span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="px-4 py-3 border font-semibold">
                  {numberFormat(item.cartTotal)} บาท
                </td>
                <td className="px-4 py-3 border">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      item.orderStatus
                    )}`}
                  >
                    {translateStatus(item.orderStatus)}
                  </span>
                </td>
                <td className="px-4 py-3 border">
                  <select
                    className="w-full px-2 py-1 rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={item.orderStatus}
                    onChange={(e) =>
                      handleChangeOrderStatus(token, item.id, e.target.value)
                    }
                  >
                    <option value="Not Process">ยังไม่ดำเนินการ</option>
                    <option value="Processing">กำลังดำเนินการ</option>
                    <option value="Completed">เสร็จสิ้น</option>
                    <option value="Cancelled">ยกเลิก</option>
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="7" className="text-center py-6 text-gray-500">
                  ไม่มีข้อมูลคำสั่งซื้อ
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TableOrders;
