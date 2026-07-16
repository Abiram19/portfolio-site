export default function Footer() {
  return (
    <footer role="contentinfo" aria-label="Site footer" className="page-container border-t border-white/5 py-12 mt-24">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-white/20 text-sm">
          © 2026 Abiram Pathmanathan. All rights reserved.
        </p>
        <p className="text-white/20 text-sm">
          Built with <span className="text-[#a8ff78]/60" aria-hidden="true">♥</span> using Next.js,
          TypeScript & Framer Motion.
        </p>
      </div>
    </footer>
  );
}
