import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { User, Lock } from "lucide-react";
import { Link } from "react-router-dom";

// Komponen utama untuk halaman login
const LoginPage = () => {
  return (
    // 1. Wadah utama untuk latar belakang layar penuh
    <div className="relative h-screen w-full">
      {/* Gambar latar belakang */}
      <img
        src="/img/bg.png"
        alt="Latar belakang desa"
        className="absolute inset-0 h-full w-full object-cover"
      />
      {/* Overlay gelap untuk membuat form lebih terbaca */}
      <div className="absolute inset-0 bg-black/30" />

      {/* 2. Konten di tengah layar */}
      <div className="relative z-10 flex h-full items-center justify-center">
        <Card className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl py-6">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-[#0F828C]">
              E-Lingkus Desa Sukaresmi
            </CardTitle>
            <CardTitle className="text-xl font-semibold tracking-tight pt-4">
              SIGN IN
            </CardTitle>
            <CardDescription className="pt-1">
              Untuk Mengakses, dipersilahkan untuk login terlebih dahulu.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* 3. Input dengan Ikon */}
            <div className="relative">
              <Input
                type="text"
                placeholder="Username / Email"
                className="pl-10 h-12"
              />
              <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
            <div className="relative">
              <Input
                type="password"
                placeholder="Password"
                className="pl-10 h-12"
              />
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            </div>
          </CardContent>
          <CardFooter>
            <Link to="/admin/data-kelompok-masyarakat" className="w-full">
              <Button className="w-full h-12 bg-[#0F828C] hover:bg-[#0c6a74] text-base">
                Login
              </Button>
            </Link>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
