"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabaseClient";

export default function UserInfo() {
  const [profile, setProfile] = useState<{ full_name: string; avatar_url: string } | null>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) return;

      const { data, error } = await supabase
        .from("profiles")
        .select("full_name, avatar_url")
        .eq("id", user.id)
        .single();

      if (!error && data) {
        setProfile(data);
      }
    };

    fetchProfile();
  }, []);

  if (!profile) return <p>読み込み中...</p>;

  return (
    <div className="flex items-center gap-4 p-4">
      <img
        src={profile.avatar_url || "/default-avatar.png"}
        alt="プロフィール画像"
        className="w-12 h-12 rounded-full"
      />
      <span className="text-lg">{profile.full_name}</span>
    </div>
  );
}