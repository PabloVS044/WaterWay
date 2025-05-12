'use client'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ThemeProvider } from "@/components/theme-provider"
import { ConfigProvider } from "@/contexts/config-context"
import { ConfigNotification } from "@/components/config-notification"
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";



export function Providers({ children }: { children: ReactNode }) {
  return (
    <SessionProvider>
      <ThemeProvider attribute="class" defaultTheme="light">
        <ConfigProvider>
          <ToastProvider>
            {children}
          </ToastProvider>
          <ConfigNotification/>
        </ConfigProvider>
      </ThemeProvider>
    </SessionProvider>
  );
}

interface ToastProviderProps {
  children: React.ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  return (
    <>
      {children}
      <ToastContainer
        position="bottom-left"
        autoClose={3000}
      />
    </>
  );
}
