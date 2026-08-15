'use client';

import { useEffect } from 'react';

interface AdContainerProps {
  slot?: string;
  format?: 'auto' | 'rectangle' | 'vertical' | 'horizontal';
}

export default function AdContainer({ slot = '0000000000', format = 'auto' }: AdContainerProps) {
  useEffect(() => {
    const hasClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID &&
                        process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID !== 'ca-pub-0000000000000000';

    if (hasClientId && typeof window !== 'undefined' && (window as any).adsbygoogle) {
      try {
        ((window as any).adsbygoogle = (window as any).adsbygoogle || []).push({});
      } catch (e) {
        // Ignore AdSense errors
      }
    }
  }, [slot]);

  const hasClientId = process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID &&
                      process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID !== 'ca-pub-0000000000000000';

  if (!hasClientId) {
    return null;
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-800 rounded-lg p-4 min-h-[250px] flex items-center justify-center">
      <ins
        className="adsbygoogle"
        style={{ display: 'block' }}
        data-ad-client={process.env.NEXT_PUBLIC_ADSENSE_CLIENT_ID}
        data-ad-slot={slot}
        data-ad-format={format}
        data-full-width-responsive="true"
      />
    </div>
  );
}
