import axios from "axios";
const request = axios.create({
  baseURL: "http://localhost:3000",
});

const createAuthRequest = (token) => {
  return axios.create({
    baseURL: "http://localhost:3000",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export { createAuthRequest, request };

export default request;
