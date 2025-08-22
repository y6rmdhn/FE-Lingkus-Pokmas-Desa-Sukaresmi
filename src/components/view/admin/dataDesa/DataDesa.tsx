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
import type { PokmasData } from "@/types/public";

import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/block/FormFieldInput/FormFieldInput";

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
const pokmasSchema = z.object({
  id: z.string().optional(),
  nama: z.string().min(1, "Nama wajib diisi"),
  data: z.string().min(1, "Data wajib diisi"),
});

type PokmasFormValue = z.infer<typeof pokmasSchema>;

export const DataDesa = () => {
  const queryClient = useQueryClient();
  const [searchParam, setSearchParam] = useSearchParams();

  const [isAddData, setIsAddData] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParam.get("page") || 1)
  );

  const form = useForm<PokmasFormValue>({
    defaultValues: {
      nama: "",
      data: "",
    },
    resolver: zodResolver(pokmasSchema),
  });

  // get data
  const { data: dataPokmas } = useQuery({
    queryKey: ["desa-admin", searchParam.get("page")],
    queryFn: async () => {
      const response = await publicServices.desa();
      return response.data;
    },
  });

  // tambah
  const { mutate: addPokmas } = useMutation({
    mutationFn: (data: FormData) => authServices.desa(data),
    onSuccess: () => {
      toast.success("Data berhasil ditambahkan");
      form.reset();
      setIsAddData(false);
      queryClient.invalidateQueries({ queryKey: ["desa-admin"] });
    },
  });

  // edit
  const { mutate: updatePokmas } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      authServices.updateDesa(id, data),
    onSuccess: () => {
      toast.success("Data berhasil diperbarui");
      form.reset();
      setIsAddData(false);
      setIsEditMode(false);
      setEditingItemId(null);
      queryClient.invalidateQueries({ queryKey: ["desa-admin"] });
    },
  });

  // hapus
  const { mutate: deletePokmas } = useMutation({
    mutationFn: (id: string) => authServices.deleteDesa(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["desa-admin"] });
    },
  });

  // submit handler
  const handleSubmitPokmas = (values: PokmasFormValue) => {
    const formData = new FormData();
    formData.append("nama", values.nama);
    formData.append("data", values.data);

    if (isEditMode && editingItemId) {
      updatePokmas({ id: editingItemId, data: formData });
    } else {
      addPokmas(formData);
    }
  };

  const handleEditItem = (item: PokmasData) => {
    form.reset({
      id: item.id,
      nama: item.nama,
      data: item.data,
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
        <form onSubmit={form.handleSubmit(handleSubmitPokmas)}>
          <h1 className="text-3xl font-bold text-[#0F828C] mb-8">DATA DESA</h1>

          <div className="bg-white p-6 rounded-lg shadow-lg">
            <div className="flex justify-end mb-4">
              <Button
                type="button"
                onClick={() => {
                  if (!isEditMode) {
                    form.reset({
                      id: undefined,
                      nama: "",
                      data: "",
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
                  <TableHead className="text-white">Nama</TableHead>
                  <TableHead className="text-white">Data</TableHead>
                  <TableHead className="text-white text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(isAddData || isEditMode) && currentPage === 1 && (
                  <TableRow>
                    <TableCell>
                      <FormFieldInput
                        form={form}
                        name="nama"
                        inputStyle="w-full"
                      />
                    </TableCell>
                    <TableCell>
                      <FormFieldInput
                        form={form}
                        name="data"
                        inputStyle="w-full"
                      />
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

                {dataPokmas?.data.map((item: PokmasData) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.nama}</TableCell>
                    <TableCell>{item.data}</TableCell>
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
                              Apakah Anda yakin ingin menghapus kelompok
                              masyarakat <b>{item.nama}</b>? Tindakan ini tidak
                              bisa dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deletePokmas(item.id)}
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
