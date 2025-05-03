'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useSession } from '@/hooks/UserSession';

type User = {
  id: string;
  email: string;
  full_name?: string;
  role: string;
};

export default function AdminUsersPage() {
  const { user, loading } = useSession();
  const [users, setUsers] = useState<User[]>([]);
  const [fetching, setFetching] = useState(false);
  const router = useRouter();
  const supabase = createClientComponentClient();

  // 非管理者をリダイレクト
  useEffect(() => {
    if (!loading && user?.role !== 'admin') {
      router.push('/');
    }
  }, [loading, user]);

  // ユーザー一覧の取得
  useEffect(() => {
    const fetchUsers = async () => {
      setFetching(true);
      const { data, error } = await supabase.from('users').select('*');
      if (!error && data) {
        setUsers(data);
      }
      setFetching(false);
    };
    fetchUsers();
  }, []);

  // 権限変更
  const changeRole = async (id: string, newRole: string) => {
    await supabase.from('users').update({ role: newRole }).eq('id', id);
    setUsers((prev) =>
      prev.map((u) => (u.id === id ? { ...u, role: newRole } : u))
    );
  };

  // ユーザー削除
  const deleteUser = async (id: string) => {
    const confirm = window.confirm('本当に削除しますか？');
    if (!confirm) return;

    await supabase.from('users').delete().eq('id', id);
    setUsers((prev) => prev.filter((u) => u.id !== id));
  };

  if (loading || fetching) {
    return <p>読み込み中...</p>;
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">ユーザー管理</h1>
      <table className="w-full table-auto border">
        <thead>
          <tr className="bg-gray-200">
            <th className="px-4 py-2">ID</th>
            <th>Email</th>
            <th>名前</th>
            <th>ロール</th>
            <th>操作</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id} className="border-t">
              <td className="px-2 py-1 text-xs">{u.id.slice(0, 6)}...</td>
              <td>{u.email}</td>
              <td>{u.full_name ?? '-'}</td>
              <td>{u.role}</td>
              <td className="flex gap-2">
                <button
                  onClick={() =>
                    changeRole(u.id, u.role === 'admin' ? 'user' : 'admin')
                  }
                  className="text-sm bg-blue-500 text-white px-2 py-1 rounded"
                >
                  {u.role === 'admin' ? '一般化' : '管理者化'}
                </button>
                <button
                  onClick={() => deleteUser(u.id)}
                  className="text-sm bg-red-500 text-white px-2 py-1 rounded"
                >
                  削除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
