import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Pencil } from "lucide-react";

// Data untuk field di konten utama
const dataFields = [
  { id: 1, label: "Data 1" },
  { id: 2, label: "Data 2" },
  { id: 3, label: "Data 3" },
  { id: 4, label: "Data 4" },
  { id: 5, label: "Data 5" },
  { id: 6, label: "Data 6" },
];

export default function DataDesa() {
  return (
    <AdminLayout>
      <h1 className="text-3xl font-bold text-[#0F828C] mb-8">DATA DESA</h1>

      <Card className="shadow-lg py-6">
        <CardHeader className="flex flex-row items-center justify-end border-b pb-4">
          <Button>
            <Pencil className="mr-2 h-4 w-4" /> Edit
          </Button>
        </CardHeader>
        <CardContent className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
            {dataFields.map((field) => (
              <div key={field.id} className="flex items-center gap-4">
                <label className="w-20 text-sm font-semibold text-gray-700">
                  {field.label}
                </label>
                <Input
                  className="flex-1"
                  readOnly
                  defaultValue="--Jumlah Data--"
                />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </AdminLayout>
  );
}
