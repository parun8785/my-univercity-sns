"use client";

import { useParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useUserStore } from "@/lib/userStore";
import { useGroupStore } from "@/lib/groupStore";
import { useChatStore } from "@/lib/chatStore";
import { useState } from "react";
import { useRouter } from "next/navigation";

type User = {
  id: string;
  name: string;
};

type Message = {
  id: string;
  from: string;
  content: string;
};

export default function GroupChatPage() {
  const router = useRouter();
  const { roomId } = useParams();
  const { currentUser, allUsers }: { currentUser: User; allUsers: User[] } = useUserStore();
  const { getGroupById, deleteGroup, removeMemberFromGroup } = useGroupStore();
  const { sendGroupMessage, getMessagesInGroup } = useChatStore();

  const group = getGroupById(roomId as string);
  const messages: Message[] = getMessagesInGroup(roomId as string);
  const [text, setText] = useState("");

  if (!group) return <p>グループが見つかりません</p>;

  const handleSend = () => {
    if (text.trim()) {
      sendGroupMessage(group.id, currentUser.id, text);
      setText("");
    }
  };

  const getUserName = (id: string) =>
    allUsers.find((u: User) => u.id === id)?.name ?? "不明なユーザー";

  return (
    <ProtectedRoute>
      <main className="p-6 max-w-xl mx-auto">
        <h1 className="text-xl font-bold mb-4">💬 {group.name} グループチャット</h1>

        <div className="border rounded p-4 h-96 overflow-y-scroll mb-4 bg-gray-50">
          {messages.map((msg: Message, idx: number) => (
            <div key={idx} className="mb-2">
              <div className="text-xs text-gray-500">{getUserName(msg.from)}</div>
              <div
                className={`px-3 py-2 rounded-lg inline-block ${
                  msg.from === currentUser.id
                    ? "bg-blue-500 text-white ml-auto"
                    : "bg-gray-200 text-black"
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

        {group.createdBy === currentUser.id ? (
          <button
            className="text-red-600 mt-6 underline"
            onClick={() => {
              const confirm = window.confirm("このグループを削除しますか？");
              if (confirm) {
                deleteGroup(group.id);
                router.push("/group-chat");
              }
            }}
          >
            🗑 このグループを削除
          </button>
        ) : (
          <button
            className="text-gray-600 mt-6 underline"
            onClick={() => {
              const confirm = window.confirm("このグループから退出しますか？");
              if (confirm) {
                removeMemberFromGroup(group.id, currentUser.id);
                router.push("/group-chat");
              }
            }}
          >
            🚪 グループを退出する
          </button>
        )}
      </main>
    </ProtectedRoute>
  );
}