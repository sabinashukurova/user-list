import axios from "axios";

const baseService = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-type": "application/json",
  },
});

export default baseService;
