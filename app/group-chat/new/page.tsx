"use client";

import { createGroup } from "@/lib/groupService";
import { useUserStore } from "@/lib/userStore";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function NewGroupPage() {
  const { currentUser } = useUserStore();
  const router = useRouter();

  const [groupName, setGroupName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);

  const handleCreate = async () => {
    if (!groupName.trim()) return;

    const members = [...new Set([currentUser.id, ...selectedMembers])];

    try {
      const newGroup = await createGroup({
        groupName: groupName.trim(),
        members,
        createdBy: currentUser.id,
      });
      router.push(`/group-chat/${newGroup.id}`);
    } catch (err) {
      alert("作成に失敗しました");
      console.error(err);
    }
  };

  return (
    <main className="p-6">
      <h1 className="text-xl font-bold mb-4">新しいグループ作成</h1>
      <input
        value={groupName}
        onChange={(e) => setGroupName(e.target.value)}
        placeholder="グループ名"
        className="border p-2 mb-4 w-full"
      />
      {/* メンバー選択UIは省略 */}
      <button onClick={handleCreate} className="bg-blue-600 text-white px-4 py-2 rounded">
        作成
      </button>
    </main>
  );
}