import type { IPokmas, IStunting } from "@/types/auth";
import axiosInstance from "../lib/axiosInstance";

type ILogin = {
  username: string;
  password: string;
};

const authServices = {
  login: (payload: ILogin) => axiosInstance.post(`/auth/login`, payload),
  logout: () => axiosInstance.post(`/auth/logout`),
  fasilitas: (payload: FormData) => axiosInstance.post(`/fasilitas`, payload),
  updateFasilitas: (id: string, payload: FormData) =>
    axiosInstance.put(`/fasilitas/${id}`, payload),
  deleteFasilitas: (id: string) => axiosInstance.delete(`/fasilitas/${id}`),
  pokmas: (payload: IPokmas) =>
    axiosInstance.post(`/kelompok-masyarakat`, payload),
  updatePokmas: (id: string, payload: IPokmas) =>
    axiosInstance.put(`/kelompok-masyarakat/${id}`, payload),
  deletePokmas: (id: string) =>
    axiosInstance.delete(`/kelompok-masyarakat/${id}`),
  desa: (payload: FormData) => axiosInstance.post(`/desa`, payload),
  updateDesa: (id: string, payload: FormData) =>
    axiosInstance.put(`/desa/${id}`, payload),
  deleteDesa: (id: string) => axiosInstance.delete(`/desa/${id}`),
  stunting: (payload: IStunting) => axiosInstance.post(`/stunting`, payload),
  updateStunting: (id: string, payload: IStunting) =>
    axiosInstance.put(`/stunting/${id}`, payload),
  deleteStunting: (id: string) => axiosInstance.delete(`/stunting/${id}`),
  galeri: (payload: FormData) => axiosInstance.post(`/galeri`, payload),
  updateGaleri: (id: string, payload: FormData) =>
    axiosInstance.put(`/galeri/${id}`, payload),
  deleteGaleri: (id: string) => axiosInstance.delete(`/galeri/${id}`),
};

export default authServices;
