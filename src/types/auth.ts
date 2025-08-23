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
export type { IPokmas, IStunting, IGaleri, IProdukUnggulan };
