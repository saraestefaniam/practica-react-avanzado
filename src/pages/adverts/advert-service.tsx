import { client } from "../../api/client";

export const getAdverts = (filters = {}) => {
  return client.get("/api/v1/adverts", {
    params: filters,
  });
};

export const getAdvertById = (id: string) => {
  return client.get(`/api/v1/adverts/${id}`);
};

export const createAdvert = (formData: FormData) => {
  return client.post("/api/v1/adverts", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  });
};

export const deleteAdvert = (id: string) => {
  return client.delete(`/api/v1/adverts/${id}`);
};

export const getAdvertsTags = () => {
  return client.get("/api/v1/adverts/tags");
};
