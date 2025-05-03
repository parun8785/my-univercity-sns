import { supabase } from "./supabaseClient";
import { User } from "@supabase/supabase-js"; // SupabaseのUser型をインポート

// 現在のユーザーを取得する関数
export async function fetchCurrentUser(): Promise<User | null> {
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("ユーザー取得エラー:", error.message);
    return null;
  }

  return data?.user || null; // data.userはSupabaseのUser型
}

// ログアウトする関数
export async function logout(): Promise<void> {
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("ログアウトエラー:", error.message);
    throw error;
  }
}