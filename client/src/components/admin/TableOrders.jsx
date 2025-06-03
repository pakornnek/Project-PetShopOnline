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

  return (
    <div className="container mx-auto p-6 bg-white shadow-xl rounded-xl">
      <h2 className="text-2xl font-semibold mb-4">รายการสั่งซื้อ</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 rounded-lg">
          <thead>
            <tr className="bg-gray-100 text-left text-sm font-semibold text-gray-700">
              <th className="p-3 border">ลำดับ</th>
              <th className="p-3 border">ผู้ใช้งาน</th>
              <th className="p-3 border">วันที่</th>
              <th className="p-3 border">สินค้า</th>
              <th className="p-3 border">รวม</th>
              <th className="p-3 border">สถานะ</th>
              <th className="p-3 border">จัดการ</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((item, index) => (
              <tr
                key={index}
                className="text-sm text-gray-800 hover:bg-gray-50 transition-all"
              >
                <td className="p-3 border text-center">{index + 1}</td>
                <td className="p-3 border">
                  <p className="font-medium">{item.orderedBy.email}</p>
                  <p className="text-xs text-gray-500">
                    {item.orderedBy.address}
                  </p>
                </td>
                <td>{dateFormat(item.createdAt)}</td>
                <td className="p-3 border">
                  <ul className="list-disc pl-4 space-y-1">
                    {item.products?.map((product, i) => (
                      <li key={i}>
                        <span className="font-medium">
                          {product.product.title}
                        </span>{" "}
                        <span className="text-sm text-gray-500">
                          ({product.count} ×{" "}
                          {numberFormat(product.product.price)})
                        </span>
                      </li>
                    ))}
                  </ul>
                </td>
                <td className="p-3 border">
                  {numberFormat(item.cartTotal)} บาท
                </td>
                <td className="p-3 border">
                  <span
                    className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                      item.orderStatus
                    )}`}
                  >
                    {item.orderStatus}
                  </span>
                </td>
                <td className="p-3 border">
                  <select
                    className="px-3 py-1 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                    value={item.orderStatus}
                    onChange={(e) =>
                      handleChangeOrderStatus(token, item.id, e.target.value)
                    }
                  >
                    <option>Not Process</option>
                    <option>Processing</option>
                    <option>Completed</option>
                    <option>Cancelled</option>
                  </select>
                </td>
              </tr>
            ))}
            {orders.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center p-6 text-gray-500">
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
