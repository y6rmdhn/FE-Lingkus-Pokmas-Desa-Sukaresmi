import axiosInstance from "../lib/axiosInstance";

const publicServices = {
  fasilitas: () => axiosInstance.get(`/fasilitas`),
  pokmas: () => axiosInstance.get(`/kelompok-masyarakat`),
  desa: () => axiosInstance.get(`/desa`),
  stunting: () => axiosInstance.get(`/stunting`),
  galeri: () => axiosInstance.get(`/galeri`),
};

export default publicServices;
