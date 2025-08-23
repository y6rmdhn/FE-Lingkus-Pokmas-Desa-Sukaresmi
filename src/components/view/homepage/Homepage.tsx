import DataStuntingIcon from "@/components/block/icons/DataStuntingIcon";
import EdukasiMasyarakatIcon from "@/components/block/icons/EdukasiMasyarakatIcon";
import FasilitasPublikIcon from "@/components/block/icons/FasilitasPublikIcon";
import ProdukUnggulan from "@/components/block/icons/ProdukUnggulan";
import MainLayout from "@/components/layouts/MainLayout";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Link } from "react-router-dom";

// 1. Import Swiper
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";

// 2. Import Swiper CSS
// @ts-ignore
import "swiper/css";
// @ts-ignore
import "swiper/css/pagination";
// @ts-ignore
import "swiper/css/navigation";

const Homepage = () => {
  return (
    <MainLayout>
      {/* Section ini diubah menjadi Swiper Carousel */}
      <section className="h-screen w-full">
        <Swiper
          spaceBetween={0}
          centeredSlides={true}
          autoplay={{
            delay: 3500, // Waktu slide dalam milidetik (3.5 detik)
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
          }}
          navigation={true}
          loop={true}
          modules={[Autoplay, Pagination, Navigation]}
          className="mySwiper h-full w-full"
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <div
              className="relative h-full w-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/img/bg2.jpeg')",
              }}
              aria-label="Sawah dan rumah adat Desa Sukaresmi"
            >
              <div className="relative z-10 text-center px-4 -mt-40">
                <h1 className="text-2xl md:text-5xl font-bold text-[#106D63]">
                  <span className="text-[#F39C12]">Selamat Datang</span> <br />{" "}
                  E-Lingkus POKMAS Desa Sukaresmi
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white">
                  Sumber informasi terbaru tentang kelompok masyarakat di Desa
                  Sukaresmi
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 2 (Contoh Tambahan) */}
          <SwiperSlide>
            <div
              className="relative h-full w-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/img/bg-produk.jpeg')", // Ganti dengan gambar lain
              }}
              aria-label="Produk unggulan Desa Sukaresmi"
            >
              <div className="relative z-10 text-center px-4">
                <h1 className="text-2xl md:text-5xl font-bold text-[#106D63]">
                  <span className="text-[#F39C12]">Selamat Datang</span> <br />{" "}
                  E-Lingkus POKMAS Desa Sukaresmi
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white">
                  Sumber informasi terbaru tentang kelompok masyarakat di Desa
                  Sukaresmi
                </p>
              </div>
            </div>
          </SwiperSlide>

          {/* Slide 3 (Contoh Tambahan) */}
          <SwiperSlide>
            <div
              className="relative h-full w-full bg-cover bg-center flex items-center justify-center"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url('/img/bg-edukasi.jpeg')", // Ganti dengan gambar lain
              }}
              aria-label="Edukasi masyarakat di Desa Sukaresmi"
            >
              <div className="relative z-10 text-center px-4">
                <h1 className="text-2xl md:text-5xl font-bold text-[#106D63]">
                  <span className="text-[#F39C12]">Selamat Datang</span> <br />{" "}
                  E-Lingkus POKMAS Desa Sukaresmi
                </h1>
                <p className="mt-4 text-lg md:text-xl max-w-2xl mx-auto text-white">
                  Sumber informasi terbaru tentang kelompok masyarakat di Desa
                  Sukaresmi
                </p>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </section>

      <section className="bg-white py-20 px-6 w-full">
        <div className="w-full px-4 md:px-20">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F828C] text-center md:text-left">
            Jelajahi POKMAS Desa Sukaresmi
          </h1>
          <p className="mt-6 text-lg text-gray-600 leading-relaxed text-center md:text-left">
            Melalui website ini Anda dapat menjelajahi segala hal yang terkait
            dengan Kelompok Masyarakat Desa Sukaresmi. Aspek sejarah pokmas,
            profil, struktur organisasi, demografi, potensi Desa, dan juga
            berita tentang Desa.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-16">
            <Link to="/kegiatan/data-stunting">
              <Card className="py-10 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex items-center justify-center">
                  <DataStuntingIcon />
                </CardHeader>
                <CardContent className="text-center">
                  <p className="font-bold text-[#0F828C]">DATA STUNTING</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/kegiatan/fasilitas-publik">
              <Card className="py-10 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex items-center justify-center">
                  <FasilitasPublikIcon />
                </CardHeader>
                <CardContent className="text-center">
                  <p className="font-bold text-[#0F828C]">FASILITAS PUBLIK</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/kegiatan/edukasi-masyarakat">
              <Card className="py-10 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex items-center justify-center">
                  <EdukasiMasyarakatIcon />
                </CardHeader>
                <CardContent className="text-center">
                  <p className="font-bold text-[#0F828C]">EDUKASI MASYARAKAT</p>
                </CardContent>
              </Card>
            </Link>
            <Link to="/kegiatan/produk-unggulan">
              <Card className="py-10 hover:shadow-lg transition-shadow duration-300">
                <CardHeader className="flex items-center justify-center">
                  <ProdukUnggulan />
                </CardHeader>
                <CardContent className="text-center">
                  <p className="font-bold text-[#0F828C]">PRODUK UNGGULAN</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default Homepage;
