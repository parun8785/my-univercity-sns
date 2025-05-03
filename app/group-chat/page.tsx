"use client";

import { useEffect, useState } from "react";
import { useUserStore } from "@/lib/userStore";
import { fetchGroupsForUser } from "@/lib/groupService";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function GroupChatListPage() {
  const { currentUser } = useUserStore();
  const [groups, setGroups] = useState<any[]>([]);

  useEffect(() => {
    if (!currentUser.id) return;
    fetchGroupsForUser(currentUser.id).then(setGroups).catch(console.error);
  }, [currentUser.id]);

  return (
    <ProtectedRoute>
      <main className="p-6 max-w-xl mx-auto">
        <h1 className="text-xl font-bold mb-4">💬 グループチャット一覧</h1>

        <Link href="/group-chat/new" className="underline text-blue-600 mb-4 block">
          ➕ グループを作成する
        </Link>

        {groups.length === 0 ? (
          <p>参加中のグループはありません。</p>
        ) : (
          <ul className="space-y-4">
            {groups.map((group) => (
              <li key={group.id}>
                <Link
                  href={`/group-chat/${group.id}`}
                  className="block p-4 rounded shadow bg-white hover:bg-gray-100"
                >
                  <div className="font-semibold">{group.name}</div>
                  <div className="text-sm text-gray-500">
                    メンバー数: {group.members.length}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        )}
      </main>
    </ProtectedRoute>
  );
}