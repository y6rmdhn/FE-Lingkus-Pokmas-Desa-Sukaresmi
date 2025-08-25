type IPokmas = {
  nama: string;
  data: string;
};

type IStunting = {
  id?: string;
  jumlah_stunting: string;
  jumlah_balita: string;
  tanggal: string;
};

type IGaleri = {
  id: string;
  judul: string;
  deskripsi: string;
  image: string;
  date: string;
};

type IProdukUnggulan = {
  nama_produk: string;
  konten: string;
  image: string;
  harga: number;
  kontak: string;
};

type IManajememUser = {
  username: string;
  currentPassword: string;
  newPassword: string;
};

type KontenDesaData = {
  id: string;
  konten: string; // From the API, this is a JSON string
  image: string | null; // URL to the image, which can be null
  createdAt: string; // Typically an ISO date string
  updatedAt: string; // Typically an ISO date string
};

type BeritaData = {
  id: string;
  judul: string;
  konten: string;
  penulis: string;
  tanggal: string; // Berupa string tanggal, contoh: "2025-08-25 09:00:00"
  image: string | null; // URL gambar dari server, bisa jadi null jika tidak ada gambar
};

type KontenPokmasData = {
  // atau KontenPokmasData
  id: string;
  konten: string; // Dari API, ini adalah JSON string
  image: string | null; // URL gambar dari server, bisa null
  createdAt: string; // String tanggal ISO
  updatedAt: string; // String tanggal ISO
};

export type {
  IPokmas,
  IStunting,
  IGaleri,
  IProdukUnggulan,
  IManajememUser,
  KontenDesaData,
  BeritaData,
  KontenPokmasData,
};
