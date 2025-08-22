import axios from "axios";
import { reduxStore, type RootState } from "@/store/store";
import environment from "@/config/environment";
import { toast } from "sonner";
import { clearUserData } from "@/store/userSlice";

const axiosInstance = axios.create({
  baseURL: environment.API_URL,
  timeout: 60000,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const state: RootState = reduxStore.getState();
    const token = state.user.token;

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

const forceLogout = () => {
  reduxStore.dispatch(clearUserData());
  toast.error("Sesi Anda telah berakhir. Silakan login kembali.");
  setTimeout(() => {
    window.location.href = "/login";
  }, 1500);
};

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      const status = error.response.status;
      const responseData = error.response.data;
      const genericMessage = "Terjadi kesalahan pada server, coba lagi nanti.";
      const message = responseData?.message || responseData?.error;

      if (status === 401) {
        if (message === "Unauthorized") {
          forceLogout();
        } else {
          toast.error(message || "Terjadi kesalahan autentikasi!");
        }
      }
      // 🔹 Tambahan pengecekan untuk 403 token expired
      else if (status === 403) {
        if (message === "Akses ditolak, token sudah kedaluwarsa") {
          forceLogout();
        } else {
          toast.error(message || "Anda tidak memiliki akses!");
        }
      } else {
        toast.error(message || genericMessage);
      }
    } else if (error.request) {
      toast.error(
        "Tidak dapat terhubung ke server. Periksa koneksi internet Anda."
      );
    } else {
      toast.error("Terjadi kesalahan yang tidak terduga.");
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
