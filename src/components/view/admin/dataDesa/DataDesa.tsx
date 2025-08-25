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
import type { KontenDesaData } from "@/types/auth";
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

// schema validasi pokmas
const pokmasSchema = z.object({
  id: z.string().optional(),
  nama: z.string().min(1, "Nama wajib diisi"),
  data: z.string().min(1, "Data wajib diisi"),
});

// schema validasi konten desa
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

// Definisikan nilai default untuk form konten agar mudah di-reset
const defaultKontenValues: KontenFormValue = {
  konten: [
    {
      type: "paragraph",
      children: [{ text: "" }],
    },
  ],
  image: undefined,
};

export const DataDesa = () => {
  const queryClient = useQueryClient();
  const [searchParam, setSearchParam] = useSearchParams();

  const [isAddData, setIsAddData] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editingItemId, setEditingItemId] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<number>(
    Number(searchParam.get("page") || 1)
  );

  const [editingSection, setEditingSection] = useState<
    "pokmas" | "konten" | null
  >(null);
  const isEditingKonten = isEditMode && editingSection === "konten";

  // form pokmas
  const form = useForm<PokmasFormValue>({
    defaultValues: {
      nama: "",
      data: "",
    },
    resolver: zodResolver(pokmasSchema),
  });

  // form konten desa
  const formKonten = useForm<KontenFormValue>({
    // [FIX 1] Menggunakan schema yang benar dan default value yang sudah didefinisikan.
    resolver: zodResolver(kontenSchema),
    defaultValues: defaultKontenValues,
  });

  // get data pokmas
  const { data: dataPokmas } = useQuery({
    queryKey: ["desa-admin", searchParam.get("page")],
    queryFn: async () => {
      const response = await publicServices.desa();
      return response.data;
    },
  });

  // get data konten desa
  const { data: dataKontenDesa } = useQuery({
    queryKey: ["konten-desa-admin"],
    queryFn: async () => {
      const response = await publicServices.kontenDesa();
      return response.data;
    },
  });

  useEffect(() => {
    if (isEditingKonten && dataKontenDesa?.data) {
      try {
        const parsedKonten = JSON.parse(dataKontenDesa.data.konten);
        formKonten.reset({
          konten: parsedKonten,
          image: undefined,
        });
      } catch (error) {
        formKonten.reset(defaultKontenValues);
      }
    }
  }, [isEditingKonten, dataKontenDesa]);

  // ========== CRUD Pokmas ==========
  const { mutate: addPokmas } = useMutation({
    mutationFn: (data: FormData) => authServices.desa(data),
    onSuccess: () => {
      toast.success("Data berhasil ditambahkan");
      form.reset();
      setIsAddData(false);
      queryClient.invalidateQueries({ queryKey: ["desa-admin"] });
    },
  });

  const { mutate: updatePokmas } = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FormData }) =>
      authServices.updateDesa(id, data),
    onSuccess: () => {
      toast.success("Data berhasil diperbarui");
      handleCancel();
      queryClient.invalidateQueries({ queryKey: ["desa-admin"] });
    },
  });

  const { mutate: deletePokmas } = useMutation({
    mutationFn: (id: string) => authServices.deleteDesa(id),
    onSuccess: () => {
      toast.success("Data berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["desa-admin"] });
    },
  });

  const handleSubmitPokmas = (values: PokmasFormValue) => {
    const formData = new FormData();
    formData.append("nama", values.nama);
    formData.append("data", values.data);

    if (isEditMode && editingItemId && editingSection === "pokmas") {
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
    setEditingSection("pokmas");
    setIsAddData(true);

    if (Number(searchParam.get("page")) !== 1) {
      searchParam.set("page", "1");
      setSearchParam(searchParam);
    }
    window.scrollTo({ top: 500, behavior: "smooth" });
  };

  const handleCancel = () => {
    form.reset();
    setIsEditMode(false);
    setEditingItemId(null);
    setEditingSection(null);
    setIsAddData(false);
  };

  // ========== CRUD Konten Desa ==========
  const { mutate: addKontenDesa } = useMutation({
    mutationFn: (data: FormData) => authServices.kontenDesa(data),
    onSuccess: () => {
      toast.success("Konten berhasil ditambahkan");
      queryClient.invalidateQueries({ queryKey: ["konten-desa-admin"] });
    },
  });

  const { mutate: updateKontenDesa } = useMutation({
    mutationFn: ({ data }: { data: FormData }) =>
      authServices.updateKontenDesa(data),
    onSuccess: () => {
      toast.success("Konten berhasil diperbarui");
      formKonten.reset(defaultKontenValues);
      handleCancelKontenEdit();
      queryClient.invalidateQueries({ queryKey: ["konten-desa-admin"] });
    },
  });

  console.log("ini udah di update", dataKontenDesa);

  const { mutate: deleteKontenDesa } = useMutation({
    mutationFn: () => authServices.deleteKontenDesa(),
    onSuccess: () => {
      toast.success("Konten berhasil dihapus");
      queryClient.invalidateQueries({ queryKey: ["konten-desa-admin"] });
    },
  });

  const handleSubmitKonten = (values: KontenFormValue) => {
    const formData = new FormData();
    formData.append("konten", JSON.stringify(values.konten));

    if (values.image instanceof File) {
      formData.append("image", values.image);
    }

    if (isEditMode && editingItemId && editingSection === "konten") {
      formData.append("_method", "PUT");
      updateKontenDesa({ data: formData });
    } else {
      addKontenDesa(formData);
    }
  };

  const handleEditKonten = (item: KontenDesaData) => {
    setIsEditMode(true);
    setEditingItemId(item.id);
    setEditingSection("konten");

    let parsedKonten;
    try {
      // Memastikan konten yang diterima adalah objek/array yang valid
      parsedKonten = JSON.parse(item.konten);
    } catch (error) {
      parsedKonten =
        typeof item.konten === "string"
          ? [{ type: "paragraph", children: [{ text: item.konten }] }]
          : defaultKontenValues.konten; // Gunakan default jika format tidak dikenali
    }

    formKonten.reset({
      konten: parsedKonten,
      image: undefined, // Reset gambar saat masuk mode edit agar bisa upload baru
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
    toast.info("Anda dalam mode edit. Silakan ubah konten pada form di atas.");
  };

  const handleCancelKontenEdit = () => {
    setIsEditMode(false);
    setEditingItemId(null);
    setEditingSection(null);
  };

  // sync page param
  useEffect(() => {
    const page = Number(searchParam.get("page") || 1);
    if (page !== currentPage) {
      setCurrentPage(page);
    }
  }, [searchParam, currentPage]);

  return (
    <AdminLayout>
      {/* ================== FORM KONTEN DESA ================== */}
      <Form {...formKonten}>
        <form onSubmit={formKonten.handleSubmit(handleSubmitKonten)}>
          <h1 className="text-3xl font-bold text-[#0F828C] mb-8">
            {isEditingKonten ? "EDIT KONTEN DESA" : "KONTEN DESA"}
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

            {isEditingKonten && dataKontenDesa?.data?.image && (
              <div className="mt-4">
                <p className="text-sm font-medium mb-2">Gambar Saat Ini:</p>
                <img
                  src={dataKontenDesa.data.image}
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
                {dataKontenDesa?.data ? (
                  <TableRow key={dataKontenDesa.data.id}>
                    <TableCell className="max-w-xs truncate">
                      <ReadOnlyRichText content={dataKontenDesa.data.konten} />
                    </TableCell>
                    <TableCell>
                      {dataKontenDesa.data.image ? (
                        <img
                          src={dataKontenDesa.data.image}
                          alt="konten"
                          className="w-16 h-16 object-cover rounded-md"
                        />
                      ) : (
                        "-"
                      )}
                    </TableCell>
                    <TableCell>{dataKontenDesa.data.createdAt}</TableCell>
                    <TableCell>{dataKontenDesa.data.updatedAt}</TableCell>
                    <TableCell className="flex gap-2 justify-center">
                      <Button
                        size="icon"
                        variant="ghost"
                        type="button"
                        onClick={() => handleEditKonten(dataKontenDesa.data)}
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
                                deleteKontenDesa(dataKontenDesa.data.id)
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
                      Belum ada konten desa. Silakan tambahkan.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </form>
      </Form>

      {/* ================== TABEL POKMAS (TIDAK DIUBAH) ================== */}
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
