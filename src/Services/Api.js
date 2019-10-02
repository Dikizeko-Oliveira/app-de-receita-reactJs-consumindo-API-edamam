import axios from "axios";

const API = axios.create({
  baseURL: "https://api.edamam.com/"
});

export default API;
