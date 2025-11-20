export function IconSingle() {
  return (
    <svg width='48' height='28' viewBox='0 0 48 28' xmlns='http://www.w3.org/2000/svg'>
      <rect x='2' y='2' width='44' height='24' stroke='currentColor' strokeWidth='2.5' fill='none' rx='1' />
    </svg>
  );
}

export function IconPIP() {
  return (
    <svg width='48' height='28' viewBox='0 0 48 28' xmlns='http://www.w3.org/2000/svg'>
      <rect x='2' y='2' width='44' height='24' stroke='currentColor' strokeWidth='2.5' fill='none' rx='1' />
      {/* small inset box lower-right (single rectangle) */}
      <rect x='29' y='14' width='14' height='9' stroke='currentColor' strokeWidth='2' fill='none' />
    </svg>
  );
}

export function IconPBP() {
  return (
    <svg width='48' height='28' viewBox='0 0 48 28' xmlns='http://www.w3.org/2000/svg'>
      <rect x='2' y='2' width='44' height='24' stroke='currentColor' strokeWidth='2.5' fill='none' rx='1' />
      {/* center vertical divider - two equal panels */}
      <line x1='24' y1='2' x2='24' y2='26' stroke='currentColor' strokeWidth='2' />
    </svg>
  );
}

export function IconPBPAlt() {
  return (
    <svg width='48' height='28' viewBox='0 0 48 28' xmlns='http://www.w3.org/2000/svg'>
      <rect x='2' y='2' width='44' height='24' stroke='currentColor' strokeWidth='2.5' fill='none' rx='1' />
      {/* vertical divider - left large, right narrow */}
      <line x1='33' y1='2' x2='33' y2='26' stroke='currentColor' strokeWidth='2' />
    </svg>
  );
}

export function IconTripleA() {
  return (
    <svg width='48' height='28' viewBox='0 0 48 28' xmlns='http://www.w3.org/2000/svg'>
      <rect x='2' y='2' width='44' height='24' stroke='currentColor' strokeWidth='2.5' fill='none' rx='1' />
      {/* left large, right split into 2 stacked */}
      <line x1='26' y1='2' x2='26' y2='26' stroke='currentColor' strokeWidth='2' />
      <line x1='26' y1='14' x2='46' y2='14' stroke='currentColor' strokeWidth='2' />
    </svg>
  );
}

export function IconTripleB() {
  return (
    <svg width='48' height='28' viewBox='0 0 48 28' xmlns='http://www.w3.org/2000/svg'>
      <rect x='2' y='2' width='44' height='24' stroke='currentColor' strokeWidth='2.5' fill='none' rx='1' />
      {/* right large, left split into 2 stacked */}
      {/* vertical divider moved closer to right so left stacked panels are smaller */}
      <line x1='34' y1='2' x2='34' y2='26' stroke='currentColor' strokeWidth='2' />
      {/* split the right area into two stacked rectangles */}
      <line x1='34' y1='14' x2='46' y2='14' stroke='currentColor' strokeWidth='2' />
    </svg>
  );
}

export function IconQuadA() {
  return (
    <svg width='48' height='28' viewBox='0 0 48 28' xmlns='http://www.w3.org/2000/svg'>
      <rect x='2' y='2' width='44' height='24' stroke='currentColor' strokeWidth='2.5' fill='none' rx='1' />
      {/* 2x2 grid - equal quadrants */}
      <line x1='24' y1='2' x2='24' y2='26' stroke='currentColor' strokeWidth='2' />
      <line x1='2' y1='14' x2='46' y2='14' stroke='currentColor' strokeWidth='2' />
    </svg>
  );
}

export function IconQuadB() {
  return (
    <svg width='48' height='28' viewBox='0 0 48 28' xmlns='http://www.w3.org/2000/svg'>
      <rect x='2' y='2' width='44' height='24' stroke='currentColor' strokeWidth='2.5' fill='none' rx='1' />
      {/* left large, right column split into 3 stacked */}
      {/* vertical moved right to close the two small right-side rectangles */}
      <line x1='35' y1='2' x2='35' y2='26' stroke='currentColor' strokeWidth='2' />
      <line x1='35' y1='10' x2='46' y2='10' stroke='currentColor' strokeWidth='2' />
      <line x1='35' y1='18' x2='46' y2='18' stroke='currentColor' strokeWidth='2' />
    </svg>
  );
}

export function XboxIcon({ width = 80, height = 50 }: { width?: number; height?: number }) {
  return (
    <svg width={width} height={height} viewBox='0 0 80 50' xmlns='http://www.w3.org/2000/svg'>
      <defs>
        <linearGradient id='xbGrad' x1='0' x2='1'>
          <stop offset='0%' stopColor='#16A216' />
          <stop offset='100%' stopColor='#0E6F0E' />
        </linearGradient>
      </defs>
      <rect x='2' y='2' width='76' height='46' rx='6' fill='url(#xbGrad)' />
      {/* stylized controller silhouette */}
      <g transform='translate(40,25)'>
        <path
          d='M-22,0 C-18,-10 -8,-12 0,-8 C8,-12 18,-10 22,0 C18,8 10,10 0,6 C-10,10 -18,8 -22,0 Z'
          fill='rgba(255,255,255,0.95)'
          opacity='0.12'
        />
        <circle cx='-6' cy='-2' r='3.6' fill='#fff' />
        <circle cx='8' cy='-4' r='2.8' fill='#fff' />
        {/* central abstract mark */}
        <path d='M-8,6 C-4,2 4,2 8,6' stroke='#fff' strokeWidth='2' strokeLinecap='round' fill='none' opacity='0.9' />
      </g>
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
  XboxIcon,
};
