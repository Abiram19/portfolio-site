export default function Loading() {
  return (
    <div className="relative bg-[#0d0d0d] min-h-screen">
      {/* Navbar skeleton */}
      <div
        className="fixed top-0 left-0 right-0 z-50 h-20"
        style={{
          background: "rgba(5,8,18,0.85)",
          backdropFilter: "blur(28px)",
          borderBottom: "1px solid rgba(255,255,255,0.07)",
        }}
      />

      <div className="page-container pt-40 pb-24">
        {/* Header skeleton */}
        <div className="space-y-4 mb-12">
          <div className="h-6 w-28 rounded-full bg-white/5 animate-pulse" />
          <div className="h-16 w-3/4 rounded-xl bg-white/[0.06] animate-pulse" />
          <div className="h-5 w-40 rounded bg-white/[0.04] animate-pulse" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Image skeleton */}
          <div className="lg:col-span-2">
            <div className="w-full aspect-[4/3] rounded-2xl bg-white/[0.03] animate-pulse" />
          </div>
          {/* Side column skeleton */}
          <div className="space-y-5">
            <div className="h-36 rounded-2xl bg-white/[0.03] animate-pulse" />
            <div className="h-48 rounded-2xl bg-white/[0.03] animate-pulse" />
            <div className="h-24 rounded-2xl bg-white/[0.03] animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
