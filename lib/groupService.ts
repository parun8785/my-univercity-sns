import { supabase } from "./supabaseClient";

export async function createGroup({
  groupName,
  members,
  createdBy,
}: {
  groupName: string;
  members: string[];
  createdBy: string;
}): Promise<{ id: string }> {
  const { data, error } = await supabase
    .from("groups")
    .insert([{ name: groupName, members, created_by: createdBy }])
    .select()
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data;
}