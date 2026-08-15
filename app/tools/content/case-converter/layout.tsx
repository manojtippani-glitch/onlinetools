import { Metadata } from 'next';
import { getToolMetadata } from '@/lib/toolsMetadata';

export const metadata: Metadata = (() => {
  const toolMeta = getToolMetadata('case-converter');
  return {
    title: toolMeta.title,
    description: toolMeta.description,
    keywords: toolMeta.keywords,
    openGraph: { title: toolMeta.title, description: toolMeta.description, type: 'website' },
    twitter: { card: 'summary_large_image', title: toolMeta.title, description: toolMeta.description },
  };
})();

export default function Layout({ children }: { children: React.ReactNode }) {
  return children;
}
