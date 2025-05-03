import { supabase } from "@/lib/supabaseClient";

type Group = {
  id: string;
  name: string;
  members: string[]; // userId[]
  createdBy: string; // 作成者（ユーザーID）
};

// グループを取得する関数
export async function getGroupById(groupId: string): Promise<Group | null> {
  const { data, error } = await supabase
    .from("groups")
    .select("*")
    .eq("id", groupId)
    .single();

  if (error) {
    console.error("グループ取得エラー:", error.message);
    return null;
  }

  return data as Group;
}

// グループを作成する関数
export async function addGroup(name: string, members: string[], createdBy: string): Promise<Group | null> {
  const { data, error } = await supabase
    .from("groups")
    .insert([{ name, members, createdBy }])
    .select()
    .single();

  if (error) {
    console.error("グループ作成エラー:", error.message);
    return null;
  }

  return data as Group;
}

// グループからメンバーを削除する関数
export async function removeMemberFromGroup(groupId: string, userId: string): Promise<void> {
  const { data, error } = await supabase
    .from("groups")
    .select("members")
    .eq("id", groupId)
    .single();

  if (error || !data) {
    console.error("メンバー削除エラー:", error?.message);
    return;
  }

  const updatedMembers = data.members.filter((id: string) => id !== userId);

  const { error: updateError } = await supabase
    .from("groups")
    .update({ members: updatedMembers })
    .eq("id", groupId);

  if (updateError) {
    console.error("メンバー更新エラー:", updateError.message);
  }
}

// グループを削除する関数
export async function deleteGroup(groupId: string): Promise<void> {
  const { error } = await supabase.from("groups").delete().eq("id", groupId);

  if (error) {
    console.error("グループ削除エラー:", error.message);
  }
}