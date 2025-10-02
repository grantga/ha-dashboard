
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
      {/* small inset box lower-right with cross divider */}
      <rect x="29" y="14" width="14" height="9" stroke="currentColor" strokeWidth="2" fill="none" />
      <line x1="29" y1="18.5" x2="43" y2="18.5" stroke="currentColor" strokeWidth="2" />
      <line x1="36" y1="14" x2="36" y2="23" stroke="currentColor" strokeWidth="2" />
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
      <line x1="22" y1="4" x2="22" y2="24" stroke="currentColor" strokeWidth="2" />
      <line x1="2" y1="14" x2="22" y2="14" stroke="currentColor" strokeWidth="2" />
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
      <line x1="24" y1="4" x2="24" y2="24" stroke="currentColor" strokeWidth="2" />
      <line x1="35" y1="10" x2="46" y2="10" stroke="currentColor" strokeWidth="2" />
      <line x1="35" y1="18" x2="46" y2="18" stroke="currentColor" strokeWidth="2" />
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
};
