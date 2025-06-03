import React, { useEffect, useState } from "react";
import { getListAllUsers } from "../../api/admin";
import useEcomStore from "../../store/ecom-store";
import { changeUserStatus, changeUserRole } from "../../api/admin";
import {toast} from 'react-toastify'
const TableUsers = () => {
  const token = useEcomStore((state) => state.token);
  const [users, setUsers] = useState([]);
  useEffect(() => {
    handleGetUsers(token);
  }, []);

  const handleGetUsers = (token) => {
    getListAllUsers(token)
      .then((res) => {
        setUsers(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChangeUsersStatus = (userId, userStatus) => {
    console.log(userId, userStatus);
    const value = {
      id: userId,
      enabled: !userStatus,
    };

    changeUserStatus(token, value)
      .then((res) => {
        console.log(res);
        handleGetUsers(token);
        toast.success("Update Role Success!!");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const handleChangeUsersRole = (userId, userRole) => {
    // console.log(userId, userStatus);
    const value = {
      id: userId,
      role: userRole,
    };

    changeUserRole(token, value)
      .then((res) => {
        console.log(res);
        handleGetUsers(token);
        toast.success('Update Role Success!!')
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container mx-auto p-6 bg-white shadow-lg rounded-xl">
      <table className="w-full">
        <thead>
          <tr>
            <th>ลำดับ</th>
            <th>สิทธิ์</th>
            <th>สถานะ</th>
            <th>จัดการ</th>
          </tr>
        </thead>
        <tbody>
          {users?.map((item, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{item.email}</td>

              <td>
                <select
                  onChange={(e) =>
                    handleChangeUsersRole(item.id, e.target.value)
                  }
                  value={item.role}
                >
                  <option>user</option>
                  <option>admin</option>
                </select>
              </td>

              <td>{item.enabled ? "Active" : "Inactive"}</td>

              <td>
                <button
                  className="bg-yellow-300  teext-white p-1 rounded-md shadow-md"
                  onClick={() => handleChangeUsersStatus(item.id, item.enabled)}
                >
                  {item.enabled ? "Disable" : "Enable"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableUsers;
