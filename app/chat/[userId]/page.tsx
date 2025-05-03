"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabaseClient";
import Link from "next/link";

export default function ChatPage() {
  const [user, setUser] = useState<any>(null);
  const [users, setUsers] = useState<any[]>([]);
  const [messages, setMessages] = useState<any[]>([]);
  const [partner, setPartner] = useState<any>(null);
  const [text, setText] = useState("");

  const router = useRouter();

  // セッション取得＆ユーザー一覧取得
  useEffect(() => {
    const load = async () => {
      const { data: sessionData } = await supabase.auth.getSession();
      const currentUser = sessionData?.session?.user;
      setUser(currentUser);

      if (!currentUser) {
        router.push("/login");
        return;
      }

      const { data: usersData } = await supabase.from("profiles").select("*");
      setUsers(usersData?.filter((u) => u.id !== currentUser.id) || []);
    };

    load();
  }, [router]);

  // チャット読み込み
  const loadMessages = async (partnerId: string) => {
    setPartner(users.find((u) => u.id === partnerId));

    const { data, error } = await supabase
      .from("messages")
      .select("*")
      .or(`from.eq.${user.id},to.eq.${user.id}`)
      .order("created_at", { ascending: true });

    if (!error && data) setMessages(data);
  };

  // メッセージ送信
  const handleSend = async () => {
    if (!text.trim() || !partner) return;

    const { error } = await supabase.from("messages").insert([
      {
        from: user.id,
        to: partner.id,
        content: text,
      },
    ]);

    if (!error) {
      setText("");
      loadMessages(partner.id);
    }
  };

  return (
    <main className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-blue-600">💬 チャット</h1>

      {!partner ? (
        <div>
          <h2 className="text-lg font-semibold mb-4">相手を選んでください:</h2>
          <ul className="space-y-3">
            {users.map((u) => (
              <li key={u.id}>
                <button
                  onClick={() => loadMessages(u.id)}
                  className="w-full text-left p-3 border rounded hover:bg-gray-100"
                >
                  {u.full_name || u.email} さんとチャット
                </button>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div>
          <h2 className="text-lg font-semibold mb-4">{partner.full_name || partner.email} さんとのチャット</h2>

          <div className="border rounded p-4 h-96 overflow-y-scroll bg-white mb-4 shadow">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 flex ${msg.from === user.id ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-3 py-2 rounded-lg max-w-xs ${
                    msg.from === user.id ? "bg-blue-500 text-white" : "bg-gray-200 text-black"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="メッセージを入力"
              className="flex-1 border px-3 py-2 rounded"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              送信
            </button>
          </div>

          <button
            onClick={() => setPartner(null)}
            className="mt-4 text-blue-600 underline text-sm"
          >
            ← 相手一覧に戻る
          </button>
        </div>
      )}

      <Link href="/" className="block mt-6 text-center text-blue-700 underline text-sm">
        ホームに戻る
      </Link>
    </main>
  );
}
