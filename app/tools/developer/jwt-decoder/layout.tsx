import type { Metadata } from 'next';
import { Suspense } from 'react';
import { buildToolMetadata, ToolSchema } from '@/lib/toolPage';
import RecordVisit from '@/components/shared/RecordVisit';

export const metadata: Metadata = buildToolMetadata('jwt-decoder');

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <ToolSchema id="jwt-decoder" />
      {/* The tool reads ?input= via useSearchParams, which needs a Suspense
          boundary above it. Without one the whole route opts out of static
          rendering and every visit costs a server round trip. */}
      <Suspense>
        <RecordVisit id="jwt-decoder" />
        {children}
      </Suspense>
    </>
  );
}
