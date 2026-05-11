// iOS SF-inspired icons for Aja Field
const IOS_ICONS = {
  home: (p) => <path d="M3 10l9-7 9 7v10a1 1 0 01-1 1h-5v-7h-6v7H4a1 1 0 01-1-1V10z" {...p}/>,
  list: (p) => <g {...p}><rect x="3" y="5" width="18" height="2.4" rx="1.2"/><rect x="3" y="10.8" width="18" height="2.4" rx="1.2"/><rect x="3" y="16.6" width="18" height="2.4" rx="1.2"/></g>,
  calendar: (p) => <g {...p} fill="none" strokeWidth="1.8" strokeLinecap="round"><rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/></g>,
  check: (p) => <path d="M5 12l4 4 10-10" {...p} fill="none" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round"/>,
  wrench: (p) => <path d="M20 4a5.5 5.5 0 01-6.8 7.5L6 18.7 5.3 18l7.2-7.2A5.5 5.5 0 0120 4z" {...p} fill="none" strokeWidth="1.8" strokeLinejoin="round"/>,
  chat: (p) => <path d="M4 5h16a2 2 0 012 2v9a2 2 0 01-2 2h-9l-5 4v-4H4a2 2 0 01-2-2V7a2 2 0 012-2z" {...p} fill="none" strokeWidth="1.8" strokeLinejoin="round"/>,
  gear: (p) => <g {...p} fill="none" strokeWidth="1.8"><circle cx="12" cy="12" r="3"/><path d="M12 2v3m0 14v3M4.2 4.2l2.2 2.2m11.2 11.2l2.2 2.2M2 12h3m14 0h3M4.2 19.8l2.2-2.2m11.2-11.2l2.2-2.2"/></g>,
  bell: (p) => <path d="M6 8a6 6 0 1112 0v5l2 3H4l2-3V8zm3 10a3 3 0 006 0" {...p} fill="none" strokeWidth="1.8" strokeLinejoin="round"/>,
  chevR: (p) => <path d="M9 6l6 6-6 6" {...p} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
  chevD: (p) => <path d="M6 9l6 6 6-6" {...p} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
  plus: (p) => <path d="M12 5v14M5 12h14" {...p} fill="none" strokeWidth="2.2" strokeLinecap="round"/>,
  arrIn: (p) => <path d="M4 12h12m0 0l-4-4m4 4l-4 4M20 4v16" {...p} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
  arrOut: (p) => <path d="M20 12H8m0 0l4-4m-4 4l4 4M4 4v16" {...p} fill="none" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>,
  camera: (p) => <g {...p} fill="none" strokeWidth="1.8"><path d="M4 7h3l2-2h6l2 2h3v12H4V7z"/><circle cx="12" cy="13" r="3.5"/></g>,
  keys: (p) => <g {...p} fill="none" strokeWidth="1.8"><circle cx="7" cy="15" r="3.5"/><path d="M10 13l9-9m-3 3l3 3m-6 0l3 3"/></g>,
  clock: (p) => <g {...p} fill="none" strokeWidth="1.8"><circle cx="12" cy="12" r="8"/><path d="M12 7v5l3 3" strokeLinecap="round"/></g>,
  pin: (p) => <path d="M12 2a7 7 0 017 7c0 5.5-7 13-7 13S5 14.5 5 9a7 7 0 017-7zm0 5a2 2 0 100 4 2 2 0 000-4z" {...p}/>,
  search: (p) => <g {...p} fill="none" strokeWidth="2"><circle cx="11" cy="11" r="7"/><path d="M16 16l4 4" strokeLinecap="round"/></g>,
  filter: (p) => <path d="M3 5h18l-7 8v6l-4 2v-8L3 5z" {...p} fill="none" strokeWidth="1.8" strokeLinejoin="round"/>,
  user: (p) => <g {...p} fill="none" strokeWidth="1.8"><circle cx="12" cy="8" r="4"/><path d="M4 21c1.5-4.5 5-6 8-6s6.5 1.5 8 6"/></g>,
  doc: (p) => <path d="M6 3h8l4 4v14H6V3z M14 3v4h4" {...p} fill="none" strokeWidth="1.8" strokeLinejoin="round"/>,
  star: (p) => <path d="M12 3l2.8 6 6.2.6-4.6 4.2 1.3 6L12 16.8 6.3 19.8l1.3-6L3 9.6 9.2 9 12 3z" {...p}/>,
  moon: (p) => <path d="M20 14a8 8 0 01-10-10 8 8 0 1010 10z" {...p}/>,
  sun: (p) => <g {...p} fill="none" strokeWidth="1.8" strokeLinecap="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4 12H2m20 0h-2M5 5l1.5 1.5M19 19l-1.5-1.5M5 19l1.5-1.5M19 5l-1.5 1.5"/></g>,
  qr: (p) => <g {...p}><rect x="3" y="3" width="7" height="7" rx="1" fill="none" strokeWidth="1.8"/><rect x="14" y="3" width="7" height="7" rx="1" fill="none" strokeWidth="1.8"/><rect x="3" y="14" width="7" height="7" rx="1" fill="none" strokeWidth="1.8"/><rect x="15" y="15" width="2" height="2"/><rect x="18" y="15" width="2" height="2"/><rect x="15" y="18" width="2" height="2"/><rect x="18" y="18" width="2" height="2"/></g>,
  faceid: (p) => <g {...p} fill="none" strokeWidth="1.8" strokeLinecap="round"><path d="M3 7V5a2 2 0 012-2h2M17 3h2a2 2 0 012 2v2M21 17v2a2 2 0 01-2 2h-2M7 21H5a2 2 0 01-2-2v-2"/><path d="M9 10v1M15 10v1M12 10v4l-1 1M9 15s1 1 3 1 3-1 3-1"/></g>,
  map: (p) => <path d="M9 4L3 6v15l6-2 6 2 6-2V4l-6 2-6-2z M9 4v15M15 6v15" {...p} fill="none" strokeWidth="1.8" strokeLinejoin="round"/>,
};
const IIco = ({ n, s=24, c='#000', sw, ...rest }) => (
  <svg width={s} height={s} viewBox="0 0 24 24" {...rest}>
    {IOS_ICONS[n]?.({ fill: c, stroke: c })}
  </svg>
);
window.IIco = IIco;
