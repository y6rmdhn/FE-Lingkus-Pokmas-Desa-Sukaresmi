import { Card } from "@/components/ui/card";
import MainLayout from "@/components/layouts/MainLayout"; // Asumsikan Anda punya MainLayout
import { Link } from "react-router-dom";
import { useEffect } from "react";

// 1. Siapkan data produk dalam sebuah array.
const products = [
  {
    id: 1,
    imageUrl: "/img/Rectangle 5427 (1).png", // Ganti dengan path gambar produk Anda
    name: "Ayam Kecap Pak Kumis",
    price: "Rp. 13.000",
  },
  {
    id: 2,
    imageUrl: "/img/Rectangle 5427 (1).png",
    name: "Ayam Kecap Pak Kumis",
    price: "Rp. 13.000",
  },
  {
    id: 3,
    imageUrl: "/img/Rectangle 5427 (1).png",
    name: "Ayam Kecap Pak Kumis",
    price: "Rp. 13.000",
  },
  {
    id: 4,
    imageUrl: "/img/Rectangle 5427 (1).png",
    name: "Ayam Kecap Pak Kumis",
    price: "Rp. 13.000",
  },
  {
    id: 5,
    imageUrl: "/img/Rectangle 5427 (1).png",
    name: "Ayam Kecap Pak Kumis",
    price: "Rp. 13.000",
  },
  {
    id: 6,
    imageUrl: "/img/Rectangle 5427 (1).png",
    name: "Ayam Kecap Pak Kumis",
    price: "Rp. 13.000",
  },
];

const ProdukUnggulanPage = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <MainLayout>
      {/* Latar belakang untuk seluruh bagian */}
      <div className="bg-gray-100 pt-32 pb-20">
        <div className="container mx-auto px-4">
          <Link to="/kegiatan/produk-unggulan/detail">
            {/* Judul dan Subjudul */}
            <div className="text-left mb-12">
              <h1 className="text-3xl md:text-4xl font-bold text-[#0F828C]">
                PRODUK UNGGULAN
              </h1>
              <p className="text-lg text-gray-600 font-semibold mt-2">
                Layanan yang disediakan promosi produk UMKM Desa sehingga mampu
                meningkatkan perekonomian masyarakat Desa
              </p>
            </div>

            {/* 2. Layout Grid untuk kartu produk */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* 3. Gunakan .map() untuk merender setiap produk */}
              {products.map((product) => (
                <Card
                  key={product.id}
                  className="overflow-hidden rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
                >
                  {/* Gambar Produk */}
                  <div className="aspect-video">
                    <img
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  {/* Konten Kartu */}
                  <div className="p-5 relative pb-20">
                    <h3 className="font-bold text-xl text-gray-800">
                      {product.name}
                    </h3>
                    {/* Label Harga */}
                    <div className="absolute bottom-5 right-5 bg-[#0F828C] text-white text-sm font-semibold py-2 px-4 rounded-lg">
                      {product.price}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </Link>
        </div>
      </div>
    </MainLayout>
  );
};

export default ProdukUnggulanPage;
