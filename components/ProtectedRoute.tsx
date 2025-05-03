import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  useEffect(() => {
    const isAuthenticated = true; // 認証状態を確認するロジックを追加
    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [router]);

  return <>{children}</>;
}

type ProtectedRouteProps = {
  children: React.ReactNode;
};