import { supabase } from "@/lib/supabaseClient";

type Message = {
  id: string; // メッセージの一意のID
  from: string; // 送信者のユーザーID
  to?: string; // 宛先ユーザーID（個人チャット用）
  roomId?: string; // グループチャット用
  content: string; // メッセージ内容
  timestamp: string; // タイムスタンプ
};

// メッセージを送信する関数（個人チャット用）
export async function sendMessage(from: string, to: string, content: string) {
  const { data, error } = await supabase
    .from("messages")
    .insert([{ from, to, content, timestamp: new Date().toISOString() }]);

  if (error) {
    console.error("メッセージ送信エラー:", error.message);
    throw error;
  }

  return data;
}

// メッセージを送信する関数（グループチャット用）
export async function sendGroupMessage(roomId: string, from: string, content: string) {
  const { data, error } = await supabase
    .from("messages")
    .insert([{ roomId, from, content, timestamp: new Date().toISOString() }]);

  if (error) {
    console.error("グループメッセージ送信エラー:", error.message);
    throw error;
  }

  return data;
}

// 個人チャットのメッセージを取得する関数
export async function getMessagesWithUser(userId1: string, userId2: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .or(`(from.eq.${userId1},to.eq.${userId2})`)
    .or(`(from.eq.${userId2},to.eq.${userId1}`)
    .order("timestamp", { ascending: true });

  if (error) {
    console.error("メッセージ取得エラー:", error.message);
    throw error;
  }

  return data || [];
}

// グループチャットのメッセージを取得する関数
export async function getMessagesInGroup(roomId: string): Promise<Message[]> {
  const { data, error } = await supabase
    .from("messages")
    .select("*")
    .eq("roomId", roomId)
    .order("timestamp", { ascending: true });

  if (error) {
    console.error("グループメッセージ取得エラー:", error.message);
    throw error;
  }

  return data || [];
}