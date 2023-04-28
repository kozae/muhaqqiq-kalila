import { ReactNode, Suspense } from "react";
import Loading from "./Loading";

export default function AppSuspense({ children }: { children: ReactNode }) {
  return <Suspense fallback={<Loading />}>{children}</Suspense>;
}
