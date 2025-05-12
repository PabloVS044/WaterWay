import { Sidebar } from "@/components/sidebar";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen w-full">
      <Sidebar/>
      <main className="flex-1">{children}</main>
    </div>
  )
}