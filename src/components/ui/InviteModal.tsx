'use client';

import { useState } from 'react';

interface InviteModalProps {
  joinCode: string;
  teacherName: string;
  onClose: () => void;
}

function parseEmails(input: string): string[] {
  return input
    .split(/[,\n]+/)
    .map((e) => e.trim().toLowerCase())
    .filter((e) => e.length > 0);
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function InviteModal({ joinCode, teacherName, onClose }: InviteModalProps) {
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);
  const [results, setResults] = useState<{ sent: number; failed: string[] } | null>(null);

  const handleSend = async () => {
    const emails = parseEmails(input);
    if (emails.length === 0) return;

    const invalid = emails.filter((e) => !isValidEmail(e));
    if (invalid.length > 0) {
      setResults({ sent: 0, failed: invalid.map((e) => `${e} (invalid format)`) });
      return;
    }

    setSending(true);
    setResults(null);

    let sent = 0;
    const failed: string[] = [];

    for (const email of emails) {
      const res = await fetch('/api/invite', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, joinCode, teacherName }),
      });
      const data = await res.json();
      if (data.error) {
        failed.push(`${email} (${data.error})`);
      } else {
        sent++;
      }
    }

    setResults({ sent, failed });
    setSending(false);
    if (sent > 0 && failed.length === 0) {
      setInput('');
    }
  };

  const emails = parseEmails(input);
  const count = emails.length;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 sm:items-center" onClick={onClose}>
      <div
        className="w-full max-w-md rounded-t-xl border border-card-border bg-card p-6 shadow-xl sm:rounded-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Invite Students</h2>
          <button onClick={onClose} className="text-muted hover:text-foreground">✕</button>
        </div>

        <p className="mb-3 text-sm text-muted">
          Enter student email addresses (one per line or comma-separated). They&apos;ll receive a sign-up link with your join code <span className="font-mono font-semibold text-accent">{joinCode}</span> embedded.
        </p>

        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={"student1@example.com\nstudent2@example.com"}
          rows={4}
          className="w-full rounded-lg border border-input-border bg-input-bg px-3 py-2 text-sm text-foreground placeholder:text-muted"
        />

        {results && (
          <div className="mt-3 rounded-lg border border-card-border bg-surface p-3 text-sm">
            {results.sent > 0 && (
              <p className="text-accent">✓ {results.sent} invite{results.sent !== 1 ? 's' : ''} sent</p>
            )}
            {results.failed.length > 0 && (
              <div className="text-danger">
                <p>Failed:</p>
                <ul className="ml-4 list-disc">
                  {results.failed.map((f) => (
                    <li key={f}>{f}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}

        <div className="mt-4 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="rounded-lg px-4 py-2 text-sm text-muted hover:text-foreground"
          >
            Close
          </button>
          <button
            onClick={handleSend}
            disabled={sending || count === 0}
            className="rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-black hover:bg-accent-hover disabled:opacity-50"
          >
            {sending ? 'Sending...' : `Send ${count > 0 ? count : ''} Invite${count !== 1 ? 's' : ''}`}
          </button>
        </div>
      </div>
    </div>
  );
}
