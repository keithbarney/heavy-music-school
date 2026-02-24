import { createClient } from '@supabase/supabase-js';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { email, joinCode, teacherName } = await request.json();

  if (!email || !joinCode) {
    return NextResponse.json({ error: 'Missing email or joinCode' }, { status: 400 });
  }

  // Use plain supabase-js client with implicit flow (no PKCE).
  // PKCE stores a code verifier in the sender's browser cookies,
  // but the student clicks the link on a different device — no cookie = exchange fails.
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    { auth: { flowType: 'implicit' } }
  );

  const origin = new URL(request.url).origin;
  const redirectTo = `${origin}/auth/invite-callback?join=${encodeURIComponent(joinCode)}`;

  const { error } = await supabase.auth.signInWithOtp({
    email,
    options: {
      emailRedirectTo: redirectTo,
      data: { teacher_name: teacherName, join_code: joinCode },
    },
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  return NextResponse.json({ success: true });
}
