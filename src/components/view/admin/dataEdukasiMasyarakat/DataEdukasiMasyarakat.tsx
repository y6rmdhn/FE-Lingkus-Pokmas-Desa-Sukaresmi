import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { FaPlus } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";
import { Pencil, Trash2 } from "lucide-react";

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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/block/FormFieldInput/FormFieldInput";
import { FormFieldInputFile } from "@/components/block/FormFieldInputFile/FormFieldInputFile";

// NOTE: Sesuaikan path import service jika berbeda
import publicServices from "@/services/public.services";
import authServices from "@/services/auth.services";
import type { BeritaData } from "@/types/auth";
// Skema validasi berdasarkan field dari Postman
const beritaSchema = z.object({
  id: z.string().optional(),
  judul: z.string().min(1, "Judul wajib diisi"),
  konten: z.string().min(1, "Konten wajib diisi"),
  penulis: z.string().min(1, "Penulis wajib diisi"),
  tanggal: z.string().min(1, "Tanggal wajib diisi"),
  image: z.any().optional(),
});

type BeritaFormValue = z.infer<typeof beritaSchema>;

const DataEdukasiMasyarakat = () => {
  const queryClient = useQueryClient();
  const [searchParam, setSearchParam] = useSearchParams();

  const [isAddData, setIsAddData] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);

  const currentPage = Number(searchParam.get("page") || 1);

  const form = useForm<BeritaFormValue>({
    defaultValues: {
      judul: "",
      konten: "",
      penulis: "Admin Desa", // Bisa di set default
      tanggal: "",
      image: null,
    },
    resolver: zodResolver(beritaSchema),
  });

  // GET (Read)
  const { data: dataBerita, isLoading } = useQuery({
    queryKey: ["berita-admin", currentPage],
    queryFn: async () => {
      // NOTE: Pastikan Anda punya service publicServices.berita() untuk mengambil data
      const response = await publicServices.berita();
      return response.data;
    },
  });

  // POST (Create)
  const { mutate: addBerita } = useMutation({
    mutationFn: (formData: FormData) => authServices.berita(formData),
    onSuccess: () => {
      toast.success("Berita berhasil ditambahkan");
      form.reset();
      setIsAddData(false);
      queryClient.invalidateQueries({ queryKey: ["berita-admin"] });
    },
    onError: (error) => {
      toast.error("Gagal menambahkan berita: " + error.message);
    },
  });

  // PUT (Update)
  const { mutate: updateBerita } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      authServices.updateBerita(id, data),
    onSuccess: () => {
      toast.success("Berita berhasil diperbarui");
      form.reset();
      setIsAddData(false);
      setIsEditMode(false);
      setEditingItemId(null);
      queryClient.invalidateQueries({ queryKey: ["berita-admin"] });
    },
    onError: (error) => {
      toast.error("Gagal memperbarui berita: " + error.message);
    },
  });

  // DELETE
  const { mutate: deleteBerita } = useMutation({
    mutationFn: (id: string) =>
      // NOTE: Pastikan service deleteBerita menerima 'id'
      authServices.deleteBerita(id),
    onSuccess: () => {
      toast.success("Berita berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["berita-admin"] });
    },
    onError: (error) => {
      toast.error("Gagal menghapus berita: " + error.message);
    },
  });

  // Submit Handler
  const handleSubmitBerita = (values: BeritaFormValue) => {
    const formData = new FormData();
    formData.append("judul", values.judul);
    formData.append("konten", values.konten);
    formData.append("penulis", values.penulis);
    formData.append("tanggal", values.tanggal);

    // Hanya tambahkan gambar jika ada file baru yang dipilih
    if (values.image && values.image instanceof File) {
      formData.append("image", values.image);
    }

    if (isEditMode && editingItemId) {
      // Untuk update, beberapa backend memerlukan method spoofing
      formData.append("_method", "PUT");
      updateBerita({ id: editingItemId, data: formData });
    } else {
      addBerita(formData);
    }
  };

  const handleEditItem = (item: BeritaData) => {
    form.reset({
      id: item.id,
      judul: item.judul,
      konten: item.konten,
      penulis: item.penulis,
      tanggal: item.tanggal.split(" ")[0], // Ambil bagian tanggal saja
      image: null, // Jangan isi image lama, biarkan user upload baru jika perlu
    });
    setIsEditMode(true);
    setEditingItemId(item.id);
    setIsAddData(true);
    window.scrollTo(0, 0); // Scroll ke atas untuk melihat form
  };

  const handleCancel = () => {
    form.reset();
    setIsEditMode(false);
    setEditingItemId(null);
    setIsAddData(false);
  };

  useEffect(() => {
    if (!searchParam.get("page")) {
      setSearchParam({ page: "1" });
    }
  }, [searchParam, setSearchParam]);

  return (
    <AdminLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitBerita)}>
          <h1 className="text-3xl font-bold text-[#0F828C] mb-8">
            DATA EDUKASI MASYARAKAT
          </h1>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-end mb-4">
              <Button
                type="button"
                onClick={() => {
                  if (!isEditMode) {
                    handleCancel();
                    setIsAddData(true);
                    form.reset({
                      judul: "",
                      konten: "",
                      penulis: "Admin Desa",
                      tanggal: "",
                      image: null,
                    });
                  }
                }}
                className={`cursor-pointer ${isEditMode ? "bg-gray-400" : ""}`}
                disabled={isEditMode}
              >
                <FaPlus className="w-4 h-4 mr-2" />
                Tambah
              </Button>
            </div>

            <Table>
              <TableHeader className="bg-blue-900">
                <TableRow>
                  <TableHead className="text-white">Judul</TableHead>
                  <TableHead className="text-white">Penulis</TableHead>
                  <TableHead className="text-white">Tanggal</TableHead>
                  <TableHead className="text-white">Konten</TableHead>
                  <TableHead className="text-white">Image</TableHead>
                  <TableHead className="text-white text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {isAddData && (
                  <TableRow>
                    <TableCell>
                      <FormFieldInput form={form} name="judul" />
                    </TableCell>
                    <TableCell>
                      <FormFieldInput form={form} name="penulis" />
                    </TableCell>
                    <TableCell>
                      <FormFieldInput form={form} name="tanggal" type="date" />
                    </TableCell>
                    {/* Kolom untuk konten dan image diletakkan di baris terpisah */}
                    <TableCell>
                      <FormFieldInput
                        form={form}
                        name="konten"
                        type="textarea"
                      />
                    </TableCell>
                    <TableCell>
                      <FormFieldInputFile name="image" />
                    </TableCell>
                    <TableCell className="flex gap-2 justify-center">
                      <Button type="submit" size="icon" variant="ghost">
                        <IoSaveOutline className="w-5 h-5 text-green-600" />
                      </Button>
                      <Button
                        type="button"
                        size="icon"
                        variant="ghost"
                        onClick={handleCancel}
                      >
                        <RiResetLeftFill className="w-5 h-5 text-yellow-500" />
                      </Button>
                    </TableCell>
                  </TableRow>
                )}

                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center">
                      Memuat data...
                    </TableCell>
                  </TableRow>
                ) : (
                  dataBerita?.data.map((item: BeritaData) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.judul}
                      </TableCell>
                      <TableCell>{item.penulis}</TableCell>
                      <TableCell>
                        {new Date(item.tanggal).toLocaleDateString("id-ID")}
                      </TableCell>
                      <TableCell>{item.konten}</TableCell>
                      <TableCell>{item.image}</TableCell>
                      <TableCell className="flex gap-2 justify-center">
                        <Button
                          size="icon"
                          variant="ghost"
                          type="button"
                          onClick={() => handleEditItem(item)}
                        >
                          <Pencil className="h-4 w-4 text-blue-600" />
                        </Button>
                        <AlertDialog>
                          <AlertDialogTrigger asChild>
                            <Button size="icon" variant="ghost" type="button">
                              <Trash2 className="h-4 w-4 text-red-500" />
                            </Button>
                          </AlertDialogTrigger>
                          <AlertDialogContent>
                            <AlertDialogHeader>
                              <AlertDialogTitle>Hapus Berita</AlertDialogTitle>
                              <AlertDialogDescription>
                                Apakah Anda yakin ingin menghapus berita
                                berjudul <b>{item.judul}</b>? Tindakan ini tidak
                                bisa dibatalkan.
                              </AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                              <AlertDialogCancel>Batal</AlertDialogCancel>
                              <AlertDialogAction
                                onClick={() => deleteBerita(item.id)}
                                className="bg-red-600 hover:bg-red-700"
                              >
                                Hapus
                              </AlertDialogAction>
                            </AlertDialogFooter>
                          </AlertDialogContent>
                        </AlertDialog>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </form>
      </Form>
    </AdminLayout>
  );
};

export default DataEdukasiMasyarakat;
