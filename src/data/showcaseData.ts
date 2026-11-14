import headphonesImg from '../assets/images/product_headphones_studio_1794670424054.jpg';
import lampImg from '../assets/images/product_desk_lamp_1794670424590.jpg';
import studioImg from '../assets/images/editorial_design_studio_1794670424667.jpg';
import keyboardImg from '../assets/images/carousel_mechanical_keyboard_1794670425933.jpg';
import avatarImg from '../assets/images/avatar_designer_portrait_1794670425760.jpg';

export type UseCaseId = 'saas' | 'ecommerce' | 'media' | 'admin';

export interface ComponentMeta {
  id: string;
  number: string;
  title: string;
  category: 'layout' | 'interactive';
  summary: string;
  bestFor: string;
  xrayExplanation: string;
}

export const STUDIO_MEDIA = {
  headphones: headphonesImg,
  lamp: lampImg,
  studio: studioImg,
  keyboard: keyboardImg,
  avatar: avatarImg,
};

export const USE_CASE_LABELS: Record<UseCaseId, string> = {
  saas: 'SaaS App',
  ecommerce: 'E-Commerce',
  media: 'Blog / Media',
  admin: 'Admin Dashboard',
};

export const COMPONENT_DIRECTORY: ComponentMeta[] = [
  {
    id: 'sticky-header',
    number: '01',
    title: 'Smart Sticky Header',
    category: 'layout',
    summary: 'Scroll-reactive top navigation that shrinks and blurs on scroll, hides on down-scroll, and reveals on up-scroll.',
    bestFor: 'SaaS marketing sites, editorial publications, documentation hubs',
    xrayExplanation: 'Viewport-pinned header shell observing scroll velocity and direction to maximize reading space.',
  },
  {
    id: 'navigation-suite',
    number: '02',
    title: 'Navigation Suite',
    category: 'layout',
    summary: 'Multi-layered wayfinding combining desktop mega menus, mobile slide-over drawers, and interactive breadcrumbs.',
    bestFor: 'Multi-product SaaS platforms, large retail catalogs, enterprise portals',
    xrayExplanation: 'Hierarchical routing layer balancing broad discovery (mega menu) with deep location context (breadcrumbs).',
  },
  {
    id: 'bento-hero',
    number: '03',
    title: 'Bento & Split Hero Section',
    category: 'layout',
    summary: 'Asymmetric above-the-fold composition pairing kinetic headlines and dual CTAs with a live interactive preview.',
    bestFor: 'Product launches, developer tools, high-conversion landing pages',
    xrayExplanation: 'Primary visual anchor splitting value proposition from hands-on product proof.',
  },
  {
    id: 'asymmetric-bento',
    number: '04',
    title: 'Main Content Area — Asymmetric Bento Grid',
    category: 'layout',
    summary: 'Modular grid architecture spanning variable columns and rows to spotlight hero metrics alongside supporting content.',
    bestFor: 'Feature showcases, editorial digests, executive analytics',
    xrayExplanation: 'CSS Grid structural matrix assigning visual hierarchy via explicit column and row spans.',
  },
  {
    id: 'collapsible-sidebar',
    number: '05',
    title: 'Collapsible Sidebar',
    category: 'layout',
    summary: 'Embedded workspace rail switching cleanly between expanded labels, compact icon-only mode, and filter panels.',
    bestFor: 'Admin dashboards, storefront catalog filtering, project workspaces',
    xrayExplanation: 'Persistent lateral navigation rail toggling between 240px full drawer and 68px compact rail.',
  },
  {
    id: 'modern-footer',
    number: '06',
    title: 'Multi-Column Modern Footer',
    category: 'layout',
    summary: 'Structured closing band featuring sitemap columns, validated newsletter signup with toast feedback, and system status.',
    bestFor: 'All production web applications, SaaS platforms, digital storefronts',
    xrayExplanation: 'Closing page anchor organizing secondary navigation, lead capture, and legal/status trust markers.',
  },
  {
    id: 'buttons-ctas',
    number: '07',
    title: 'Buttons & CTAs',
    category: 'interactive',
    summary: 'Tactile action triggers including magnetic cursor attraction, async loading spinners, and morphing success states.',
    bestFor: 'Checkout flows, form submissions, high-intent conversion triggers',
    xrayExplanation: 'Interactive action primitives providing immediate visual and state feedback under 200ms.',
  },
  {
    id: 'smart-cards',
    number: '08',
    title: 'Smart Cards',
    category: 'interactive',
    summary: 'Context-aware containers featuring 3D cursor-spotlight tilt, dynamic billing cadence pricing, and editorial bookmarks.',
    bestFor: 'E-Commerce catalogs, SaaS pricing tiers, publication feeds',
    xrayExplanation: 'Self-contained content surfaces combining pointer physics, state toggles, and direct actions.',
  },
  {
    id: 'modern-forms',
    number: '09',
    title: 'Modern Forms & Inputs',
    category: 'interactive',
    summary: 'Accessible form controls with floating labels, password strength analysis, searchable comboboxes, calendar pickers, and file dropzones.',
    bestFor: 'Onboarding flows, account settings, checkout & media uploaders',
    xrayExplanation: 'Validated data-entry controls pairing explicit field states with instant inline guidance.',
  },
  {
    id: 'command-palette',
    number: '10',
    title: 'Command Palette Search (Cmd+K)',
    category: 'interactive',
    summary: 'Keyboard-first command modal alongside an inline autocomplete search bar with live query highlighting.',
    bestFor: 'Power-user SaaS apps, developer consoles, documentation portals',
    xrayExplanation: 'Global shortcut-triggered action router supporting arrow-key traversal and instant filtering.',
  },
  {
    id: 'modals-drawers',
    number: '11',
    title: 'Modals, Drawers & Pop-ups',
    category: 'interactive',
    summary: 'Layered overlay surfaces including glassmorphic confirmation dialogs, slide-over cart drawers, and GDPR consent banners.',
    bestFor: 'Shopping bags, quick settings panels, destructive confirmations, privacy compliance',
    xrayExplanation: 'Portal-mounted focus-trapped overlays that preserve underlying page scroll and context.',
  },
  {
    id: 'carousels-sliders',
    number: '12',
    title: 'Carousels & Sliders',
    category: 'interactive',
    summary: 'Touch-draggable and keyboard-accessible media showcase with animated segment progress indicators.',
    bestFor: 'Hardware galleries, customer proof stories, onboarding walkthroughs',
    xrayExplanation: 'Horizontal viewport track synchronizing gesture physics with deterministic slide progress.',
  },
  {
    id: 'accordions-tabs',
    number: '13',
    title: 'Accordions & Animated Tabs',
    category: 'interactive',
    summary: 'Smooth height-interpolated FAQ disclosures paired with shared-layout sliding pill tab indicators.',
    bestFor: 'Pricing FAQs, product specifications, multi-view settings panels',
    xrayExplanation: 'Progressive disclosure controls minimizing vertical clutter via animated panel transitions.',
  },
  {
    id: 'feedback-microui',
    number: '14',
    title: 'Feedback & Micro-UI',
    category: 'interactive',
    summary: 'Swipe-dismissible stacked toasts, directional hover tooltips, semantic status badges, and live skeleton loading toggles.',
    bestFor: 'Real-time notifications, async data hydration, dense enterprise interfaces',
    xrayExplanation: 'Non-blocking status communication layer conveying system state without interrupting workflow.',
  },
  {
    id: 'data-tables',
    number: '15',
    title: 'Data Tables & Lists',
    category: 'interactive',
    summary: 'Sortable, searchable operational grid with tabular numerals, status filtering, and multi-row bulk selection.',
    bestFor: 'Admin consoles, order management, billing ledgers, CRM pipelines',
    xrayExplanation: 'High-density structured grid enforcing vertical numeric alignment and bulk row mutations.',
  },
  {
    id: 'pagination-infinite',
    number: '16',
    title: 'Pagination vs. Infinite Scroll',
    category: 'interactive',
    summary: 'Side-by-side interactive comparison between numbered deterministic pagination and progressive load-more feeds.',
    bestFor: 'Search results & catalogs (pagination) vs. activity streams & media feeds (infinite scroll)',
    xrayExplanation: 'List virtualization and chunking strategies balancing deep-link precision with continuous discovery.',
  },
];

export interface StoreProduct {
  id: string;
  name: string;
  category: string;
  price: number;
  finish: string;
  image: string;
}

export const STORE_PRODUCTS: StoreProduct[] = [
  {
    id: 'aetheris-m1',
    name: 'Aetheris M1 Reference Headphones',
    category: 'Studio Audio',
    price: 389,
    finish: 'Matte Obsidian',
    image: headphonesImg,
  },
  {
    id: 'atelier-l4',
    name: 'Atelier L4 CNC Task Lamp',
    category: 'Lighting',
    price: 265,
    finish: 'Anodized Graphite',
    image: lampImg,
  },
  {
    id: 'tactile-k75',
    name: 'Monolith K75 Rotary Keyboard',
    category: 'Input Hardware',
    price: 219,
    finish: 'Bead-Blasted Slate',
    image: keyboardImg,
  },
  {
    id: 'studio-desk-mat',
    name: 'Merino Felt Architectural Pad',
    category: 'Workspace',
    price: 78,
    finish: 'Charcoal Wool',
    image: studioImg,
  },
];

export interface DataRecord {
  id: string;
  name: string;
  secondary: string;
  category: string;
  amount: number;
  date: string;
  status: 'Active' | 'Pending' | 'Completed' | 'Flagged';
}

export const TABLE_RECORDS_ADMIN: DataRecord[] = [
  { id: 'USR-401', name: 'Elena Vance', secondary: 'elena@northstar.io', category: 'Design Lead', amount: 2400, date: '2026-11-12', status: 'Active' },
  { id: 'USR-402', name: 'Marcus Chen', secondary: 'm.chen@kinetix.dev', category: 'Staff Engineer', amount: 4850, date: '2026-11-11', status: 'Completed' },
  { id: 'USR-403', name: 'Sora Takahashi', secondary: 'sora@atelier.jp', category: 'Product Ops', amount: 1620, date: '2026-11-09', status: 'Pending' },
  { id: 'USR-404', name: 'Liam O’Connor', secondary: 'liam@vergeworks.co', category: 'Security Audit', amount: 3190, date: '2026-11-07', status: 'Flagged' },
  { id: 'USR-405', name: 'Nadia Patel', secondary: 'nadia@lumina.ai', category: 'Frontend Architect', amount: 5400, date: '2026-11-06', status: 'Active' },
  { id: 'USR-406', name: 'Jonas Lindqvist', secondary: 'jonas@nordiclab.se', category: 'Systems PM', amount: 1950, date: '2026-11-04', status: 'Completed' },
];

export const TABLE_RECORDS_ECOMMERCE: DataRecord[] = [
  { id: 'ORD-9821', name: 'Aetheris M1 Headphones', secondary: 'Order #9821 · Tokyo', category: 'Audio', amount: 389, date: '2026-11-14', status: 'Completed' },
  { id: 'ORD-9822', name: 'Atelier L4 CNC Lamp', secondary: 'Order #9822 · Berlin', category: 'Lighting', amount: 530, date: '2026-11-13', status: 'Active' },
  { id: 'ORD-9823', name: 'Monolith K75 Keyboard', secondary: 'Order #9823 · Austin', category: 'Hardware', amount: 219, date: '2026-11-12', status: 'Pending' },
  { id: 'ORD-9824', name: 'Studio Desk Bundle', secondary: 'Order #9824 · London', category: 'Bundle', amount: 732, date: '2026-11-10', status: 'Completed' },
  { id: 'ORD-9825', name: 'Replacement Ear Cushions', secondary: 'Order #9825 · Toronto', category: 'Accessories', amount: 64, date: '2026-11-08', status: 'Flagged' },
  { id: 'ORD-9826', name: 'Monolith K75 + Cable Kit', secondary: 'Order #9826 · Zurich', category: 'Hardware', amount: 258, date: '2026-11-05', status: 'Active' },
];

export interface FeedItem {
  id: string;
  index: number;
  title: string;
  subtitle: string;
  tag: string;
  metric: string;
}

export const PAGINATION_FEED_ITEMS: FeedItem[] = Array.from({ length: 16 }, (_, idx) => {
  const topics = [
    ['Fluid Spacing Scale', 'Token architecture for responsive density', 'Tokens', '16px–64px'],
    ['Focus-Visible Ring Spec', 'High-contrast keyboard navigation outline', 'A11y', 'WCAG AA'],
    ['Spring Curve Calibration', 'Damping and stiffness tuning for drawers', 'Motion', '240ms'],
    ['Tabular Figure Alignment', 'Preventing jitter in live telemetry tables', 'Typography', '0.02em'],
    ['Glassmorphic Layering', 'Backdrop saturation and hairline borders', 'Surfaces', '16px blur'],
    ['Portal Focus Trapping', 'Restoring active element on modal close', 'Overlays', 'aria-modal'],
    ['Optimistic Mutation UI', 'Instant state projection before server ack', 'State', '<16ms'],
    ['Adaptive Grid Breakpoints', 'Container-query driven bento reflows', 'Layout', '12-col'],
  ];
  const [title, subtitle, tag, metric] = topics[idx % topics.length];
  return {
    id: `feed-${idx + 1}`,
    index: idx + 1,
    title: `${title} #${String(idx + 1).padStart(2, '0')}`,
    subtitle,
    tag,
    metric,
  };
});
