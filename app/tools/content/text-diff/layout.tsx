import type { Metadata } from 'next';
import { buildToolMetadata, ToolSchema } from '@/lib/toolPage';
import RecordVisit from '@/components/shared/RecordVisit';

export const metadata: Metadata = buildToolMetadata('text-diff');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolSchema id="text-diff" />
      <RecordVisit id="text-diff" />
      {children}
    </>
  );
}
