import type { ReactNode } from "react";
import { AuthBackground } from "./AuthBackground";

export function AuthShell({ children }: { children: ReactNode }) {
  return (
    <div className="relative flex min-h-[calc(100vh-4rem)] w-full items-center justify-center px-4 py-10 sm:px-6">
      <AuthBackground />
      {children}
    </div>
  );
}
