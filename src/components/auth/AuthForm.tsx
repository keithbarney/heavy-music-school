'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import type { Role } from '@/types';

type Mode = 'signin' | 'signup';

export function AuthForm() {
  const { signUp, signIn, signInWithMagicLink, error, clearError } = useAuth();
  const [mode, setMode] = useState<Mode>('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [role, setRole] = useState<Role>('teacher');
  const [magicLinkSent, setMagicLinkSent] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    clearError();
    setSubmitting(true);

    try {
      if (mode === 'signup') {
        await signUp(email, password, fullName, role);
        setSignupSuccess(true);
      } else {
        await signIn(email, password);
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleMagicLink = async () => {
    clearError();
    setSubmitting(true);
    try {
      await signInWithMagicLink(email);
      setMagicLinkSent(true);
    } finally {
      setSubmitting(false);
    }
  };

  const toggleMode = () => {
    setMode(mode === 'signin' ? 'signup' : 'signin');
    clearError();
    setMagicLinkSent(false);
    setSignupSuccess(false);
  };

  return (
    <div className="w-full max-w-md rounded-2xl border border-card-border bg-card p-6">
      <h2 className="mb-4 text-xl font-semibold text-foreground">
        {mode === 'signin' ? 'Sign in' : 'Sign up'}
      </h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="rounded-lg border border-input-border bg-input-bg px-3 py-2 text-foreground placeholder:text-muted"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required={mode === 'signup'}
          minLength={6}
          className="rounded-lg border border-input-border bg-input-bg px-3 py-2 text-foreground placeholder:text-muted"
        />

        {mode === 'signup' && (
          <>
            <input
              type="text"
              placeholder="Full name"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
              className="rounded-lg border border-input-border bg-input-bg px-3 py-2 text-foreground placeholder:text-muted"
            />

            <select
              value={role}
              onChange={(e) => setRole(e.target.value as Role)}
              className="rounded-lg border border-input-border bg-input-bg px-3 py-2 text-foreground"
            >
              <option value="teacher">Teacher</option>
              <option value="student">Student</option>
            </select>
          </>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="rounded-lg bg-accent px-4 py-2 font-semibold text-black hover:bg-accent-hover disabled:opacity-50"
        >
          {submitting ? 'Loading...' : mode === 'signin' ? 'Sign in' : 'Sign up'}
        </button>

        <button
          type="button"
          onClick={handleMagicLink}
          disabled={submitting || !email}
          className="rounded-lg border border-input-border bg-input-bg px-4 py-2 text-foreground hover:bg-card disabled:opacity-50"
        >
          Send magic link
        </button>
      </form>

      {signupSuccess && !error && (
        <p className="mt-3 text-sm text-accent">Account created — check your email to confirm.</p>
      )}

      {magicLinkSent && (
        <p className="mt-3 text-sm text-accent">Magic link sent — check your email.</p>
      )}

      {error && (
        <p className="mt-3 text-sm text-danger">{error}</p>
      )}

      <p className="mt-4 text-sm text-muted">
        {mode === 'signin' ? "Don't have an account?" : 'Already have an account?'}{' '}
        <button
          type="button"
          onClick={toggleMode}
          className="text-accent underline"
        >
          {mode === 'signin' ? 'Sign up' : 'Sign in'}
        </button>
      </p>
    </div>
  );
}
