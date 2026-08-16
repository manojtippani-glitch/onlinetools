import type { Metadata } from 'next';
import { buildToolMetadata, ToolSchema } from '@/lib/toolPage';

export const metadata: Metadata = buildToolMetadata('password-generator');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolSchema id="password-generator" />
      {children}
    </>
  );
}
