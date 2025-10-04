
export function IconSingle() {
  return (
    <svg width="48" height="28" viewBox="0 0 48 28" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="2" y="2" width="44" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" rx="1" />
    </svg>
  );
}

export function IconPIP() {
  return (
    <svg width="48" height="28" viewBox="0 0 48 28" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="2" y="2" width="44" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" rx="1" />
      {/* small inset box lower-right (single rectangle) */}
      <rect x="29" y="14" width="14" height="9" stroke="currentColor" strokeWidth="2" fill="none" />
    </svg>
  );
}

export function IconPBP() {
  return (
    <svg width="48" height="28" viewBox="0 0 48 28" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="2" y="2" width="44" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" rx="1" />
      {/* center vertical divider - two equal panels */}
      <line x1="24" y1="4" x2="24" y2="24" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function IconPBPAlt() {
  return (
    <svg width="48" height="28" viewBox="0 0 48 28" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="2" y="2" width="44" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" rx="1" />
      {/* vertical divider - left large, right narrow */}
      <line x1="33" y1="4" x2="33" y2="24" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function IconTripleA() {
  return (
    <svg width="48" height="28" viewBox="0 0 48 28" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="2" y="2" width="44" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" rx="1" />
      {/* left large, right split into 2 stacked */}
      <line x1="26" y1="4" x2="26" y2="24" stroke="currentColor" strokeWidth="2" />
      <line x1="26" y1="14" x2="46" y2="14" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function IconTripleB() {
  return (
    <svg width="48" height="28" viewBox="0 0 48 28" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="2" y="2" width="44" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" rx="1" />
      {/* right large, left split into 2 stacked */}
      {/* vertical divider moved closer to right so left stacked panels are smaller */}
      <line x1="34" y1="4" x2="34" y2="24" stroke="currentColor" strokeWidth="2" />
      {/* split the right area into two stacked rectangles */}
      <line x1="34" y1="14" x2="46" y2="14" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function IconQuadA() {
  return (
    <svg width="48" height="28" viewBox="0 0 48 28" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="2" y="2" width="44" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" rx="1" />
      {/* 2x2 grid - equal quadrants */}
      <line x1="24" y1="4" x2="24" y2="24" stroke="currentColor" strokeWidth="2" />
      <line x1="2" y1="14" x2="46" y2="14" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function IconQuadB() {
  return (
    <svg width="48" height="28" viewBox="0 0 48 28" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="2" y="2" width="44" height="24" stroke="currentColor" strokeWidth="2.5" fill="none" rx="1" />
      {/* left large, right column split into 3 stacked */}
      {/* vertical moved right to close the two small right-side rectangles */}
      <line x1="35" y1="4" x2="35" y2="24" stroke="currentColor" strokeWidth="2" />
      <line x1="35" y1="10" x2="46" y2="10" stroke="currentColor" strokeWidth="2" />
      <line x1="35" y1="18" x2="46" y2="18" stroke="currentColor" strokeWidth="2" />
    </svg>
  );
}

export function TVIcon({ size = 36 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden>
      <rect x="2" y="4" width="20" height="12" rx="1" stroke="currentColor" fill="none" strokeWidth="1.5" />
      <path d="M8 20h8" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <path d="M12 16v4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" />
    </svg>
  );
}

export default {
  IconSingle,
  IconPIP,
  IconPBP,
  IconPBPAlt,
  IconTripleA,
  IconTripleB,
  IconQuadA,
  IconQuadB,
  TVIcon,
};
