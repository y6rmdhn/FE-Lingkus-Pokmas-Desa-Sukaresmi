import type { PropsWithChildren } from "react";
import Sidebar from "../block/sidebarAdmin/Sidebar";

export default function AdminLayout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen overflow-hidden bg-gray-100">
      <Sidebar />
      <main className="flex-1 overflow-y-auto p-6 sm:p-10">{children}</main>
    </div>
  );
}
