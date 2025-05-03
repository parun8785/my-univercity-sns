"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      alert("ログアウトに失敗しました");
      console.error(error.message);
      return;
    }
    router.push("/login");
  };

  return (
    <button
      onClick={handleLogout}
      className="text-red-500 hover:underline px-4 py-2"
    >
      ログアウト
    </button>
  );
}
