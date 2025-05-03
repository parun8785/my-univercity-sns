import { supabase } from "./supabaseClient";

type Message = {
  id: string;
  sender_id: string;
  content: string;
};

// メッセージ取得：ユーザー名もJOINして取得
export async function fetchMessages(groupId: string): Promise<Message[]> {
  // メッセージを取得するロジック
  return [
    { id: "1", sender_id: "user1", content: "こんにちは" },
    { id: "2", sender_id: "user2", content: "こんにちは！" },
  ];
}

export async function sendMessage(
  groupId: string,
  senderId: string,
  content: string
): Promise<Message> {
  // メッセージを送信するロジック
  return { id: "3", sender_id: senderId, content };
}