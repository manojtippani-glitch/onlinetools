import type { Metadata } from 'next';
import { buildToolMetadata, ToolSchema } from '@/lib/toolPage';
import RecordVisit from '@/components/shared/RecordVisit';

export const metadata: Metadata = buildToolMetadata('unit-converter');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolSchema id="unit-converter" />
      <RecordVisit id="unit-converter" />
      {children}
    </>
  );
}
