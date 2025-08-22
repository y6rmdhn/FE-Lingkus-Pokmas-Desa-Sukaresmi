import { Button } from "@/components/ui/button";
import MainLayout from "@/components/layouts/MainLayout";
import { FaWhatsapp } from "react-icons/fa";
import { useEffect } from "react";

const productDetail = {
  id: 1,
  name: "Ayam Kecap Pak Kumis",
  price: "Rp.13.000",
  description:
    "Ayam kecap pak kumis dibikin menggunakan ayam kampung asli dengan bumbu rempah-rempah pilihan yang meresap hingga ke tulang. Cocok dinikmati dengan nasi hangat.",
  imageUrl: "/img/Rectangle 5427 (1).png", // Ganti dengan path gambar Anda
  whatsappLink:
    "https://wa.me/6281234567890?text=Halo,%20saya%20tertarik%20dengan%20produk%20Ayam%20Kecap%20Pak%20Kumis.", // Ganti dengan nomor WA Anda
};

const DetailProdukUnggulan = () => {

  useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, []);

  return (
    <MainLayout>
      <div className="bg-gray-100 py-20 sm:py-28">
        <div className="container mx-auto px-4">
          {/* Wadah utama dengan bayangan dan sudut melengkung */}
          <div className="bg-white rounded-xl shadow-lg p-6 sm:p-8">
            {/* 2. Layout 2 kolom menggunakan Flexbox */}
            <div className="flex flex-col md:flex-row gap-8 md:gap-10">
              {/* Kolom Kiri: Gambar Produk */}
              <div className="md:w-2/5">
                <img
                  src={productDetail.imageUrl}
                  alt={productDetail.name}
                  className="w-full h-auto object-cover rounded-lg aspect-square"
                />
              </div>

              {/* Kolom Kanan: Detail Informasi */}
              <div className="md:w-3/5 flex flex-col">
                <h1 className="text-3xl sm:text-4xl font-bold text-gray-900">
                  {productDetail.name}
                </h1>
                <p className="text-2xl sm:text-3xl font-semibold text-[#0F828C] mt-2">
                  {productDetail.price}
                </p>
                <p className="text-base text-gray-600 mt-4 leading-relaxed">
                  {productDetail.description}
                </p>

                {/* Tombol diletakkan di bagian bawah menggunakan mt-auto */}
                <div className="mt-10">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gray-100 text-gray-800 font-semibold hover:bg-gray-200 w-full sm:w-auto"
                  >
                    <a
                      href={productDetail.whatsappLink}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <FaWhatsapp className="mr-2 h-5! w-5!" />
                      Hubungi Penjual
                    </a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DetailProdukUnggulan;
