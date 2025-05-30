import axios from "axios";
import storage from "../utils/storage";

export const client = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export const setAuthorizationHeader = (accesToken: string) => {
  client.defaults.headers.common["Authorization"] = `Bearer ${accesToken}`;
};

export const removeAuthorizationHeader = () => {
  delete client.defaults.headers.common["Authorization"];
};

const storedToken = storage.get("auth")
if (storedToken) {
  setAuthorizationHeader(storedToken);
}
