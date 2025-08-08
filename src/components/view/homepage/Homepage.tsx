import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Homepage = () => {
  return (
    <MainLayout>
      <section
        className="relative h-screen bg-cover bg-center flex items-center justify-center"
        style={{ backgroundImage: "url('/img/bg.png')" }}
        aria-label="Sawah dan rumah adat Desa Sukaresmi"
      >
        <div className="relative z-10 text-center text-black px-4">
          <h1 className="text-2xl md:text-5xl font-bold">
            Selamat Datang <br /> E-Lingkus POKMAS Desa Sukaresmi
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto">
            Sumber informasi terbaru tentang kelompok masyarakat di Desa
            Sukaresmi
          </p>
        </div>
      </section>

      <section className="bg-white py-30 px-6 w-full">
        <div className="w-full px-20">
          <h1 className="text-4xl font-bold text-[#0F828C]">
            Jelajahi POKMAS Desa Sukaresmi
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed">
            Melalui website ini Anda dapat menjelajahi segala hal yang terkait
            dengan Kelompok Masyarakat Desa Sukaresmi. Aspek sejarah pokmas,
            profil, struktur organisasi, demografi, potensi Desa, dan juga
            berita tentang Desa.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-16">
            <Card>
              <CardHeader className="flex items-center justify-center">
                <img src="/icons/Vector.png" alt="vector 1" />
              </CardHeader>
              <CardContent className="text-center">
                <p className="font-bold text-[#0F828C]">DATA STUNTING</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center justify-center">
                <img src="/icons/chart-histogram 1.png" alt="vector 1" />
              </CardHeader>
              <CardContent className="text-center">
                <p className="font-bold text-[#0F828C]">FASILITAS PUBLIK</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center justify-center">
                <img src="/icons/Vector (1).png" alt="vector 1" />
              </CardHeader>
              <CardContent className="text-center">
                <p className="font-bold text-[#0F828C]">EDUKASI MASYARAKAT</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex items-center justify-center">
                <img src="/icons/Vector (2).png" alt="vector 1" />
              </CardHeader>
              <CardContent className="text-center">
                <p className="font-bold text-[#0F828C]">PRODUK UNGGULAN</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Homepage;
