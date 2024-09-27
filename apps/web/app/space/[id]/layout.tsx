import Header from '@/components/layout/header';
import Sidebar from '@/components/layout/sidebar';
import { SpaceSwitcher } from '@/components/space-switcher';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Help Center Space',
  description: ''
};

export default function SpaceLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: { id: string }
}) {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex items-center p-4 border-b">
        <SpaceSwitcher currentSpaceId={params.id} />
        <Header />
      </div>
      <div className="flex flex-1 overflow-hidden">
        <Sidebar />
        <main className="flex-1 overflow-auto p-4">
          {children}
        </main>
      </div>
    </div>
  );
}
