import ky from "ky";
import { authStorage } from "./authStorage";

const api = ky.create({
  prefixUrl: "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

api.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        const token = authStorage.getAuthToken();
        request.headers.set("Authorization", `Bearer ${token}`);
      },
    ],
    afterResponse: [
      (response) => {
        console.log(response);
        return response.json();
      },
    ],
  },
});

export default api;
