import type { Metadata } from 'next';
import { buildToolMetadata, ToolSchema } from '@/lib/toolPage';
import RecordVisit from '@/components/shared/RecordVisit';

export const metadata: Metadata = buildToolMetadata('jwt-decoder');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolSchema id="jwt-decoder" />
      <RecordVisit id="jwt-decoder" />
      {children}
    </>
  );
}
