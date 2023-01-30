'use client';
import './globals.css';
import { QueryClient, QueryClientProvider } from 'react-query';
import Script from 'next/script';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      {/*
        <head /> will contain the components returned by the nearest parent
        head.tsx. Find out more at https://beta.nextjs.org/docs/api-reference/file-conventions/head
      */}
      <head />
      <body>
        <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
      </body>
    </html>
  );
}
