import axios from "axios";

export const createProduct = async (token, form) => {
  return axios.post("http://localhost:5005/api/product", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
export const listProduct = async (token, count = 20) => {
  return axios.get("http://localhost:5005/api/product"+count , {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};