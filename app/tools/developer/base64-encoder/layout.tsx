import type { Metadata } from 'next';
import { buildToolMetadata, ToolSchema } from '@/lib/toolPage';
import RecordVisit from '@/components/shared/RecordVisit';

export const metadata: Metadata = buildToolMetadata('base64-encoder');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolSchema id="base64-encoder" />
      <RecordVisit id="base64-encoder" />
      {children}
    </>
  );
}
