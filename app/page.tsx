import { Suspense } from 'react';
import SiteSchema from '@/components/shared/SiteSchema';
import HomeContent from '@/components/HomeContent';

/**
 * Server shell around the interactive grid.
 *
 * HomeContent reads ?category= with useSearchParams, which forces the
 * whole route to render on demand unless a Suspense boundary sits above
 * it. Splitting it out lets the page prerender and be served from the
 * CDN, with the client half hydrating over the top.
 */
export default function Home() {
  return (
    <>
      <SiteSchema />
      <Suspense>
        <HomeContent />
      </Suspense>
    </>
  );
}
