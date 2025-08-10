import { CalendarDays, User } from "lucide-react";
import MainLayout from "@/components/layouts/MainLayout";

// 1. Siapkan data untuk artikel utama dan sidebar.
//    Ini akan memudahkan jika nanti data diambil dari API.
const mainArticle = {
  title:
    "Gerakan Bebersih Serentak di Desa Sukaresmi Bersama Kelompok Masyarakat",
  date: "31 Juli 2025",
  author: "Administrator",
  imageUrl: "/img/Rectangle 5436.png", // Ganti dengan path gambar Anda
  // Konten bisa dalam format HTML untuk paragraf
  content: `
    <p>Nunc maximus vulputate augue, ac eleifend nulla feugiat eu. Praesent tristique risus et felis ultricies, laoreet ullamcorper tellus gravida. Integer feugiat lectus sapien, varius sodales erat tincidunt vitae. Vivamus vel luctus lectus, vitae aliquet enim. Cras ac commodo ex, nec magna, eleifend commodo dui. Nulla eu luctus bibendum, Curabitur magna a mattis nec. In est nulla, euismod sit amet justo id, rhoncus finibus magna. Curabitur accumsan eu lorem non posuere. Fusce id efficitur nibh. Curabitur quis mollis lectus.</p>
    <p>Aliquam erat volutpat. Pellentesque eu mi quam. Vivamus eu augue eu nisl elementum, non varius velit mollis. Quisque luctus leo non dapibus eleifend aliquet. Phasellus ut gravida ex, vitae finibus elit. Vestibulum quis hendrerit diam. Duis auctor quam ante, eu blandit ligula cursus fringilla. Curabitur nibh justo, fringilla a finibus id, porttitor sit amet lorem. Integer eget lorem non massa, facilisis urna ut, eleifend est. Curabitur vel gravida felis, quis posuere dolor.</p>
  `,
};

const sidebarArticles = [
  {
    id: 1,
    title: "Ini Judul Artikel Lainnya...",
    date: "31 Juli 2025",
    imageUrl: "/img/Rectangle 5436.png",
  },
  {
    id: 2,
    title: "Ini Judul Artikel Lainnya...",
    date: "30 Juli 2025",
    imageUrl: "/img/Rectangle 5436.png",
  },
  {
    id: 3,
    title: "Ini Judul Artikel Lainnya...",
    date: "29 Juli 2025",
    imageUrl: "/img/Rectangle 5436.png",
  },
  {
    id: 4,
    title: "Ini Judul Artikel Lainnya...",
    date: "28 Juli 2025",
    imageUrl: "/img/Rectangle 5436.png",
  },
];

export default function DetailEdukasiMasyarakat() {
  return (
    <MainLayout>
      {/* Latar belakang halaman */}
      <div className="bg-gray-100 pt-32 pb-20">
        <div className="mx-auto px-20">
          {/* Layout Grid: 2 kolom untuk konten utama, 1 kolom untuk sidebar */}
          <div className="w-full">
            {/* Kolom Konten Utama (Kiri) */}
            <main className="lg:col-span-2 bg-white p-6 sm:p-8 rounded-xl shadow-lg">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 leading-tight">
                {mainArticle.title}
              </h1>
              {/* Metadata: Tanggal dan Penulis */}
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-gray-500 mb-6">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  <span>{mainArticle.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  <span>ditulis oleh {mainArticle.author}</span>
                </div>
              </div>

              {/* Gambar Utama Artikel */}
              <img
                src={mainArticle.imageUrl}
                alt={mainArticle.title}
                className="w-full h-auto rounded-lg mb-6"
              />

              {/* Isi Konten Artikel */}
              <div
                className="prose max-w-none text-gray-700"
                dangerouslySetInnerHTML={{ __html: mainArticle.content }}
              />
            </main>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
