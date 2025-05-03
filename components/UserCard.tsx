"use client";
import Link from "next/link";

export default function UserCard({ user }: { user: any }) {
  return (
    <div className="border p-4 rounded-md shadow-sm">
      <img src={user.avatar_url || "/default-avatar.png"} alt="avatar" className="w-12 h-12 rounded-full" />
      <p>{user.full_name}</p>
      <Link href={`/profile/${user.id}`} className="text-blue-500 underline">プロフィールを見る</Link>
    </div>
  );
}
