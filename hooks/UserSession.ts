// src/hooks/useSession.ts
'use client';

import { useEffect, useState } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Session } from '@supabase/supabase-js';
export function UserSession() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
}

/**
 * Supabaseのセッションを取得するカスタムフック
 */
export function useSession() {
  const [session, setSession] = useState<Session | null>(null);
  const supabase = createClientComponentClient();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // 初回セッション取得
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session);
    });

    // セッションの変更をリアルタイムに追跡
    const { data: listener } = supabase.auth.onAuthStateChange((_event, newSession) => {
      setSession(newSession);
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [supabase]);

  return { user, loading };
}
