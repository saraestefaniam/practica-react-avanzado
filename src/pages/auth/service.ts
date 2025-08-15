import { client, setAuthorizationHeader } from "../../api/client";
import storage from "../../utils/storage";

export async function login(credentials: { email: string; password: string }) {
  const { data } = await client.post("/login", credentials);
  
  // Guardar token
  storage.set("auth", data.accessToken);
  setAuthorizationHeader(data.accessToken);

  return data;
}

export function logout() {
  storage.remove("auth");
  window.location.href = "/login"; // o router.navigate
}