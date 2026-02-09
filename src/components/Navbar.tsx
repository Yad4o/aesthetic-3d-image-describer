'use client'

import React from 'react';
import { useBlinkAuth } from '@blinkdotnew/react';
import { blink } from '@/lib/blink';
import { Sparkles, LogOut, User } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { isAuthenticated, user } = useBlinkAuth();

  return (
    <nav className="sticky top-0 z-50 w-full glass border-b border-white/10 px-6 py-4">
      <div className="mx-auto flex max-w-7xl items-center justify-between">
        <div className="flex items-center gap-2 group cursor-pointer">
          <div className="rounded-xl bg-gradient-to-br from-primary to-secondary p-2 transition-transform group-hover:scale-110">
            <Sparkles className="h-6 w-6 text-white" />
          </div>
          <span className="text-xl font-bold tracking-tight text-glow">Vision3D</span>
        </div>

        <div className="flex items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 rounded-full glass px-3 py-1 border-white/10">
                <User className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium">{user?.displayName || 'User'}</span>
              </div>
              <button
                onClick={() => blink.auth.signOut()}
                className="flex items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              >
                <LogOut className="h-4 w-4" />
                Sign Out
              </button>
            </div>
          ) : (
            <button
              onClick={() => blink.auth.login(window.location.href)}
              className="rounded-lg bg-primary px-5 py-2 text-sm font-semibold text-white shadow-lg transition-all hover:scale-105 active:scale-95"
            >
              Sign In
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};