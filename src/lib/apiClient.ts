import { ofetch } from "ofetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const apiClient = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include",

  onResponseError({ response }) {
    const data = response._data;

    console.log("API Error:", {
      status: response.status,
      data,
    });
  },
});

export default apiClient;
