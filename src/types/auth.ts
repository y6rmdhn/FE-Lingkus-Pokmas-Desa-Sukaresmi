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

export type { IPokmas, IStunting, IGaleri };
