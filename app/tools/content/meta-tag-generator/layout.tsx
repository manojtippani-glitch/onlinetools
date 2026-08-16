import type { Metadata } from 'next';
import { buildToolMetadata, ToolSchema } from '@/lib/toolPage';

export const metadata: Metadata = buildToolMetadata('meta-tag-generator');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolSchema id="meta-tag-generator" />
      {children}
    </>
  );
}
