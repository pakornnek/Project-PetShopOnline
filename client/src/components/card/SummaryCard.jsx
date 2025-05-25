import React, { useState, useEffect, useCallback } from "react";
import { listUserCart, saveAddress } from "../../api/user";
import useEcomeStore from "../../store/ecom-store";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SummaryCard = () => {
  const token = useEcomeStore((state) => state.token);
  const [products, setProducts] = useState([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [address, setAddress] = useState("");
  const [addressSaved, setAddressSaved] = useState(false);

  const navigate = useNavigate();

  const hdlGetUserCart = useCallback((token) => {
    listUserCart(token)
      .then((res) => {
        setProducts(res.data.products);
        setCartTotal(res.data.cartTotal);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (token) {
      hdlGetUserCart(token);
    }
  }, [hdlGetUserCart, token]);

  const hdlSaveAddress = () => {
    if (!address) {
      return toast.warning("Please fill address");
    }
    saveAddress(token, address)
      .then((res) => {
        toast.success(res.data.message);
        setAddressSaved(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const hdlGoToPayment = () => {
    if (!addressSaved) {
      return toast.warning("กรุณากรอกที่อยู่ก่อนจ้า");
    }
    navigate("/user/payment");
  };

  return (
    <div className="mx-auto">
      <div className="flex flex-wrap gap-4">
        {/* Left */}
        <div className="w-full md:w-2/4">
          <div className="bg-gray-100 p-4 rounded-md shadow-md border space-y-4">
            <h1 className="font-bold text-lg">ที่อยู่ในการจัดส่ง</h1>
            <textarea
              required
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="กรุณากรอกที่อยู่"
              className="w-full px-2 py-2 rounded-md border border-gray-300"
            />
            <button
              onClick={hdlSaveAddress}
              className="bg-blue-500 text-white px-4 py-2 rounded-md shadow-md hover:bg-blue-700 hover:scale-105 hover:translate-y-1 duration-200"
            >
              Save Address
            </button>
          </div>
        </div>

        {/* Right */}
        <div className="w-full md:w-2/4">
          <div className="bg-gray-100 p-4 rounded-md shadow-md border space-y-4">
            <h1 className="text-lg font-bold">คำสั่งซื้อของคุณ</h1>

            {/* Item List */}
            {products?.map((item, index) => (
              <div key={index}>
                <div className="flex justify-between items-end">
                  <div>
                    <p className="font-bold">{item.product.title}</p>
                    <p className="text-sm">
                      {item.count} x {item.product.price.toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-red-500 font-bold">
                      {(item.count * item.product.price).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Summary */}
            <div>
              <div className="flex justify-between">
                <p>ค่าจัดส่ง:</p>
                <p>0.00</p>
              </div>

              <div className="flex justify-between">
                <p>ส่วนลด:</p>
                <p>0.00</p>
              </div>
              <hr />
              <div className="flex justify-between">
                <p className="font-bold">ยอดรวมสุทธิ:</p>
                <p className="text-red-500 font-bold text-lg">
                  {cartTotal.toFixed(2)}
                </p>
              </div>
              <hr />
              <div>
                <button
                  onClick={hdlGoToPayment}
                  className="bg-green-600 w-full p-2 rounded-md shadow-md text-white hover:bg-green-800"
                >
                  ดำเนินการชำระเงิน
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SummaryCard;
