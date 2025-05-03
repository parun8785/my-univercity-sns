"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function HomePage() {
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
      }
    };
    getSession();
  }, []);

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 p-8">
      <h1 className="text-4xl font-bold mb-4 text-center text-blue-600">Campus Connect</h1>
      <p className="text-lg text-gray-700 mb-8 text-center max-w-xl">
        大学生同士が目的別に繋がれる、新しい形のSNS。勉強、趣味、留学、起業仲間を見つけよう。
      </p>

      {user ? (
        <div className="text-center space-y-4">
          <p className="text-green-600 mb-2">ようこそ、{user.email} さん！</p>

          <div className="flex flex-col space-y-2">
            <Link href="/chat">
              <button className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700 w-48">
                チャット画面へ
              </button>
            </Link>
            <Link href="/profile">
              <button className="bg-teal-600 text-white px-6 py-2 rounded hover:bg-teal-700 w-48">
                プロフィールを表示
              </button>
            </Link>
          </div>

          <button
            onClick={async () => {
              await supabase.auth.signOut();
              location.reload();
            }}
            className="bg-red-500 text-white px-6 py-2 rounded hover:bg-red-600 mt-4"
          >
            ログアウト
          </button>
        </div>
      ) : (
        <div className="flex space-x-4">
          <Link href="/login">
            <button className="bg-blue-600 text-white px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition">
              ログイン
            </button>
          </Link>
          <Link href="/signup">
            <button className="border border-blue-600 text-blue-600 px-6 py-2 rounded-lg hover:bg-blue-50 transition">
              新規登録
            </button>
          </Link>
        </div>
      )}
    </main>
  );
}
