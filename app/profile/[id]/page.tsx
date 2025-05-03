"use client";

import { useUserStore } from "@/lib/userStore";
import ProtectedRoute from "@/components/ProtectedRoute";

type User = {
  id: string;
  name: string;
  university: string;
  avatarUrl: string;
  tags: string[];
  bio: string;
};

export default function ProfilePage({ params }: { params: { id: string } }) {
  const { currentUser } = useUserStore();

  // 今はログイン中ユーザーのプロフィールを表示（将来的に params.id に対応）
  const user: User = currentUser;

  return (
    <ProtectedRoute>
      <main className="p-6 max-w-xl mx-auto">
        <div className="flex items-center space-x-4 mb-6">
          <img
            src={user.avatarUrl}
            alt={user.name}
            className="w-20 h-20 rounded-full"
          />
          <div>
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <p className="text-gray-600">{user.university}</p>
          </div>
        </div>

        <div className="mb-4">
          <h2 className="text-lg font-semibold">タグ</h2>
          <div className="flex flex-wrap gap-2 mt-1">
            {user.tags.map((tag: string) => (
              <span
                key={tag}
                className="px-2 py-1 text-sm bg-blue-100 text-blue-700 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold mb-1">自己紹介</h2>
          <p className="text-gray-800">{user.bio}</p>
        </div>
      </main>
    </ProtectedRoute>
  );
}