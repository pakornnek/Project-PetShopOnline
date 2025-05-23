import React from "react";
import { Trash2 } from "lucide-react";

const CartCard = () => {
  return (
    <div>
      <h1 className="text-2xl font-bold">ตะกร้าสินค้า</h1>
      {/* Border*/}
      <div className="border p-2">
        {/* Card*/}
        <div className="bg-white p-2">
          {/*Row1*/}
          <div className="flex justify-between mb-2">
            {/*Left */}
            <div className="flex gap-2 items-center">
              <div className="w-16 h-16 bg-gray-200 rounded-md flex text-center items-center">
                No Image
              </div>
              <div>
                <p className="font-bold">Title</p>
                <p className="text-sm">Description</p>
              </div>
            </div>
            {/*right */}
            <div className="text-red-500 p-2">
              <Trash2 />
            </div>
          </div>
          {/*Row2*/}

          <div className="flex justify-between ">
            {/*Left*/}
            <div className="border rounded-sm px-2 py-1">
              <button className="px-2 py-1 bg-gray-200 rounded-sm hover:bg-red-300">
                -
              </button>
              <span className="px-4 ">1</span>
              <button className="px-2 py-1 bg-gray-200 rounded-sm hover:bg-gray-500">
                +
              </button>
            </div>

            {/*Right*/}
            <div className="font-bold text-blue-500"> 350</div>
          </div>
        </div>
        {/* Total*/}
        <div className="flex justify-between px-2">
            <span>รวม</span>
            <span>2000</span>
        </div>
        {/* Button*/}
        <button className="mt-4 bg-green-500 hover:bg-green-700 text-white w-full py-2 rounded-md">ดำเนินการชำระเงิน</button>
      </div>
    </div>
  );
};

export default CartCard;
