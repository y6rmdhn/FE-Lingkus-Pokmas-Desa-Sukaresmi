import MainLayout from "@/components/layouts/MainLayout";
import { Card } from "@/components/ui/card";
import { useEffect } from "react";

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

const FasilitasPublik = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <MainLayout>
      <div className="flex flex-col">
        {/* Bagian 2: Peta Sekertariat */}
        <div className="px-4 py-20 sm:px-10 md:px-20">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F828C]">
            PETA FASILITAS PUBLIK
          </h1>
          <p className="text-lg text-gray-600 font-semibold">
            Menampilkan Peta Sekretariat Kelompok Masyarakat Desa Sukaresmi
          </p>
          <img
            src="/img/Rectangle 5424.png"
            alt="Peta Sekretariat"
            className="mt-8 w-3/4 rounded-lg shadow-lg mx-auto"
          />
        </div>

        {/* Bagian 3: Data Kelompok Masyarakat */}
        <div className="px-4 py-20 sm:px-10 md:px-20">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F828C]">
            DATA FASILITAS PUBLIK
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

export default FasilitasPublik;
