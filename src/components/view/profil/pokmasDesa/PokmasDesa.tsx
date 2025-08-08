import MainLayout from "@/components/layouts/MainLayout";
import { Card } from "@/components/ui/card";

const dataKelompok = [
  {
    id: 1,
    value: "1.032",
    label: "Penduduk",
  },
  { id: 2, value: "1.032", label: "Penduduk" },
  { id: 3, value: "1.032", label: "Penduduk" },
  { id: 4, value: "1.032", label: "Penduduk" },
  { id: 5, value: "1.032", label: "Penduduk" },
  { id: 6, value: "1.032", label: "Penduduk" },
];

const PokmasDesa = () => {
  return (
    <MainLayout>
      <div className="flex flex-col">
        {/* Bagian 1: Sejarah */}
        <div className="flex items-center gap-10 px-4 py-20 sm:px-10 md:px-20 bg-[#F5F5F5] h-screen">
          <img
            src="/img/Ellipse 216.jpg"
            alt="Sejarah Desa"
            className="hidden lg:block w-1/3 rounded-full object-cover"
          />
          <div className="flex-1">
            <h1 className="mb-6 text-3xl md:text-4xl font-bold text-[#0F828C]">
              Sejarah Kelompok Masyarakat Desa Suka Resmi
            </h1>
            <p className="text-gray-600 text-justify">
              Isi untuk sejarah kelompok masyarakat desa sukaresmi... Lorem
              ipsum dolor sit amet, consectetur adipiscing elit. Ut rutrum elit
              tortor, at elementum massa blandit ut. Nam dapibus pulvinar
              scelerisque. Duis posuere elit sit amet justo lobortis iaculis.
            </p>
          </div>
        </div>

        {/* Bagian 2: Peta Sekertariat */}
        <div className="px-4 py-20 sm:px-10 md:px-20">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F828C]">
            PETA SEKRETARIAT POKMAS
          </h1>
          <p className="text-lg text-gray-600 font-semibold">
            Menampilkan Peta Sekretariat Kelompok Masyarakat Desa Sukaresmi
          </p>
          <img
            src="/img/Rectangle 5424.png"
            alt="Peta Sekretariat"
            className="mt-8 w-full rounded-lg shadow-lg"
          />
        </div>

        {/* Bagian 3: Data Kelompok Masyarakat */}
        <div className="px-4 py-20 sm:px-10 md:px-20">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F828C]">
            DATA KELOMPOK MASYARAKAT
          </h1>
          <p className="text-lg text-gray-600 font-semibold">
            Sistem digital yang berfungsi mempermudah pengelolaan data dan
            informasi terkait dengan kependudukan dan pendayagunaannya untuk
            pelayanan publik yang efektif dan efisien
          </p>

          <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
            {dataKelompok.map((item) => (
              <Card
                key={item.id}
                className="rounded-lg shadow-lg overflow-hidden border-none 
                           bg-gradient-to-r from-[#0F828C] from-10% to-white to-65%"
              >
                <div className="flex items-center justify-between p-5">
                  <span className="text-2xl font-bold text-white">
                    {item.value}
                  </span>
                  <div className="flex items-center gap-3">
                    <span className="text-base font-bold text-gray-800">
                      {item.label}
                    </span>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PokmasDesa;
