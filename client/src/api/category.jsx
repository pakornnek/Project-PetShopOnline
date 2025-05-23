import axios from "axios";

export const createCategory = async (token, form) => {
  return axios.post("http://localhost:5005/api/category", form, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export const listCategory = async () => {
  return axios.get("http://localhost:5005/api/category",);
};

export const removeCategory = async (token, id) => {
  return axios.delete(`http://localhost:5005/api/category/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
