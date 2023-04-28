import { ReactNode } from "react";

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <main className="animate-fade-in w-full grow scale-90 rounded bg-white  opacity-0 ">
      {children}
    </main>
  );
}
