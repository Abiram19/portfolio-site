// ─── Contact & Navigation Data ────────────────────────────────────────────────
// .tsx extension required because channel icons use JSX (SVG elements).

import React from "react";

// ── Navigation links (also used in Navbar) ────────────────────────────────────
export interface NavLink {
  label: string;
  href: string;
  id: string;
}

export const navLinks: NavLink[] = [
  { label: "About", href: "#about", id: "about" },
  { label: "Projects", href: "#projects", id: "projects" },
  { label: "Research", href: "#research", id: "research" },
  { label: "Journey", href: "#timeline", id: "timeline" },
  { label: "Contact", href: "#contact", id: "contact" },
];

// ── Contact channels ──────────────────────────────────────────────────────────
export interface ContactChannel {
  label: string;
  value: string;
  href: string;
  color: string;
  isExternal?: boolean;
  icon: React.ReactNode;
}

export const channels: ContactChannel[] = [
  {
    label: "Phone",
    value: "+94 77 335 1906",
    href: "tel:+94773351906",
    color: "#7CFF6B",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <path
          d="M6.5 2.5C6.5 2.5 4 2.5 3 5C2 7.5 3 10.5 5.5 13C8 15.5 11 16.5 13.5 15.5C16 14.5 16 12 16 12L13.5 9.5L11 12C10 11 9 10 8 9L10.5 6.5L8 4L6.5 2.5Z"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Email",
    value: "abiram0619@gmail.com",
    href: "mailto:abiram0619@gmail.com",
    color: "#00E5FF",
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="5"
          width="18"
          height="14"
          rx="2"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M3 7L12 13L21 7"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "LinkedIn",
    value: "abiram-pathmanathan",
    href: "https://linkedin.com/in/abiram-pathmanathan-a44ba5268",
    color: "#7C3AED",
    isExternal: true,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <rect
          x="3"
          y="3"
          width="18"
          height="18"
          rx="3"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path
          d="M8 10V17M8 7V7.01"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <path
          d="M12 17V13C12 11.5 13 10.5 14.5 10.5C16 10.5 16 12 16 13V17M12 10V17"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "GitHub",
    value: "github.com/Abiram19",
    href: "https://github.com/Abiram19",
    color: "#f59e0b",
    isExternal: true,
    icon: (
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.168 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.03-2.683-.104-.253-.448-1.27.098-2.647 0 0 .84-.268 2.75 1.026A9.578 9.578 0 0 1 12 6.836a9.59 9.59 0 0 1 2.504.337c1.909-1.294 2.747-1.026 2.747-1.026.548 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.164 22 16.418 22 12c0-5.523-4.477-10-10-10z"
          fill="currentColor"
        />
      </svg>
    ),
  },
];
