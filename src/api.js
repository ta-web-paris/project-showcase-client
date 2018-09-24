import axios from "axios";

const { REACT_APP_SERVER_URL } = process.env;


const api = axios.create({
  withCredentials: true,
  baseURL: `${REACT_APP_SERVER_URL}/api`,
});


export default api;
