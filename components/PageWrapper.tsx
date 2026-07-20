"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const LoadingScreen = dynamic(() => import("./LoadingScreen"), { ssr: false });

export default function PageWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loaded, setLoaded] = useState(false);

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[10000] focus:px-4 focus:py-2.5 focus:bg-[#a8ff78] focus:text-[#0d0d0d] focus:font-bold focus:rounded-lg focus:shadow-xl transition-none"
      >
        Skip to main content
      </a>
      <noscript>
        <style>{`.js-loading-wrapper { opacity: 1 !important; transition: none !important; }`}</style>
      </noscript>
      <LoadingScreen onComplete={() => setLoaded(true)} />
      {/* overflow-x:hidden on this inner wrapper (not html/body) safely clips horizontal
       * overflow on iOS Safari without breaking position:sticky on descendants. */}
      <div
        className="js-loading-wrapper"
        style={{
          opacity: loaded ? 1 : 0,
          transition: loaded ? "opacity 0.6s ease 0.1s" : "none",
          overflowX: "hidden",
          width: "100%",
        }}
      >
        {children}
      </div>
    </>
  );
}
