import axios from "axios";

const api = axios.create({
  baseURL: "https://taskflow-ai-backend-app.onrender.com",
});

export default api;
