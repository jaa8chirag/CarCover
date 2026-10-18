'use client';

import Script from 'next/script';
import { usePathname } from 'next/navigation';

/**
 * Microsoft Clarity. Loads only when NEXT_PUBLIC_CLARITY_ID is set, and never on the admin panel,
 * so customer names and addresses are not recorded.
 */
export default function Analytics() {
  const pathname = usePathname();
  const id = process.env.NEXT_PUBLIC_CLARITY_ID;
  if (!id || pathname.startsWith('/admin')) return null;
  return (
    <Script id="ms-clarity" strategy="afterInteractive">
      {`(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window,document,"clarity","script",${JSON.stringify(id)});`}
    </Script>
  );
}
