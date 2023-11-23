import axios from "axios";

export const api = axios.create({
  baseURL: "https://noted-server.onrender.com",
});
