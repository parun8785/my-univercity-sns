"use client";

import { useState, ChangeEvent } from "react";
import { useUserStore } from "@/lib/userStore";

export default function EditProfilePage() {
  const { currentUser, updateUser } = useUserStore();

  const [avatarUrl, setAvatarUrl] = useState(currentUser.avatarUrl);
  const [name, setName] = useState(currentUser.name);
  const [university, setUniversity] = useState(currentUser.university);
  const [tags, setTags] = useState<string[]>(currentUser.tags);
  const [bio, setBio] = useState(currentUser.bio);

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setAvatarUrl(url); // プレビュー表示
      // 実際はこの後、クラウドにアップしてURLを保存（次フェーズ）
    }
  };

  const handleSave = () => {
    updateUser({ name, university, tags, bio, avatarUrl });
    alert("プロフィールを保存しました！");
  };

  const allTags = ["勉強", "趣味", "起業", "恋愛", "留学", "バイト"];
  const handleTagToggle = (tag: string) => {
    setTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  return (
    <main className="p-6 max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">プロフィール編集</h1>

      {/* プロフィール画像アップロード */}
      <div className="mb-4">
        <label className="block font-medium mb-1">プロフィール画像</label>
        <div className="flex items-center space-x-4">
          <img
            src={avatarUrl}
            alt="avatar preview"
            className="w-20 h-20 rounded-full object-cover"
          />
          <input type="file" accept="image/*" onChange={handleAvatarChange} />
        </div>
      </div>

      {/* 名前 */}
      <div className="mb-4">
        <label className="block font-medium mb-1">名前</label>
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* 大学 */}
      <div className="mb-4">
        <label className="block font-medium mb-1">大学</label>
        <input
          value={university}
          onChange={(e) => setUniversity(e.target.value)}
          className="w-full border rounded px-3 py-2"
        />
      </div>

      {/* タグ */}
      <div className="mb-4">
        <label className="block font-medium mb-1">タグ（興味）</label>
        <div className="flex flex-wrap gap-2 mt-1">
          {allTags.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => handleTagToggle(tag)}
              className={`px-3 py-1 rounded-full border ${
                tags.includes(tag)
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700"
              }`}
            >
              #{tag}
            </button>
          ))}
        </div>
      </div>

      {/* 自己紹介 */}
      <div className="mb-4">
        <label className="block font-medium mb-1">自己紹介</label>
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          className="w-full border rounded px-3 py-2 h-24"
        />
      </div>

      <button
        onClick={handleSave}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
      >
        保存する
      </button>
    </main>
  );
}
