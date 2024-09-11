import axios from "axios";
import { config } from "../config/config";

const { API_URL } = config;

export const apiClient = axios.create({
  baseURL: `${API_URL}/api/v1`,
  headers: { Authorization: `Bearer ${config.API_KEY}` },
  timeout: 10000,
});
