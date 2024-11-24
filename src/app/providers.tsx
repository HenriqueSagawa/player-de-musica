"use client";

import { EdgeStoreProvider } from '@/lib/edgestore';
import { NextUIProvider } from '@nextui-org/react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { SessionProvider } from 'next-auth/react';
import { Toaster } from 'react-hot-toast';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <EdgeStoreProvider>
      <SessionProvider>
        <NextUIProvider>
          <NextThemesProvider attribute="class" defaultTheme="system" storageKey="theme">
            {children}
            <Toaster position="top-right" />
          </NextThemesProvider>
        </NextUIProvider>
      </SessionProvider>
    </EdgeStoreProvider>
  );
}