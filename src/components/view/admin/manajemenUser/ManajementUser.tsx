import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

import { Form } from "@/components/ui/form";
import { FormFieldInput } from "@/components/block/FormFieldInput/FormFieldInput";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

// Assuming you have this service function
import authServices from "@/services/auth.services";

// 1. Define the validation schema with Zod
const updateUserSchema = z
  .object({
    username: z.string().min(3, { message: "Username minimal 3 karakter." }),
    currentPassword: z
      .string()
      .min(1, { message: "Password saat ini wajib diisi." }),
    newPassword: z
      .string()
      .min(6, { message: "Password baru minimal 6 karakter." }),
  })
  .refine((data) => data.newPassword !== data.currentPassword, {
    message: "Password baru tidak boleh sama dengan password lama.",
    path: ["newPassword"], // Apply the error to the newPassword field
  });

// 2. Infer the form type from the schema
type UpdateUserFormValue = z.infer<typeof updateUserSchema>;

const ManajementUser = () => {
  // 3. Initialize React Hook Form
  const form = useForm<UpdateUserFormValue>({
    resolver: zodResolver(updateUserSchema),
    defaultValues: {
      username: "", // You could pre-fill this with the current user's data
      currentPassword: "",
      newPassword: "",
    },
  });

  // 4. Set up TanStack Mutation for the update operation
  const { mutate: updateUser, isPending } = useMutation({
    mutationFn: (data: UpdateUserFormValue) => authServices.updateUser(data),
    onSuccess: () => {
      toast.success("Akun berhasil diperbarui!");
      form.reset(); // Clear the form after successful submission
    },
    onError: (error: any) => {
      // Display a more specific error message from the API if available
      const errorMessage =
        error?.response?.data?.message || "Gagal memperbarui akun.";
      toast.error(errorMessage);
    },
  });

  // 5. Create the submit handler
  const onSubmit = (values: UpdateUserFormValue) => {
    updateUser(values); // This calls the mutation function
  };

  return (
    <AdminLayout>
      {/* Judul */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-extrabold text-[#0F828C] tracking-wide">
          MANAJEMEN USER
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Update data akun anda dengan aman
        </p>
      </div>

      {/* Card Form */}
      <Card className="shadow-xl rounded-2xl max-w-xl mx-auto border border-gray-200">
        <CardHeader className="border-b pb-4 bg-gray-50 rounded-t-2xl">
          <CardTitle className="text-lg font-semibold text-gray-700 mt-5">
            Update Akun
          </CardTitle>
        </CardHeader>

        <CardContent className="p-8">
          {/* 6. Connect the form to the Form Provider and submit handler */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {/* Username */}
              <div className="flex flex-col gap-2">
                <Label htmlFor="username" className="text-gray-700 font-medium">
                  Username
                </Label>
                <FormFieldInput
                  form={form}
                  name="username"
                  placeholder="Masukkan username baru..."
                />
              </div>

              {/* Current Password */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="currentPassword"
                  className="text-gray-700 font-medium"
                >
                  Current Password
                </Label>
                <FormFieldInput
                  form={form}
                  name="currentPassword"
                  type="password"
                  placeholder="Masukkan password saat ini..."
                />
              </div>

              {/* New Password */}
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor="newPassword"
                  className="text-gray-700 font-medium"
                >
                  New Password
                </Label>
                <FormFieldInput
                  form={form}
                  name="newPassword"
                  type="password"
                  placeholder="Masukkan password baru..."
                />
              </div>

              {/* Tombol Simpan */}
              <div className="flex justify-end pt-4">
                <Button
                  type="submit"
                  className="bg-[#0F828C] hover:bg-[#0c6a74] px-6 py-2 rounded-lg shadow-md"
                  disabled={isPending} // Disable button during submission
                >
                  {isPending ? (
                    "Menyimpan..."
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" /> Simpan
                    </>
                  )}
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default ManajementUser;
