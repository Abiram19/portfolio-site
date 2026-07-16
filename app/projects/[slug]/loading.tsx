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

      {/* Hero skeleton */}
      <div className="min-h-[90vh] relative flex items-end pb-16 pt-32">
        <div
          className="absolute inset-0 animate-pulse"
          style={{ background: "linear-gradient(180deg, rgba(255,255,255,0.02) 0%, rgba(13,13,13,0) 100%)" }}
        />
        <div className="page-container w-full space-y-6">
          {/* Category pill */}
          <div className="h-6 w-32 rounded-full bg-white/5 animate-pulse" />
          {/* Title */}
          <div className="space-y-3">
            <div className="h-14 w-3/4 rounded-xl bg-white/[0.06] animate-pulse" />
            <div className="h-14 w-1/2 rounded-xl bg-white/[0.04] animate-pulse" />
          </div>
          {/* Tech pills */}
          <div className="flex gap-2 flex-wrap">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-8 w-20 rounded-lg bg-white/[0.04] animate-pulse" />
            ))}
          </div>
          {/* Buttons */}
          <div className="flex gap-3">
            <div className="h-11 w-40 rounded-full bg-white/[0.04] animate-pulse" />
            <div className="h-11 w-32 rounded-full bg-white/[0.04] animate-pulse" />
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="page-container py-24 space-y-8">
        <div className="h-4 w-24 rounded bg-white/5 animate-pulse" />
        <div className="h-10 w-64 rounded-xl bg-white/[0.04] animate-pulse" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-52 rounded-2xl bg-white/[0.03] animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
