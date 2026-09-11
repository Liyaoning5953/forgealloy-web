// ForgeAlloy wheel mark — inline SVG (spoked wheel). Inherits currentColor.
export default function Logo({ size = 34 }) {
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} className="logo-mark" aria-hidden="true">
      <circle cx="20" cy="20" r="17" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <circle cx="20" cy="20" r="6.5" fill="none" stroke="currentColor" strokeWidth="2.4" />
      <path d="M20 3V13.5M20 26.5V37M3 20H13.5M26.5 20H37M8.6 8.6L15.2 15.2M24.8 24.8L31.4 31.4M31.4 8.6L24.8 15.2M15.2 24.8L8.6 31.4" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}
