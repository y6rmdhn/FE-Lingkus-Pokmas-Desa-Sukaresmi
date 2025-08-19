import MainLayout from "@/components/layouts/MainLayout";
// Impor Card dan CardContent
import { Card, CardContent } from "@/components/ui/card";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const articles = [
  {
    id: 1,
    imageUrl: "/img/Rectangle 5427.png",
    title: "Hutan Kota Menghadirkan Event...",
    description: "Hutan Kota merupakan destinasi tujuan...",
    date: "30 JUL 2025",
  },
  {
    id: 6,
    imageUrl: "/img/Rectangle 5427.png",
    title: "Hutan Kota Menghadirkan Event...",
    description: "Hutan Kota merupakan destinasi tujuan...",
    date: "30 JUL 2025",
  },
  {
    id: 6,
    imageUrl: "/img/Rectangle 5427.png",
    title: "Hutan Kota Menghadirkan Event...",
    description: "Hutan Kota merupakan destinasi tujuan...",
    date: "30 JUL 2025",
  },
  {
    id: 6,
    imageUrl: "/img/Rectangle 5427.png",
    title: "Hutan Kota Menghadirkan Event...",
    description: "Hutan Kota merupakan destinasi tujuan...",
    date: "30 JUL 2025",
  },
  {
    id: 6,
    imageUrl: "/img/Rectangle 5427.png",
    title: "Hutan Kota Menghadirkan Event...",
    description: "Hutan Kota merupakan destinasi tujuan...",
    date: "30 JUL 2025",
  },
];

const DesaSukaresmi = () => {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  return (
    <MainLayout>
      <section className="mt-28 px-4 sm:px-10 md:px-20 mb-20">
        <h1 className="mb-4 text-3xl md:text-4xl font-bold text-[#0F828C]">
          EDUKASI MASYARAKAT
        </h1>
        <p className="text-lg text-gray-600 font-semibold">
          Menyajikan informasi terbaru tentang peristiwa, berita terkini, dan
          artikel-artikel jurnalistik dari Desa Sukaresmi
        </p>

        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <Link to="/kegiatan/edukasi-masyarakat/detail">
              <Card
                key={article.id}
                className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                {/* Wadah gambar tidak memiliki padding dan berada langsung di dalam Card */}
                <div className="aspect-video">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Gunakan CardContent untuk memberi padding hanya pada area ini */}
                <CardContent className="p-5 relative pb-16">
                  <h3 className="font-bold text-xl mb-2 text-gray-800 truncate">
                    {article.title}
                  </h3>
                  <p className="text-sm text-gray-600 truncate">
                    {article.description}
                  </p>
                  <div className="absolute bottom-5 right-5 bg-sky-100 text-sky-800 text-xs font-bold py-2 px-3 rounded-md">
                    {article.date}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </section>

      <section>
        <div className="bg-[#F5F5F5] py-20 px-4 sm:px-10 md:px-20">
          <h1 className="text-3xl md:text-4xl font-bold text-[#0F828C] mb-6">
            GALERI DESA
          </h1>
          <p className="text-lg text-gray-600 font-semibold mb-8">
            Menampilkan kegiatan-kegiatan yang berlangsung di Desa
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {articles.map((article) => (
              <Card
                key={article.id}
                className="overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="aspect-video">
                  <img
                    src={article.imageUrl}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </MainLayout>
  );
};

export default DesaSukaresmi;
