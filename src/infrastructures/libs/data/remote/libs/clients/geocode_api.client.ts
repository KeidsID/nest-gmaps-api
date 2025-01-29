import axios, { type AxiosInstance } from "axios";

export const GeocodeApiClient = (apiKey: string): AxiosInstance => {
  return axios.create({
    baseURL: "https://maps.googleapis.com/maps/api/geocode/json",
    params: { key: apiKey },
  });
};
