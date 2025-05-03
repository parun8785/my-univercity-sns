"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchMessages, sendMessage } from "@/lib/messageService";
import { useUserStore } from "@/lib/userStore";

type Message = {
  id: string;
  sender_id: string;
  content: string;
};

export default function GroupChatPage() {
  const { groupId } = useParams() as { groupId: string };
  const { currentUser } = useUserStore();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  // メッセージ読み込み
  useEffect(() => {
    if (!groupId) return;
    fetchMessages(groupId).then(setMessages).catch(console.error);
  }, [groupId]);

  // メッセージ送信
  const handleSend = async () => {
    if (!newMessage.trim()) return;

    try {
      const sent = await sendMessage(groupId, currentUser.id, newMessage.trim());
      setMessages((prev) => [...prev, sent]);
      setNewMessage("");
    } catch (err) {
      alert("送信に失敗しました");
      console.error(err);
    }
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-xl font-bold mb-4">💬 グループチャット</h1>

      <div className="border p-4 rounded h-80 overflow-y-scroll mb-4 bg-white">
        {messages.map((msg) => (
          <div key={msg.id} className="mb-2">
            <div className="text-sm text-gray-600">{msg.sender_id}</div>
            <div>{msg.content}</div>
          </div>
        ))}
      </div>

      <div className="flex gap-2">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="border p-2 flex-1"
          placeholder="メッセージを入力"
        />
        <button onClick={handleSend} className="bg-blue-600 text-white px-4 py-2 rounded">
          送信
        </button>
      </div>
    </main>
  );
}