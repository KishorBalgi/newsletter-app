import axios from "axios";

export const useAxios = () => {
  const axiosInstance = axios.create({
    baseURL: process.env.API_URL || process.env.NEXT_PUBLIC_API_URL,
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  });

  return axiosInstance;
};
