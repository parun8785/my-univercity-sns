"use client";
import { useState } from "react";

export default function TagSearchInput({ onSearch }: { onSearch: (tags: string[]) => void }) {
  const [input, setInput] = useState("");

  const handleSearch = () => {
    const tags = input.trim().split(/\s+/); // 空白区切りでAND検索
    onSearch(tags);
  };

  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="タグを入力 (空白区切りでAND検索)"
        className="border p-2 rounded"
      />
      <button onClick={handleSearch} className="bg-blue-500 text-white px-4 py-2 rounded">検索</button>
    </div>
  );
}