import { cn } from "@/lib/utils";

type LogoMarkProps = {
  className?: string;
};

export function LogoMark({ className }: LogoMarkProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn("h-10 w-10", className)}
      viewBox="0 0 128 128"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient id="logo-ring" x1="22" x2="89" y1="104" y2="18" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#ef4444" />
          <stop offset="0.52" stopColor="#ec4899" />
          <stop offset="1" stopColor="#7c3aed" />
        </linearGradient>
        <linearGradient id="logo-stem" x1="86" x2="112" y1="18" y2="74" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#8b5cf6" />
          <stop offset="0.5" stopColor="#4f46e5" />
          <stop offset="1" stopColor="#111827" />
        </linearGradient>
        <linearGradient id="logo-tail" x1="73" x2="56" y1="76" y2="126" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#f97316" />
          <stop offset="1" stopColor="#fcd34d" />
        </linearGradient>
      </defs>

      <path
        d="M64 20c-23.2 0-42 18.8-42 42s18.8 42 42 42c12.4 0 23.8-5.4 31.7-14.2"
        fill="none"
        stroke="url(#logo-ring)"
        strokeLinecap="round"
        strokeWidth="18"
      />

      <path
        d="M86 14L74 48"
        fill="none"
        stroke="url(#logo-stem)"
        strokeLinecap="round"
        strokeWidth="18"
      />

      <path
        d="M80 54c0-8.3 6.7-15 15-15s15 6.7 15 15-6.7 15-15 15H79"
        fill="none"
        stroke="url(#logo-stem)"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="18"
      />

      <path
        d="M72 68c16.6 0 30 13.4 30 30"
        fill="none"
        stroke="#f97316"
        strokeLinecap="round"
        strokeWidth="18"
      />

      <path
        d="M72 70L58 118"
        fill="none"
        stroke="url(#logo-tail)"
        strokeLinecap="round"
        strokeWidth="18"
      />
    </svg>
  );
}
