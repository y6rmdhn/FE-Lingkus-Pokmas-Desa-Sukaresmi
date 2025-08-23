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
import { FormFieldInputFile } from "@/components/block/FormFieldInputFile/FormFieldInputFile";

import { FaPlus } from "react-icons/fa";
import { IoSaveOutline } from "react-icons/io5";
import { RiResetLeftFill } from "react-icons/ri";
import { Pencil, Trash2 } from "lucide-react";
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
const produkSchema = z.object({
  id: z.string().optional(),
  nama_produk: z.string().min(1, "Nama produk wajib diisi"),
  konten: z.string().min(1, "Konten wajib diisi"),
  harga: z.string().min(1, "Harga wajib diisi"),
  kontak_wa: z.string().min(1, "Kontak WA wajib diisi"),
  image: z.any().optional(),
});

type ProdukFormValue = z.infer<typeof produkSchema>;

const DataProdukUnggulan = () => {
  const queryClient = useQueryClient();
  const [searchParam, setSearchParam] = useSearchParams();

  const [isAddData, setIsAddData] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParam.get("page") || 1)
  );

  const form = useForm<ProdukFormValue>({
    defaultValues: {
      nama_produk: "",
      konten: "",
      harga: "",
      kontak_wa: "",
      image: null,
    },
    resolver: zodResolver(produkSchema),
  });

  // get data
  const { data: dataProduk } = useQuery({
    queryKey: ["produk-unggulan-admin", searchParam.get("page")],
    queryFn: async () => {
      const response = await publicServices.produkUnggulan();
      return response.data;
    },
  });

  // tambah
  const { mutate: addProduk } = useMutation({
    mutationFn: (formData: FormData) => authServices.produkUnggulan(formData),
    onSuccess: () => {
      toast.success("Data berhasil ditambahkan");
      form.reset();
      setIsAddData(false);
      queryClient.invalidateQueries({ queryKey: ["produk-unggulan-admin"] });
    },
  });

  // edit
  const { mutate: updateProduk } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      authServices.updateProdukUnggulan(id, data),
    onSuccess: () => {
      toast.success("Data berhasil diperbarui");
      form.reset();
      setIsAddData(false);
      setIsEditMode(false);
      setEditingItemId(null);
      queryClient.invalidateQueries({ queryKey: ["produk-unggulan-admin"] });
    },
  });

  // hapus
  const { mutate: deleteProduk } = useMutation({
    mutationFn: (id: string) => authServices.deleteProdukUnggulan(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["produk-unggulan-admin"] });
    },
  });

  // submit handler
  const handleSubmitProduk = (values: ProdukFormValue) => {
    const formData = new FormData();
    formData.append("nama_produk", values.nama_produk);
    formData.append("konten", values.konten);
    formData.append("harga", values.harga);
    formData.append("kontak_wa", values.kontak_wa);
    if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    if (isEditMode && editingItemId) {
      updateProduk({ id: editingItemId, data: formData });
    } else {
      addProduk(formData);
    }
  };

  const handleEditItem = (item: ProdukFormValue) => {
    form.reset({
      id: item.id,
      nama_produk: item.nama_produk,
      konten: item.konten,
      harga: item.harga,
      kontak_wa: item.kontak_wa,
      image: null,
    });
    setIsEditMode(true);
    setEditingItemId(item.id!);
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
        <form onSubmit={form.handleSubmit(handleSubmitProduk)}>
          <h1 className="text-3xl font-bold text-[#0F828C] mb-8">
            DATA PRODUK UNGGULAN
          </h1>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-end mb-4">
              <Button
                type="button"
                onClick={() => {
                  if (!isEditMode) {
                    form.reset({
                      id: undefined,
                      nama_produk: "",
                      konten: "",
                      harga: "",
                      kontak_wa: "",
                      image: null,
                    });
                    setIsAddData(true);
                    searchParam.set("page", "1");
                    setSearchParam(searchParam);
                  }
                }}
                className={`cursor-pointer ${isEditMode ? "bg-gray-400" : ""}`}
                disabled={isEditMode}
              >
                <FaPlus className="w-4 h-4 text-white" />
                Tambah
              </Button>
            </div>

            <Table>
              <TableHeader className="bg-blue-900">
                <TableRow>
                  <TableHead className="text-white">Nama</TableHead>
                  <TableHead className="text-white">Konten</TableHead>
                  <TableHead className="text-white">Harga</TableHead>
                  <TableHead className="text-white">Kontak WA</TableHead>
                  <TableHead className="text-white">Gambar</TableHead>
                  <TableHead className="text-white text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(isAddData || isEditMode) && currentPage === 1 && (
                  <TableRow>
                    <TableCell>
                      <FormFieldInput
                        form={form}
                        name="nama_produk"
                        inputStyle="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <FormFieldInput
                        form={form}
                        name="konten"
                        inputStyle="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <FormFieldInput
                        form={form}
                        name="harga"
                        inputStyle="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <FormFieldInput
                        form={form}
                        name="kontak_wa"
                        inputStyle="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <FormFieldInputFile name="image" />
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2 justify-center">
                        <Button type="submit" size="icon" variant="ghost">
                          <IoSaveOutline className="w-5 h-5" />
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

                {dataProduk?.data.map((item: ProdukFormValue) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.nama_produk}</TableCell>
                    <TableCell>{item.konten}</TableCell>
                    <TableCell>{item.harga}</TableCell>
                    <TableCell>{item.kontak_wa}</TableCell>
                    <TableCell>
                      {item.image && (
                        <img
                          src={item.image}
                          alt={item.nama_produk}
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
                              Apakah Anda yakin ingin menghapus produk{" "}
                              <b>{item.nama_produk}</b>? Tindakan ini tidak bisa
                              dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deleteProduk(item.id!)}
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

export default DataProdukUnggulan;
