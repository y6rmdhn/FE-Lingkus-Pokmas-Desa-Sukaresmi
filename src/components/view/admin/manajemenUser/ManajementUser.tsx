import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Save } from "lucide-react";

const ManajementUser = () => {
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
          <form className="space-y-6">
            {/* Username */}
            <div className="flex flex-col gap-2">
              <Label htmlFor="username" className="text-gray-700 font-medium">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                placeholder="Masukkan username"
                defaultValue="user123"
                className="focus:ring-2 focus:ring-[#0F828C] focus:border-[#0F828C]"
              />
            </div>

            {/* Password Baru */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="newPassword"
                className="text-gray-700 font-medium"
              >
                Password Baru
              </Label>
              <Input
                id="newPassword"
                type="password"
                placeholder="Masukkan password baru"
                className="focus:ring-2 focus:ring-[#0F828C] focus:border-[#0F828C]"
              />
            </div>

            {/* Konfirmasi Password */}
            <div className="flex flex-col gap-2">
              <Label
                htmlFor="confirmPassword"
                className="text-gray-700 font-medium"
              >
                Konfirmasi Password
              </Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="Ulangi password baru"
                className="focus:ring-2 focus:ring-[#0F828C] focus:border-[#0F828C]"
              />
            </div>

            {/* Tombol Simpan */}
            <div className="flex justify-end pt-4">
              <Button className="bg-[#0F828C] hover:bg-[#0c6a74] px-6 py-2 rounded-lg shadow-md">
                <Save className="mr-2 h-4 w-4" /> Simpan
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </AdminLayout>
  );
};

export default ManajementUser;
