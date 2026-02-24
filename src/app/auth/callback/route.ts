import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get('code');
  const join = searchParams.get('join');

  if (code) {
    const supabase = await createClient();
    const { error, data } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.session) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('id')
        .eq('id', data.session.user.id)
        .single();

      if (profile) {
        const redirect = join
          ? `${origin}/dashboard?join=${encodeURIComponent(join)}`
          : `${origin}/dashboard`;
        return NextResponse.redirect(redirect);
      }

      // No profile — new invited user, send to welcome page
      const redirect = join
        ? `${origin}/welcome?join=${encodeURIComponent(join)}`
        : `${origin}/welcome`;
      return NextResponse.redirect(redirect);
    }
  }

  // Auth error — redirect to login
  return NextResponse.redirect(`${origin}/login`);
}
