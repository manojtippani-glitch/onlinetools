import type { Metadata } from 'next';
import { buildToolMetadata, ToolSchema } from '@/lib/toolPage';

export const metadata: Metadata = buildToolMetadata('code-beautifier');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolSchema id="code-beautifier" />
      {children}
    </>
  );
}
