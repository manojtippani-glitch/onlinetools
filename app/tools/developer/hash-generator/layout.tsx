import type { Metadata } from 'next';
import { buildToolMetadata, ToolSchema } from '@/lib/toolPage';
import RecordVisit from '@/components/shared/RecordVisit';

export const metadata: Metadata = buildToolMetadata('hash-generator');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolSchema id="hash-generator" />
      <RecordVisit id="hash-generator" />
      {children}
    </>
  );
}
