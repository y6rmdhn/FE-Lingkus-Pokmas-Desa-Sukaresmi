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
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { toast } from "sonner";

import publicServices from "@/services/public.services";
import authServices from "@/services/auth.services";

import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/block/FormFieldInput/FormFieldInput";

import { FaPlus } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";
import { Pencil, Trash2 } from "lucide-react";
import { FormFieldInputFile } from "@/components/block/FormFieldInputFile/FormFieldInputFile";
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

// schema validasi
const galeriSchema = z.object({
  id: z.string().optional(),
  judul: z.string().min(1, "Judul wajib diisi"),
  deskripsi: z.string().min(1, "Deskripsi wajib diisi"),
  date: z.string().min(1, "Tanggal wajib diisi"),
  images: z.any().optional(), // file bisa optional
});

type GaleriFormValue = z.infer<typeof galeriSchema>;

const DataGaleri = () => {
  const queryClient = useQueryClient();
  const [searchParam, setSearchParam] = useSearchParams();

  const [isAddData, setIsAddData] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParam.get("page") || 1)
  );

  const form = useForm<GaleriFormValue>({
    defaultValues: {
      judul: "",
      deskripsi: "",
      date: "",
      images: null,
    },
    resolver: zodResolver(galeriSchema),
  });

  // get data
  const { data: dataGaleri } = useQuery({
    queryKey: ["galeri-admin", searchParam.get("page")],
    queryFn: async () => {
      const response = await publicServices.galeri();
      return response.data;
    },
  });

  // tambah
  const { mutate: addGaleri } = useMutation({
    mutationFn: (formData: FormData) => authServices.galeri(formData),
    onSuccess: () => {
      toast.success("Data berhasil ditambahkan");
      form.reset();
      setIsAddData(false);
      queryClient.invalidateQueries({ queryKey: ["galeri-admin"] });
    },
  });

  // edit
  const { mutate: updateGaleri } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      authServices.updateGaleri(id.toString(), data),
    onSuccess: () => {
      toast.success("Data berhasil diperbarui");
      form.reset();
      setIsAddData(false);
      setIsEditMode(false);
      setEditingItemId(null);
      queryClient.invalidateQueries({ queryKey: ["galeri-admin"] });
    },
  });

  // hapus
  const { mutate: deleteGaleri } = useMutation({
    mutationFn: (id: string) => authServices.deleteGaleri(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["galeri-admin"] });
    },
  });

  const handleSubmitGaleri = (values: GaleriFormValue) => {
    const formData = new FormData();
    formData.append("judul", values.judul);
    formData.append("deskripsi", values.deskripsi);
    formData.append("date", values.date);

    if (values.images instanceof File) {
      formData.append("images", values.images);
    }

    if (isEditMode && editingItemId) {
      formData.append("id", editingItemId);
      updateGaleri({ id: editingItemId, data: formData });
    } else {
      addGaleri(formData);
    }
  };

  const handleEditItem = (item: any) => {
    form.reset({
      id: item.id,
      judul: item.judul,
      deskripsi: item.deskripsi,
      date: item.date,
      images: null,
    });
    setIsEditMode(true);
    setEditingItemId(item.id);
    setIsAddData(true);

    if (Number(searchParam.get("page")) !== 1) {
      searchParam.set("page", "1");
      setSearchParam(searchParam);
    }
  };

  const handleCancel = () => {
    form.reset();
    setIsEditMode(false);
    setEditingItemId(null);
    setIsAddData(false);
  };

  // sync page param
  useEffect(() => {
    const page = Number(searchParam.get("page") || 1);
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [searchParam]);

  return (
    <AdminLayout>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitGaleri)}>
          <h1 className="text-3xl font-bold text-[#0F828C] mb-8">
            DATA GALERI
          </h1>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-end mb-4">
              <Button
                type="button"
                onClick={() => {
                  if (!isEditMode) {
                    form.reset({
                      id: undefined,
                      judul: "",
                      deskripsi: "",
                      date: "",
                      images: null,
                    });
                    setIsAddData(true);
                    searchParam.set("page", "1");
                    setSearchParam(searchParam);
                  }
                }}
                className={`cursor-pointer ${isEditMode ? "bg-gray-400" : ""}`}
                disabled={isEditMode}
              >
                <FaPlus className="w-4! h-4! text-white" />
                Tambah
              </Button>
            </div>

            <Table>
              <TableHeader className="bg-blue-900">
                <TableRow>
                  <TableHead className="text-white">Judul</TableHead>
                  <TableHead className="text-white">Deskripsi</TableHead>
                  <TableHead className="text-white">Tanggal</TableHead>
                  <TableHead className="text-white">Image</TableHead>
                  <TableHead className="text-white text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(isAddData || isEditMode) && currentPage === 1 && (
                  <TableRow>
                    <TableCell>
                      <FormFieldInput
                        form={form}
                        name="judul"
                        inputStyle="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <FormFieldInput
                        form={form}
                        name="deskripsi"
                        inputStyle="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <FormFieldInput
                        form={form}
                        name="date"
                        type="date"
                        inputStyle="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <FormFieldInputFile name="images" />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-center">
                        <Button type="submit" size="icon" variant="ghost">
                          <IoSaveOutline className="w-5! h-5!" />
                        </Button>
                        <Button
                          type="button"
                          size="icon"
                          variant="ghost"
                          onClick={handleCancel}
                        >
                          <RiResetLeftFill className="text-yellow-uika" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                )}

                {dataGaleri?.data.map((item: any) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.judul}</TableCell>
                    <TableCell>{item.deskripsi}</TableCell>
                    <TableCell>{item.date}</TableCell>
                    <TableCell>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.judul}
                          className="w-16 h-16 object-cover rounded"
                        />
                      )}
                    </TableCell>
                    <TableCell className="flex gap-2 justify-center">
                      <Button
                        size="icon"
                        variant="ghost"
                        type="button"
                        onClick={() => handleEditItem(item)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button size="icon" variant="ghost" type="button">
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Hapus Data</AlertDialogTitle>
                            <AlertDialogDescription>
                              Apakah Anda yakin ingin menghapus galeri{" "}
                              <b>{item.judul}</b>? Tindakan ini tidak bisa
                              dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteGaleri(item.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </form>
      </Form>
    </AdminLayout>
  );
};

export default DataGaleri;
