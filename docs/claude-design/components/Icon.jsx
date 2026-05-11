// Icons — thin-line custom set (outline, currentColor)
// Usage: <Icon name="calendar" size={16} />
const Icon = ({ name, size = 16, className = '', style = {} }) => {
  const paths = ICONS[name];
  if (!paths) return null;
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"
      className={className} style={style} aria-hidden>
      {paths}
    </svg>
  );
};

const ICONS = {
  home:       <><path d="M3 11l9-7 9 7"/><path d="M5 10v10h14V10"/></>,
  calendar:   <><rect x="3" y="5" width="18" height="16" rx="2"/><path d="M3 10h18M8 3v4M16 3v4"/></>,
  list:       <><path d="M8 6h13M8 12h13M8 18h13M3 6h.01M3 12h.01M3 18h.01"/></>,
  building:   <><rect x="4" y="3" width="16" height="18" rx="1.5"/><path d="M9 8h.01M9 12h.01M9 16h.01M14 8h.01M14 12h.01M14 16h.01"/></>,
  users:      <><circle cx="9" cy="8" r="3.2"/><path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6"/><path d="M16 4.5a3 3 0 010 5.5"/><path d="M21 20c0-2.8-1.9-5-4.5-5.7"/></>,
  door:       <><path d="M6 3h12v18H6z"/><circle cx="15" cy="12" r=".8"/></>,
  msg:        <><path d="M4 5h16v11H8l-4 4V5z"/></>,
  wrench:     <><path d="M14.7 6.3a4 4 0 01-5 5L4 17l3 3 5.7-5.7a4 4 0 015-5l-2-2 1.3-1.3-2-2-1.3 1.3z"/></>,
  file:       <><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v4h4"/></>,
  cog:        <><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.3 1.8l.1.1a2 2 0 01-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.8-.3 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1.1-1.5 1.7 1.7 0 00-1.8.3l-.1.1A2 2 0 014.2 17l.1-.1a1.7 1.7 0 00.3-1.8 1.7 1.7 0 00-1.5-1H3a2 2 0 010-4h.1a1.7 1.7 0 001.5-1.1 1.7 1.7 0 00-.3-1.8l-.1-.1A2 2 0 017 4.2l.1.1a1.7 1.7 0 001.8.3h.1a1.7 1.7 0 001-1.5V3a2 2 0 014 0v.1a1.7 1.7 0 001 1.5 1.7 1.7 0 001.8-.3l.1-.1A2 2 0 0119.8 7l-.1.1a1.7 1.7 0 00-.3 1.8v.1a1.7 1.7 0 001.5 1H21a2 2 0 010 4h-.1a1.7 1.7 0 00-1.5 1z"/></>,
  search:     <><circle cx="11" cy="11" r="7"/><path d="M20 20l-3.5-3.5"/></>,
  bell:       <><path d="M6 8a6 6 0 1112 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10 21a2 2 0 004 0"/></>,
  plus:       <><path d="M12 5v14M5 12h14"/></>,
  chevronR:   <><path d="M9 6l6 6-6 6"/></>,
  chevronL:   <><path d="M15 6l-6 6 6 6"/></>,
  chevronD:   <><path d="M6 9l6 6 6-6"/></>,
  check:      <><path d="M5 12l5 5 9-11"/></>,
  x:          <><path d="M6 6l12 12M18 6L6 18"/></>,
  arrow_r:    <><path d="M5 12h14M13 6l6 6-6 6"/></>,
  arrow_l:    <><path d="M19 12H5M11 18l-6-6 6-6"/></>,
  dots:       <><circle cx="6" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="18" cy="12" r="1.5"/></>,
  sparkle:    <><path d="M12 3l1.8 5.4L19 10l-5.2 1.6L12 17l-1.8-5.4L5 10l5.2-1.6z"/></>,
  moon:       <><path d="M20 14.5A8 8 0 019.5 4 8 8 0 1020 14.5z"/></>,
  sun:        <><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></>,
  globe:      <><circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.5 3 14 0 18M12 3c-3 3.5-3 14 0 18"/></>,
  key:        <><circle cx="8" cy="14" r="4"/><path d="M11 11l10-10M17 5l3 3M15 7l3 3"/></>,
  broom:      <><path d="M14 3l7 7-5 5-7-7zM3 21l6-6"/><path d="M9 17l-3 3 4-1"/></>,
  tool:       <><path d="M14.7 6.3a4 4 0 01-5 5L4 17l3 3 5.7-5.7a4 4 0 015-5"/></>,
  filter:     <><path d="M4 5h16l-6 8v6l-4-2v-4z"/></>,
  download:   <><path d="M12 3v12M6 11l6 6 6-6M4 21h16"/></>,
  eye:        <><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7S2 12 2 12z"/><circle cx="12" cy="12" r="3"/></>,
  phone:      <><path d="M5 4h4l2 5-3 2a11 11 0 005 5l2-3 5 2v4a2 2 0 01-2 2A16 16 0 013 6a2 2 0 012-2z"/></>,
  mail:       <><rect x="3" y="5" width="18" height="14" rx="2"/><path d="M3 7l9 6 9-6"/></>,
  clock:      <><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></>,
  pin:        <><path d="M12 21s7-7 7-12a7 7 0 10-14 0c0 5 7 12 7 12z"/><circle cx="12" cy="9" r="2.5"/></>,
  tag:        <><path d="M3 12l9-9h7v7l-9 9z"/><circle cx="15" cy="9" r="1.2"/></>,
  command:    <><path d="M6 6h12v12H6z" opacity=".1"/><path d="M9 4a2 2 0 100 4h10a2 2 0 110 4H9a2 2 0 100 4h10a2 2 0 110 4"/></>,
  logout:     <><path d="M15 3h4a2 2 0 012 2v14a2 2 0 01-2 2h-4M10 17l-5-5 5-5M5 12h12"/></>,
  check_sq:   <><rect x="3" y="3" width="18" height="18" rx="3"/><path d="M8 12l3 3 5-6"/></>,
  alert:      <><path d="M12 3l10 18H2z"/><path d="M12 10v5M12 18v.01"/></>,
  upload:     <><path d="M12 21V9M6 13l6-6 6 6M4 21h16"/></>,
  external:   <><path d="M14 4h6v6M20 4l-9 9M10 5H5a1 1 0 00-1 1v13a1 1 0 001 1h13a1 1 0 001-1v-5"/></>,
  copy:       <><rect x="8" y="8" width="12" height="12" rx="2"/><path d="M4 16V5a1 1 0 011-1h11"/></>,
};

window.Icon = Icon;
