"use client";
import Link from "next/link";
import LogoutButton from "./LogoutButton";

export default function Header() {
  return (
    <header className="flex justify-between items-center p-4 shadow-md">
      <Link href="/home" className="text-xl font-bold">MySNS</Link>
      <div className="flex gap-4 items-center">
        <Link href="/users">ユーザー一覧</Link>
        <Link href="/groups">グループ</Link>
        <LogoutButton />
      </div>
    </header>
  );
}