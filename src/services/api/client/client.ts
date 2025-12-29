// src/services/api/client/client.ts
import axios from "axios";

// Sin /api aquí
const client = axios.create({
  baseURL: "http://localhost:8888",
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export default client;