"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignup, setIsSignup] = useState(false);
  const router = useRouter();

  const handleAuth = async () => {
    const authFunc = isSignup ? supabase.auth.signUp : supabase.auth.signInWithPassword;
    const { error } = await authFunc({ email, password });

    if (error) {
      alert(error.message);
    } else {
      location.href = "/";
    }
  };

  return (
    <main className="p-6 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">{isSignup ? "新規登録" : "ログイン"}</h1>

      <input
        type="email"
        placeholder="メールアドレス"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="border p-2 mb-2 w-full"
      />
      <input
        type="password"
        placeholder="パスワード"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="border p-2 mb-4 w-full"
      />
      <button
        onClick={handleAuth}
        className="bg-blue-600 text-white px-4 py-2 w-full rounded"
      >
        {isSignup ? "登録" : "ログイン"}
      </button>

      <p
        className="mt-4 text-blue-500 cursor-pointer"
        onClick={() => setIsSignup(!isSignup)}
      >
        {isSignup ? "ログインに切り替える" : "新規登録はこちら"}
      </p>
    </main>
  );
}
