import axios from "axios";

const api = axios.create({
  baseURL: "https://taskflow-ai-backend-be18.onrender.com",
});

export default api;
