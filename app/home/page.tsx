"use client";
import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";

type User = {
  id: string;
  name: string;
  university: string;
  avatarUrl: string;
  tags: string[];
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const searchParams = useSearchParams();
  const tag = searchParams.get("tag");

  useEffect(() => {
    // 仮データ：本番ではAPIに tag を渡してフィルター
    const mockUsers: User[] = [
      {
        id: "u1",
        name: "太郎",
        university: "東京大学",
        avatarUrl: "/avatar.png",
        tags: ["勉強", "起業"],
      },
      {
        id: "u2",
        name: "花子",
        university: "早稲田大学",
        avatarUrl: "/avatar2.png",
        tags: ["趣味", "留学"],
      },
    ];

    const filtered = tag
      ? mockUsers.filter((u) => u.tags.includes(tag))
      : mockUsers;

    setUsers(filtered);
  }, [tag]);

  return (
    <ProtectedRoute>
      <main className="p-6 max-w-4xl mx-auto">
        <h1 className="text-2xl font-bold mb-4">
          {tag ? `#${tag} タグのユーザー一覧` : "ユーザー一覧"}
        </h1>

        {users.length === 0 ? (
          <p className="text-gray-500">ユーザーが見つかりませんでした。</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {users.map((user) => (
              <a
                key={user.id}
                href={`/profile/${user.id}`}
                className="p-4 border rounded-lg hover:bg-gray-50"
              >
                <img
                  src={user.avatarUrl}
                  alt="avatar"
                  className="w-12 h-12 rounded-full mb-2"
                />
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-gray-500">{user.university}</p>
                <div className="text-xs mt-1 text-blue-600">
                  {user.tags.map((t) => `#${t} `)}
                </div>
              </a>
            ))}
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}
