import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { PlusCircle, Pencil, Trash2 } from "lucide-react";

// Data sampel (tidak berubah)
const stuntingData = [
  { id: 1, count: 20, year: 2025, month: "Juli" },
  { id: 2, count: 25, year: 2025, month: "Juni" },
  { id: 3, count: 19, year: 2025, month: "Mei" },
  { id: 4, count: 15, year: 2025, month: "April" },
  { id: 5, count: 18, year: 2025, month: "Maret" },
  { id: 6, count: 18, year: 2025, month: "Februari" },
  { id: 7, count: 18, year: 2025, month: "Januari" },
  { id: 8, count: 18, year: 2024, month: "Desember" },
  { id: 9, count: 18, year: 2024, month: "November" },
  { id: 10, count: 18, year: 2025, month: "Oktober" },
];

const DataGaleri = () => {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-[#0F828C] mb-8">DATA GALERI</h1>

      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-end mb-4">
          <Button className="bg-green-600 hover:bg-green-700">
            <PlusCircle className="mr-2 h-4 w-4" /> Tambah
          </Button>
        </div>

        <Table>
          {/* ... Isi tabel tidak berubah ... */}
          <TableHeader className="bg-blue-900">
            <TableRow>
              <TableHead className="text-white font-bold">Judul</TableHead>
              <TableHead className="text-white font-bold">Image</TableHead>
              <TableHead className="text-white font-bold">Date</TableHead>
              <TableHead className="text-white font-bold text-center">
                Aksi
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stuntingData.map((data) => (
              <TableRow key={data.id}>
                <TableCell>{data.count}</TableCell>
                <TableCell>{data.year}</TableCell>
                <TableCell>{data.month}</TableCell>
                <TableCell className="flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-blue-600 border-blue-600 hover:bg-blue-50 hover:text-blue-700"
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="text-red-600 border-red-600 hover:bg-red-50 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* 2. Ganti bagian paginasi lama dengan komponen Pagination baru */}
        <div className="flex items-center justify-between mt-6">
          <div className="flex items-center gap-2">
            <Select defaultValue="10">
              <SelectTrigger className="w-28">
                <SelectValue placeholder="10 Baris" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="10">10 Baris</SelectItem>
                <SelectItem value="20">20 Baris</SelectItem>
                <SelectItem value="50">50 Baris</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#" />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">3</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#">4</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationEllipsis />
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </AdminLayout>
  );
};

export default DataGaleri;
