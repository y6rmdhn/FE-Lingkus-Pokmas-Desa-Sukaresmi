"use client";

import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { LogOut, LayoutDashboard } from "lucide-react";
import { cn } from "@/lib/utils";

// Data untuk item navigasi, mudah dikelola di sini
const navItems = [
  {
    href: "/admin/data-kelompok-masyarakat",
    label: "Manajemen Data Kelompok Masyarakat",
  },
  { href: "/admin/data-desa", label: "Manajemen Data Desa" },
  { href: "/admin/data-stunting", label: "Manajemen Data Stunting" },
  {
    href: "/admin/data-fasilitas-publik",
    label: "Manajemen Data Fasilitas Publik",
  },
  {
    href: "/admin/data-edukasi-masyarakat",
    label: "Manajemen Data Edukasi Masyarakat",
  },
  { href: "/admin/data-galeri", label: "Manajemen Galeri" },
  { href: "/admin/data-produk-unggulan", label: "Manajemen Produk Unggulan" },
  { href: "/admin/manajement-user", label: "Manajemen User" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <aside className="h-screen w-72 bg-white shadow-lg flex flex-col p-4">
      {/* Logo Placeholder */}
      <div className="h-24 my-6 rounded-md flex items-center justify-center">
        <img
          src="/icons/ChatGPT Image Aug 18, 2025, 09_25_18 PM.png"
          alt="logo-pokmas-desa"
          className="w-30"
        />
      </div>

      {/* Tombol Logout */}
      <Link to="/">
        <Button size="lg" className="w-full text-base mb-6">
          <LogOut className="mr-2 h-5 w-5" />
          Logout
        </Button>
      </Link>

      {/* Daftar Navigasi */}
      <nav className="flex flex-col space-y-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              "flex items-center rounded-md px-3 py-2 text-sm font-medium transition-colors hover:bg-gray-100",
              location.pathname === item.href
                ? "bg-[#0F828C] text-white hover:bg-[#0c6a74]"
                : "text-gray-700"
            )}
          >
            <LayoutDashboard className="mr-3 h-5 w-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  );
}
