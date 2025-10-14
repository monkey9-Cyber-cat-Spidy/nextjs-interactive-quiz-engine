import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Interactive Quiz Engine | Next.js 14 App Router',
  description: 'Real-time interactive quiz platform with countdown timers and instant architectural explanations',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-950 text-slate-100">
        {children}
      </body>
    </html>
  );
}
