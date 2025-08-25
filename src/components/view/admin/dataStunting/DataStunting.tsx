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
import type { IStunting } from "@/types/auth";

// schema validasi
// <-- PERUBAHAN DI SINI: Menggunakan z.coerce.number() untuk validasi angka -->
const stuntingDataSchema = z.object({
  id: z.string().optional(),
  jumlah_stunting: z.coerce.number().min(0, "Jumlah Stunting wajib diisi"),
  jumlah_balita: z.coerce.number().min(0, "Jumlah Balita wajib diisi"),
  tanggal: z.string().min(1, "Tanggal wajib diisi"),
});

// Mengubah tipe form value agar sesuai dengan schema baru (number)
// React Hook Form & Zod akan menanganinya secara otomatis
type stuntingFormValue = z.infer<typeof stuntingDataSchema>;

export const StuntingPage = () => {
  const queryClient = useQueryClient();
  const [searchParam, setSearchParam] = useSearchParams();

  const [isAddData, setIsAddData] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParam.get("page") || 1)
  );

  const form = useForm<stuntingFormValue>({
    defaultValues: {
      id: undefined,
      jumlah_stunting: undefined,
      jumlah_balita: undefined,
      tanggal: "",
    },
    // @ts-ignore
    resolver: zodResolver(stuntingDataSchema),
  });

  // get data
  const { data: dataPokmas } = useQuery({
    queryKey: ["stunting-admin", searchParam.get("page")],
    queryFn: async () => {
      const response = await publicServices.stunting();
      return response.data;
    },
  });

  // tambah
  const { mutate: addPokmas } = useMutation({
    // @ts-ignore
    mutationFn: (data: stuntingFormValue) => authServices.stunting(data),
    onSuccess: () => {
      toast.success("Data berhasil ditambahkan");
      form.reset();
      setIsAddData(false);
      queryClient.invalidateQueries({ queryKey: ["stunting-admin"] });
    },
  });

  // edit
  const { mutate: updatePokmas } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: stuntingFormValue }) =>
      // @ts-ignore
      authServices.updateStunting(id, data),
    onSuccess: () => {
      toast.success("Data berhasil diperbarui");
      form.reset();
      setIsAddData(false);
      setIsEditMode(false);
      setEditingItemId(null);
      queryClient.invalidateQueries({ queryKey: ["stunting-admin"] });
    },
  });

  // hapus
  const { mutate: deletePokmas } = useMutation({
    mutationFn: (id: string) => authServices.deleteStunting(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["stunting-admin"] });
    },
  });

  // submit handler
  const handleSubmitPokmas = (values: stuntingFormValue) => {
    if (isEditMode && editingItemId) {
      updatePokmas({ id: editingItemId, data: values });
    } else {
      addPokmas(values);
    }
  };

  const handleEditItem = (item: IStunting) => {
    form.reset({
      id: item.id,
      // Pastikan data yang dimasukkan ke form sesuai tipenya
      jumlah_stunting: Number(item.jumlah_stunting),
      jumlah_balita: Number(item.jumlah_balita),
      tanggal: item.tanggal,
    });
    setIsEditMode(true);
    setEditingItemId(item.id ?? null);
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
        {/* @ts-ignore */}
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
                      jumlah_stunting: undefined,
                      jumlah_balita: undefined,
                      tanggal: "",
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
                  <TableHead className="text-white">Jumlah Stunting</TableHead>
                  <TableHead className="text-white">Jumlah Balita</TableHead>
                  <TableHead className="text-white">Tanggal</TableHead>
                  <TableHead className="text-white text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(isAddData || isEditMode) && currentPage === 1 && (
                  <TableRow>
                    <TableCell>
                      <FormFieldInput
                        form={form}
                        name="jumlah_stunting"
                        inputStyle="w-full"
                        type="number" // <-- PERUBAHAN DI SINI
                      />
                    </TableCell>
                    <TableCell>
                      <FormFieldInput
                        form={form}
                        name="jumlah_balita"
                        inputStyle="w-full"
                        type="number" // <-- PERUBAHAN DI SINI
                      />
                    </TableCell>
                    <TableCell>
                      <FormFieldInput
                        form={form}
                        name="tanggal"
                        inputStyle="w-full"
                        type="date"
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

                {dataPokmas?.data.map((item: IStunting) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.jumlah_stunting}</TableCell>
                    <TableCell>{item.jumlah_balita}</TableCell>
                    <TableCell>{item.tanggal}</TableCell>
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
                              Apakah Anda yakin ingin menghapus data bulan{" "}
                              <b>{item.tanggal}</b>? Tindakan ini tidak bisa
                              dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => deletePokmas(item.id!)}
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
