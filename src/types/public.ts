interface FasilitasData {
  id: string;
  nama: string;
  kategori: string;
  kondisi: string;
  latitude: string;
  longitude: string;
  image: string;
  createdAt: string; // Or Date if you plan to parse it
  updatedAt: string; // Or Date if you plan to parse it
}

interface PokmasData {
  id: string;
  nama: string;
  data: string;
}

interface Pagination {
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
}

interface ApiResponse {
  success: boolean;
  message: string;
  data: FasilitasData[];
  pagination: Pagination;
}

export type { FasilitasData, Pagination, ApiResponse, PokmasData };
