"use client";

import { useState, ChangeEvent } from "react";
import { supabase } from "@/lib/supabaseClient";
import { useUserStore } from "@/lib/userStore";

export default function AvatarUpload() {
  const { currentUser } = useUserStore();
  const [uploading, setUploading] = useState(false);

  const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !currentUser) return;

    setUploading(true);

    const fileExt = file.name.split(".").pop();
    const filePath = `${currentUser.id}.${fileExt}`;

    // Storage にアップロード
    const { error: uploadError } = await supabase.storage
      .from("avatars")
      .upload(filePath, file, {
        upsert: true,
      });

    if (uploadError) {
      alert("アップロード失敗：" + uploadError.message);
      setUploading(false);
      return;
    }

    // 画像URLの取得
    const { data: { publicUrl } } = supabase.storage
      .from("avatars")
      .getPublicUrl(filePath);

    // profiles テーブルにURLを保存
    const { error: updateError } = await supabase
      .from("profiles")
      .update({ avatar_url: publicUrl })
      .eq("id", currentUser.id);

    if (updateError) {
      alert("プロフィール更新失敗：" + updateError.message);
    } else {
      alert("アップロード成功！");
    }

    setUploading(false);
  };

  return (
    <div className="mb-4">
      <label className="block mb-1 font-bold">アバター画像</label>
      <input type="file" accept="image/*" onChange={handleUpload} />
      {uploading && <p>アップロード中...</p>}
    </div>
  );
}
