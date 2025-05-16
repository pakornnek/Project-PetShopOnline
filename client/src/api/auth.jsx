import axios from 'axios';

export const currentUser = async(token) =>
  await axios.post(
    "http://localhost:5005/api/current-user",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  export const currentAdmin = async (token) => {
    return await axios.post(
      "http://localhost:5005/api/current-admin",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
}