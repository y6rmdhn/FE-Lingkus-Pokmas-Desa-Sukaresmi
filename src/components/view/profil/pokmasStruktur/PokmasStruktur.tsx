import SubTitle from "@/components/block/subitle/SubTitle";
import Title from "@/components/block/title/Title";
import MainLayout from "@/components/layouts/MainLayout";
// 1. Impor komponen Card dan CardFooter dari shadcn/ui
import { Card, CardFooter } from "@/components/ui/card";

// 2. Siapkan data untuk anggota tim dalam sebuah array
const teamMembers = [
  {
    id: 1,
    // Ganti dengan path foto asli jika sudah ada
    imageUrl: null,
    name: "Ir. Lorem, S.T",
    role: "Kepala Desa",
  },
  {
    id: 2,
    imageUrl: null,
    name: "Ir. Lorem, S.T",
    role: "Kepala Desa",
  },
  {
    id: 3,
    imageUrl: null,
    name: "Ir. Lorem, S.T",
    role: "Kepala Desa",
  },
  {
    id: 4,
    imageUrl: null,
    name: "Ir. Lorem, S.T",
    role: "Kepala Desa",
  },
  {
    id: 5,
    imageUrl: null,
    name: "Ir. Lorem, S.T",
    role: "Kepala Desa",
  },
  {
    id: 6,
    imageUrl: null,
    name: "Ir. Lorem, S.T",
    role: "Kepala Desa",
  },
];

const PokmasStruktur = () => {
  return (
    <MainLayout>
      <div className="pt-28 px-20 bg-gray-100 pb-10">
        <Title>Struktur Organisasi Kelompok Masyarakat</Title>
        <SubTitle>
          Struktur Organisasi Kelompok Masyarakat Desa Sukaresmi
        </SubTitle>
        <img src="/img/Rectangle 5429.png" alt="" className="mt-16 w-full" />
      </div>

      <div className="py-10 px-4 sm:px-10 md:px-20">
        <Title>KELOMPOK MASYARAKAT DESA</Title>

        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {teamMembers.map((member) => (
            <Card
              key={member.id}
              className="overflow-hidden rounded-lg shadow-lg text-center"
            >
              <div className="aspect-square bg-gray-200 flex items-center justify-center">
                {member.imageUrl ? (
                  <img
                    src={member.imageUrl}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-400">Foto</span>
                )}
              </div>

              <CardFooter className="bg-[#0F828C] text-white flex-col items-center justify-center p-4">
                <p className="font-bold text-lg">{member.name}</p>
                <p className="text-sm opacity-90">{member.role}</p>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default PokmasStruktur;
