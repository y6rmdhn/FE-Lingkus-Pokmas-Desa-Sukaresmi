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
import type { PokmasData } from "@/types/public"; // Re-aliasing for clarity
import type { IPokmas } from "@/types/auth";

import type { KontenPokmasData } from "@/types/auth";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
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
import { RichTextEditor } from "@/components/block/RichTextEditor/RichTextEditor";
import { FormFieldInputFile } from "@/components/block/FormFieldInputFile/FormFieldInputFile";
import { ReadOnlyRichText } from "@/components/block/ReadOnlyRichText/ReadOnlyRichText";

// Schema validasi untuk data tabel Pokmas
const pokmasSchema = z.object({
  id: z.string().optional(),
  nama: z.string().min(1, "Nama wajib diisi"),
  data: z.string().min(1, "Data wajib diisi"),
});

// Schema validasi untuk konten Pokmas
const kontenSchema = z.object({
  id: z.string().optional(),
  konten: z
    .any()
    .refine(
      (val) => Array.isArray(val) && val.length > 0,
      "Konten wajib diisi"
    ),
  image: z
    .any()
    .optional()
    .refine(
      (file) => !file || (file instanceof File && file.size <= 2 * 1024 * 1024),
      "Ukuran file maksimal 2MB"
    ),
});

type PokmasFormValue = z.infer<typeof pokmasSchema>;
type KontenFormValue = z.infer<typeof kontenSchema>;

// Nilai default untuk form konten agar mudah di-reset
const defaultKontenValues: KontenFormValue = {
  konten: [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ],
  image: undefined,
};

export const DataKelompokMasyarakat = () => {
  const queryClient = useQueryClient();
  const [searchParam, setSearchParam] = useSearchParams();

  // State untuk tabel Pokmas
  const [isAddData, setIsAddData] = useState(false);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParam.get("page") || 1)
  );

  // State umum untuk mode edit
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [editingSection, setEditingSection] = useState<
    "pokmas" | "konten" | null
  >(null);

  // Boolean helper untuk konten
  const isEditingKonten = isEditMode && editingSection === "konten";

  // Form untuk tabel Pokmas
  const form = useForm<PokmasFormValue>({
    defaultValues: {
      nama: "",
      data: "",
    },
    resolver: zodResolver(pokmasSchema),
  });

  // Form untuk konten Pokmas
  const formKonten = useForm<KontenFormValue>({
    resolver: zodResolver(kontenSchema),
    defaultValues: defaultKontenValues,
  });

  // ========== DATA FETCHING (QUERIES) ==========
  // Get data tabel Pokmas
  const { data: dataPokmas } = useQuery({
    queryKey: ["pokmas-admin", searchParam.get("page")],
    queryFn: async () => {
      const response = await publicServices.pokmas(); // Assuming this fetches the list
      return response.data;
    },
  });

  // Get data konten Pokmas
  const { data: dataKontenPokmas } = useQuery({
    queryKey: ["konten-pokmas-admin"],
    queryFn: async () => {
      // Assuming a service exists to fetch the content
      const response = await publicServices.kontenPokmas();
      return response.data;
    },
  });

  // Effect untuk mengisi form konten saat mode edit diaktifkan
  useEffect(() => {
    if (isEditingKonten && dataKontenPokmas?.data) {
      try {
        const parsedKonten = JSON.parse(dataKontenPokmas.data.konten);
        formKonten.reset({
          konten: parsedKonten,
          image: undefined,
        });
      } catch (error) {
        formKonten.reset(defaultKontenValues);
      }
    }
  }, [isEditingKonten, dataKontenPokmas]);

  // ========== CRUD KONTEN POKMAS ==========
  const { mutate: addKontenPokmas } = useMutation({
    mutationFn: (data: FormData) => authServices.kontenPokmas(data),
    onSuccess: () => {
      toast.success("Konten berhasil ditambahkan");
      queryClient.invalidateQueries({ queryKey: ["konten-pokmas-admin"] });
    },
  });

  const { mutate: updateKontenPokmas } = useMutation({
    mutationFn: (data: FormData) => authServices.updateKontenPokmas(data),
    onSuccess: () => {
      toast.success("Konten berhasil diperbarui");
      formKonten.reset(defaultKontenValues);
      handleCancelKontenEdit();
      queryClient.invalidateQueries({ queryKey: ["konten-pokmas-admin"] });
    },
  });

  const { mutate: deleteKontenPokmas } = useMutation({
    mutationFn: () => authServices.deleteKontenPokmas(),
    onSuccess: () => {
      toast.success("Konten berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["konten-pokmas-admin"] });
    },
  });

  const handleSubmitKonten = (values: KontenFormValue) => {
    const formData = new FormData();
    formData.append("konten", JSON.stringify(values.konten));

    if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    if (isEditingKonten) {
      formData.append("_method", "PUT");
      updateKontenPokmas(formData);
    } else {
      addKontenPokmas(formData);
    }
  };

  const handleEditKonten = (item: KontenPokmasData) => {
    setIsEditMode(true);
    setEditingItemId(item.id);
    setEditingSection("konten");

    let parsedKonten;
    try {
      parsedKonten = JSON.parse(item.konten);
    } catch (error) {
      parsedKonten =
        typeof item.konten === "string"
          ? [{ type: "paragraph", children: [{ text: item.konten }] }]
          : defaultKontenValues.konten;
    }

    formKonten.reset({
      konten: parsedKonten,
      image: undefined,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.info("Anda dalam mode edit. Silakan ubah konten pada form di atas.");
  };

  const handleCancelKontenEdit = () => {
    setIsEditMode(false);
    setEditingItemId(null);
    setEditingSection(null);
    formKonten.reset(defaultKontenValues);
  };

  // ========== CRUD DATA TABEL POKMAS ==========
  const { mutate: addPokmas } = useMutation({
    mutationFn: (data: IPokmas) => authServices.pokmas(data),
    onSuccess: () => {
      toast.success("Data berhasil ditambahkan");
      handleCancel();
      queryClient.invalidateQueries({ queryKey: ["pokmas-admin"] });
    },
  });

  const { mutate: updatePokmas } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: IPokmas }) =>
      authServices.updatePokmas(id, data),
    onSuccess: () => {
      toast.success("Data berhasil diperbarui");
      handleCancel();
      queryClient.invalidateQueries({ queryKey: ["pokmas-admin"] });
    },
  });

  const { mutate: deletePokmas } = useMutation({
    mutationFn: (id: string) => authServices.deletePokmas(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["pokmas-admin"] });
    },
  });

  const handleSubmitPokmas = (values: PokmasFormValue) => {
    if (isEditMode && editingItemId && editingSection === "pokmas") {
      updatePokmas({ id: editingItemId, data: values });
    } else {
      addPokmas(values);
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
    setEditingSection("pokmas");
    setIsAddData(true);

    if (Number(searchParam.get("page")) !== 1) {
      searchParam.set("page", "1");
      setSearchParam(searchParam);
    }
    // Scroll to the second table
    window.scrollTo({ top: 800, behavior: "smooth" });
  };

  const handleCancel = () => {
    form.reset();
    setIsEditMode(false);
    setEditingItemId(null);
    setEditingSection(null);
    setIsAddData(false);
  };

  // Sync page param
  useEffect(() => {
    const page = Number(searchParam.get("page") || 1);
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [searchParam, currentPage]);

  return (
    <AdminLayout>
      {/* ================== FORM KONTEN KELOMPOK MASYARAKAT ================== */}
      <Form {...formKonten}>
        <form onSubmit={formKonten.handleSubmit(handleSubmitKonten)}>
          <h1 className="text-3xl font-bold text-[#0F828C] mb-8">
            {isEditingKonten ? "EDIT KONTEN" : "KONTEN KELOMPOK MASYARAKAT"}
          </h1>

          <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
            <div className="flex justify-end gap-2 mb-4">
              <Button type="submit">
                <IoSaveOutline className="mr-2" />
                {isEditingKonten ? "Update" : "Simpan"}
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={
                  isEditingKonten
                    ? handleCancelKontenEdit
                    : () => formKonten.reset(defaultKontenValues)
                }
              >
                <RiResetLeftFill className="mr-2" />
                {isEditingKonten ? "Batal" : "Reset"}
              </Button>
            </div>

            <FormField
              control={formKonten.control}
              name="konten"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    Isi Konten<span className="text-red-500">*</span>
                  </FormLabel>
                  <FormControl>
                    <RichTextEditor
                      value={field.value}
                      onChange={field.onChange}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isEditingKonten && dataKontenPokmas?.data?.image && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Gambar Saat Ini:</p>
                <img
                  src={dataKontenPokmas.data.image}
                  alt="Gambar Konten"
                  className="w-40 h-40 object-cover rounded-md border"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Upload file baru untuk mengganti gambar ini.
                </p>
              </div>
            )}

            <div className="mt-4">
              <FormFieldInputFile
                name="image"
                label={isEditingKonten ? "Ganti Gambar (Opsional)" : "Gambar"}
              />
            </div>

            <Table className="mt-8">
              <TableHeader className="bg-blue-900">
                <TableRow>
                  <TableHead className="text-white">Isi Konten</TableHead>
                  <TableHead className="text-white">Gambar</TableHead>
                  <TableHead className="text-white">Dibuat</TableHead>
                  <TableHead className="text-white">Diupdate</TableHead>
                  <TableHead className="text-white text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {dataKontenPokmas?.data ? (
                  <TableRow key={dataKontenPokmas.data.id}>
                    <TableCell className="max-w-xs truncate">
                      <ReadOnlyRichText
                        content={dataKontenPokmas.data.konten}
                      />
                    </TableCell>
                    <TableCell>
                      {dataKontenPokmas.data.image ? (
                        <img
                          src={dataKontenPokmas.data.image}
                          alt="konten"
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>{dataKontenPokmas.data.createdAt}</TableCell>
                    <TableCell>{dataKontenPokmas.data.updatedAt}</TableCell>
                    <TableCell className="flex gap-2 justify-center">
                      <Button
                        size="icon"
                        variant="ghost"
                        type="button"
                        onClick={() => handleEditKonten(dataKontenPokmas.data)}
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
                            <AlertDialogTitle>Hapus Konten</AlertDialogTitle>
                            <AlertDialogDescription>
                              Apakah Anda yakin ingin menghapus konten ini?
                              Tindakan ini tidak bisa dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() =>
                                deleteKontenPokmas(dataKontenPokmas.data.id)
                              }
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                  </TableRow>
                ) : (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center">
                      Belum ada konten. Silakan tambahkan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </form>
      </Form>

      {/* ================== TABEL DATA KELOMPOK MASYARAKAT ================== */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmitPokmas)}>
          <h1 className="text-3xl font-bold text-[#0F828C] mb-8">
            DATA KELOMPOK MASYARAKAT
          </h1>
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
                <FaPlus className="w-4 h-4 mr-2" />
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
                {(isAddData || (isEditMode && editingSection === "pokmas")) &&
                  currentPage === 1 && (
                    <TableRow>
                      <TableCell>
                        <FormFieldInput
                          form={form}
                          name="nama"
                          inputStyle="w-full"
                          placeholder="Masukkan nama"
                        />
                      </TableCell>
                      <TableCell>
                        <FormFieldInput
                          form={form}
                          name="data"
                          inputStyle="w-full"
                          placeholder="Masukkan data"
                        />
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
                            <RiResetLeftFill className="w-5 h-5 text-yellow-500" />
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
