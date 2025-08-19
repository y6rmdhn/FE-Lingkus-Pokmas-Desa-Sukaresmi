import * as React from "react";
// 1. Impor useLocation dari react-router-dom
import { Link, useLocation } from "react-router-dom";

// Impor semua komponen yang dibutuhkan dari shadcn/ui
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

// Definisikan struktur menu sebagai array of objects (tidak ada perubahan di sini)
const menuItems = [
  {
    title: "Beranda",
    href: "/",
  },
  {
    title: "Profil",
    subItems: [
      {
        title: "Profil POKMAS Desa Sukaresmi",
        href: "/profil/pokmas-desa-sukaresmi",
      },
      {
        title: "Profil Desa Sukaresmi",
        href: "/profil/desa-sukaresmi",
      },
      {
        title: "Struktur POKMAS Desa Sukaresmi",
        href: "/profil/struktur-pokmas-desa-sukaresmi",
      },
      {
        title: "Struktur Desa Sukaresmi",
        href: "/profil/struktur-organisasi-desa-sukaresmi",
      },
    ],
  },
  {
    title: "Kegiatan",
    subItems: [
      { title: "Data Stunting", href: "/kegiatan/data-stunting" },
      { title: "Fasilitas Publik", href: "/kegiatan/fasilitas-publik" },
      { title: "Edukasi Masyarakat", href: "/kegiatan/edukasi-masyarakat" },
      { title: "Produk Unggulan Desa", href: "/kegiatan/produk-unggulan" },
    ],
  },
];

// Komponen Header utama yang baru
export default function Header() {
  // 2. Dapatkan objek lokasi, lalu ambil pathname-nya
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <header className="fixed top-0 left-0 z-30 w-full bg-white/30 backdrop-blur-md">
      <nav className="container mx-auto flex items-center justify-between px-4 py-2">
        <div className="text-lg font-bold text-black">
          <img
            src="/icons/ChatGPT Image Aug 18, 2025, 09_25_18 PM.png"
            alt="logo-desa"
            className="w-16 h-16"
          />
        </div>
        <div className="flex items-center space-x-6">
          <NavigationMenu viewport={false}>
            <NavigationMenuList>
              {menuItems.map((item) => {
                // 3. Logika untuk menentukan apakah trigger dropdown aktif
                const isTriggerActive =
                  item.subItems?.some(
                    (subItem) => subItem.href === currentPath
                  ) ?? false;

                return (
                  <NavigationMenuItem key={item.title}>
                    {item.subItems ? (
                      <>
                        <NavigationMenuTrigger
                          // 4. Terapkan style aktif pada trigger
                          className={cn(isTriggerActive && "text-[#0F828C]")}
                        >
                          {item.title}
                        </NavigationMenuTrigger>
                        <NavigationMenuContent>
                          <ul className="grid w-[200px] gap-3 p-4 md:w-[250px]">
                            {item.subItems.map((subItem) => {
                              const isSubItemActive =
                                subItem.href === currentPath;
                              return (
                                <ListItem
                                  key={subItem.title}
                                  href={subItem.href}
                                  title={subItem.title}
                                  // 5. Terapkan style aktif pada sub-item
                                  className={cn(
                                    isSubItemActive &&
                                      "bg-teal-50 text-[#0F828C] hover:bg-teal-100 hover:text-[#0F828C]"
                                  )}
                                ></ListItem>
                              );
                            })}
                          </ul>
                        </NavigationMenuContent>
                      </>
                    ) : (
                      <Link
                        to={item.href!}
                        // 6. Terapkan style aktif pada link sederhana
                        className={cn(
                          navigationMenuTriggerStyle(),
                          currentPath === item.href && "text-[#0F828C]"
                        )}
                      >
                        {item.title}
                      </Link>
                    )}
                  </NavigationMenuItem>
                );
              })}
            </NavigationMenuList>
          </NavigationMenu>
          <Link to="/login">
            <Button
              variant="ghost"
              className="hidden hover:bg-[#0c6a74] rounded-md border border-black px-4 py-2 text-sm font-semibold text-black transition-colors duration-200 hover:text-white sm:block hover:border-[#0F828C]"
            >
              Login
            </Button>
          </Link>
        </div>
      </nav>
    </header>
  );
}

// Helper component ListItem tidak perlu diubah
const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          href={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";
