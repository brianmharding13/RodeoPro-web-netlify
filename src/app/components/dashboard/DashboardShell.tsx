import { Link } from 'react-router';
import type { ReactNode } from 'react';

type DashboardShellProps = {
  title: string;
  description: string;
  children: ReactNode;
};

export default function DashboardShell({ title, description, children }: DashboardShellProps) {
  return (
    <div className="min-h-screen bg-[#111827] text-white">
      <nav className="bg-[#111827] border-b border-[#374151]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link to="/dashboard" className="flex items-center">
            <img src="/images/rodeoProWhite.svg" alt="RodeoPro" className="h-8" />
          </Link>
          <div className="flex items-center gap-2 text-sm">
            <Link to="/dashboard/horses" className="px-3 py-1.5 rounded-md border border-[#374151] text-[#9CA3AF] hover:text-white hover:border-[#6B7280] transition-colors">Horses</Link>
            <Link to="/dashboard/arenas" className="px-3 py-1.5 rounded-md border border-[#374151] text-[#9CA3AF] hover:text-white hover:border-[#6B7280] transition-colors">Arenas</Link>
            <Link to="/dashboard/runs" className="px-3 py-1.5 rounded-md border border-[#374151] text-[#9CA3AF] hover:text-white hover:border-[#6B7280] transition-colors">Runs</Link>
          </div>
        </div>
      </nav>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-2xl font-bold">{title}</h1>
        <p className="text-sm text-[#9CA3AF] mt-1">{description}</p>
        <div className="mt-6">{children}</div>
      </main>
    </div>
  );
}
