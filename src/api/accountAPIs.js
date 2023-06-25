import axios from "axios";

const api = axios.create({
  baseURL: `http://localhost:3001/api/`,
  // baseURL: `${process.env.REACT_APP_API_URL}`,
});

function options(token) {
  const options = {
    headers: {
      "x-access-token": token,
    },
  };
  return options;
}

const login = (payload) => api.post(`/authenticate`, payload);
const updateToken = () => api.put(`/authenticate`, options(localStorage.getItem("refreshToken")));
const logout = () => api.delete(`/authenticate`, options(sessionStorage.getItem("accessToken")));

const getAccount = (payload) => api.get(`/account`, payload);
const getAccounts = () => api.get(`/account`, options(sessionStorage.getItem("accessToken")));
const createAccount = (payload) =>
  api.post(`/account`, payload, options(sessionStorage.getItem("accessToken")));
const updateAccount = (query, payload) =>
  api.put(`/account/${query}`, payload, options(sessionStorage.getItem("accessToken")));
const deleteAccount = (query) =>
  api.delete(`/account/${query}`, options(sessionStorage.getItem("accessToken")));

export default {
  // Authentication
  login,
  updateToken,
  logout,
  // Account
  getAccount,
  getAccounts,
  createAccount,
  updateAccount,
  deleteAccount,
};
