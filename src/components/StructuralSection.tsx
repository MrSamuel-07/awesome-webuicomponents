import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  ChevronRight,
  Menu,
  PanelLeftClose,
  PanelLeftOpen,
  LayoutDashboard,
  Cpu,
  Users,
  CreditCard,
  Sliders,
  ShoppingBag,
  ArrowDown,
  Layers,
  Shield,
  Zap,
  Globe,
  BookOpen,
  Sparkles,
  Check,
} from 'lucide-react';
import { useShowcase } from '../context/ShowcaseContext';
import {
  COMPONENT_DIRECTORY,
  STORE_PRODUCTS,
  STUDIO_MEDIA,
  UseCaseId,
} from '../data/showcaseData';
import { AnatomyFrame } from './AnatomyFrame';
import { StudioImage } from './StudioImage';

export function StructuralSection() {
  const { globalUseCase, addToCart, addToast, setMobileDrawerOpen } = useShowcase();

  // 01. Smart Sticky Header Simulator
  const simScrollRef = useRef<HTMLDivElement>(null);
  const lastSimScrollTop = useRef(0);
  const [simState, setSimState] = useState<'top' | 'compact' | 'hidden' | 'revealed'>('top');

  const handleSimScroll = () => {
    const el = simScrollRef.current;
    if (!el) return;
    const current = el.scrollTop;
    const prev = lastSimScrollTop.current;
    if (current <= 12) {
      setSimState('top');
    } else if (current > prev && current > 70) {
      setSimState('hidden');
    } else if (current < prev) {
      setSimState('revealed');
    } else {
      setSimState('compact');
    }
    lastSimScrollTop.current = current;
  };

  // 02. Navigation Suite
  const [openMegaMenu, setOpenMegaMenu] = useState<'platform' | 'solutions' | null>('platform');
  const [navUseCase, setNavUseCase] = useState<UseCaseId>('saas');
  const [breadcrumbIdx, setBreadcrumbIdx] = useState<number>(3);

  useEffect(() => {
    if (globalUseCase !== 'custom') {
      setNavUseCase(globalUseCase);
      setBentoUseCase(globalUseCase === 'admin' ? 'saas' : globalUseCase);
      setSidebarMode(globalUseCase === 'ecommerce' ? 'ecommerce' : 'dashboard');
    }
  }, [globalUseCase]);

  const breadcrumbPaths: Record<UseCaseId, string[]> = {
    saas: ['Workspace', 'Design System', 'Tokens', 'Surface Elevation'],
    ecommerce: ['Storefront', 'Audio Hardware', 'Studio Headphones', 'Aetheris M1'],
    media: ['Editorial', 'Engineering', 'Architecture', 'Layout Grids'],
    admin: ['Console', 'Organizations', 'Northstar Labs', 'Audit Logs'],
  };

  // 03. Hero Variant Inspector
  const [heroLayout, setHeroLayout] = useState<'split' | 'asymmetric' | 'centered'>('split');

  // 04. Asymmetric Bento Grid
  const [bentoUseCase, setBentoUseCase] = useState<UseCaseId>('saas');

  // 05. Collapsible Sidebar Mini-App
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [sidebarMode, setSidebarMode] = useState<'ecommerce' | 'dashboard'>('ecommerce');
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    'Studio Audio',
    'Lighting',
    'Input Hardware',
    'Workspace',
  ]);
  const [maxPrice, setMaxPrice] = useState<number>(400);
  const [activeDashRoute, setActiveDashRoute] = useState<string>('Overview');

  const toggleCategory = (cat: string) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const filteredProducts = STORE_PRODUCTS.filter(
    (p) => selectedCategories.includes(p.category) && p.price <= maxPrice
  );

  const meta01 = COMPONENT_DIRECTORY.find((c) => c.id === 'sticky-header')!;
  const meta02 = COMPONENT_DIRECTORY.find((c) => c.id === 'navigation-suite')!;
  const meta03 = COMPONENT_DIRECTORY.find((c) => c.id === 'bento-hero')!;
  const meta04 = COMPONENT_DIRECTORY.find((c) => c.id === 'asymmetric-bento')!;
  const meta05 = COMPONENT_DIRECTORY.find((c) => c.id === 'collapsible-sidebar')!;
  const meta06 = COMPONENT_DIRECTORY.find((c) => c.id === 'modern-footer')!;

  return (
    <div className="space-y-8">
      {/* 01. Smart Sticky Header Simulator */}
      <AnatomyFrame
        meta={meta01}
        rightSlot={
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/10">
            State:{' '}
            <strong className="text-indigo-600 dark:text-cyan-400">
              {simState === 'top'
                ? 'Expanded'
                : simState === 'hidden'
                ? 'Hidden (Scroll Down)'
                : simState === 'revealed'
                ? 'Revealed (Scroll Up)'
                : 'Compact + Blur'}
            </strong>
          </span>
        }
      >
        <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] overflow-hidden">
          <div
            ref={simScrollRef}
            onScroll={handleSimScroll}
            className="relative h-64 overflow-y-auto"
          >
            {/* Simulated Smart Header */}
            <motion.div
              animate={{ y: simState === 'hidden' ? '-100%' : '0%' }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className={`sticky top-0 z-10 flex items-center justify-between px-5 transition-all duration-200 ${
                simState === 'top'
                  ? 'h-14 bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-white/10'
                  : 'h-11 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border-b border-zinc-200 dark:border-white/10 shadow-sm'
              }`}
            >
              <span className="font-display text-sm font-bold text-zinc-900 dark:text-white">
                Acme Studio
              </span>
              <div className="hidden sm:flex items-center gap-5 text-xs text-zinc-600 dark:text-zinc-400">
                <span>Architecture</span>
                <span>Showcase</span>
                <span>Pricing</span>
              </div>
              <button
                type="button"
                onClick={() =>
                  simScrollRef.current?.scrollTo({
                    top: simState === 'top' ? 160 : 0,
                    behavior: 'smooth',
                  })
                }
                className="px-3 py-1 rounded-lg bg-indigo-600 text-white text-xs font-medium cursor-pointer"
              >
                {simState === 'top' ? 'Simulate Scroll' : 'Back to Top'}
              </button>
            </motion.div>

            {/* Scrollable Body Content inside Simulator */}
            <div className="p-5 space-y-4">
              <p className="text-xs font-mono text-indigo-600 dark:text-cyan-400">
                Scroll inside this viewport (or the main page) to trigger shrink, hide-on-down, and reveal-on-up.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[1, 2, 3, 4, 5, 6].map((block) => (
                  <div
                    key={block}
                    className="h-20 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/60 p-3 flex flex-col justify-between"
                  >
                    <span className="text-xs font-medium text-zinc-800 dark:text-zinc-200">
                      Content Block 0{block}
                    </span>
                    <span className="text-[11px] text-zinc-500 dark:text-zinc-400">
                      Scroll velocity tracking zone
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </AnatomyFrame>

      {/* 02. Navigation Suite (Mega Menu, Mobile Drawer, Breadcrumbs) */}
      <AnatomyFrame
        meta={meta02}
        useCase={navUseCase}
        onUseCaseChange={setNavUseCase}
        availableUseCases={['saas', 'ecommerce', 'media', 'admin']}
      >
        <div className="space-y-6">
          {/* Interactive Breadcrumbs */}
          <div className="p-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] flex flex-wrap items-center justify-between gap-4">
            <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-1.5 text-xs sm:text-sm">
              {breadcrumbPaths[navUseCase].slice(0, breadcrumbIdx + 1).map((crumb, idx, arr) => {
                const isLast = idx === arr.length - 1;
                return (
                  <React.Fragment key={crumb}>
                    <button
                      type="button"
                      onClick={() => setBreadcrumbIdx(idx)}
                      className={`px-2 py-1 rounded-md transition-colors cursor-pointer ${
                        isLast
                          ? 'font-semibold text-zinc-900 dark:text-white bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10'
                          : 'text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                      }`}
                    >
                      {crumb}
                    </button>
                    {!isLast && <ChevronRight className="w-3.5 h-3.5 text-zinc-400" />}
                  </React.Fragment>
                );
              })}
            </nav>

            {breadcrumbIdx < 3 && (
              <button
                type="button"
                onClick={() => setBreadcrumbIdx(3)}
                className="text-xs font-mono text-indigo-600 dark:text-cyan-400 hover:underline cursor-pointer"
              >
                Reset Full Trail
              </button>
            )}
          </div>

          {/* Desktop Mega Menu + Mobile Drawer Trigger */}
          <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-4 space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-zinc-200 dark:border-white/10">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() =>
                    setOpenMegaMenu((prev) => (prev === 'platform' ? null : 'platform'))
                  }
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    openMegaMenu === 'platform'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/10'
                  }`}
                >
                  <span>Platform Mega Menu</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      openMegaMenu === 'platform' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setOpenMegaMenu((prev) => (prev === 'solutions' ? null : 'solutions'))
                  }
                  className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    openMegaMenu === 'solutions'
                      ? 'bg-indigo-600 text-white'
                      : 'bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/10'
                  }`}
                >
                  <span>Solutions Mega Menu</span>
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform ${
                      openMegaMenu === 'solutions' ? 'rotate-180' : ''
                    }`}
                  />
                </button>
              </div>

              <button
                type="button"
                onClick={() => setMobileDrawerOpen(true)}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90 transition-opacity cursor-pointer"
              >
                <Menu className="w-3.5 h-3.5" />
                <span>Open Mobile Slide-Over Drawer</span>
              </button>
            </div>

            <AnimatePresence mode="wait">
              {openMegaMenu && (
                <motion.div
                  key={openMegaMenu}
                  initial={{ opacity: 0, y: -6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.16 }}
                  className="grid grid-cols-1 md:grid-cols-3 gap-3"
                >
                  {(openMegaMenu === 'platform'
                    ? [
                        {
                          icon: Layers,
                          title: 'Layout Primitives',
                          desc: 'Responsive CSS grid shells, sticky bars, and collapsible sidebars.',
                        },
                        {
                          icon: Shield,
                          title: 'Accessible Dialogs',
                          desc: 'Focus-trapped drawers, modals, and keyboard command palettes.',
                        },
                        {
                          icon: Zap,
                          title: 'Motion Physics',
                          desc: 'Hardware-accelerated spring curves and layoutId transitions.',
                        },
                      ]
                    : [
                        {
                          icon: Globe,
                          title: 'Multi-Region Storefronts',
                          desc: 'High-conversion product cards, filter rails, and cart drawers.',
                        },
                        {
                          icon: BookOpen,
                          title: 'Editorial Publications',
                          desc: 'Balanced long-form typography, bento digests, and reading tools.',
                        },
                        {
                          icon: Sparkles,
                          title: 'SaaS Control Planes',
                          desc: 'Dense tabular grids, bulk actions, and command search.',
                        },
                      ]
                  ).map((item) => (
                    <button
                      key={item.title}
                      type="button"
                      onClick={() =>
                        addToast({
                          title: `Navigated to ${item.title}`,
                          description: item.desc,
                          variant: 'info',
                        })
                      }
                      className="flex items-start gap-3 p-3.5 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 hover:border-indigo-500/50 text-left transition-colors cursor-pointer"
                    >
                      <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-cyan-400 shrink-0">
                        <item.icon className="w-4 h-4" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                          {item.title}
                        </p>
                        <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5 leading-relaxed">
                          {item.desc}
                        </p>
                      </div>
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </AnatomyFrame>

      {/* 03. Bento & Split Hero Layout Blueprint */}
      <AnatomyFrame
        meta={meta03}
        rightSlot={
          <div className="inline-flex p-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10">
            {(['split', 'asymmetric', 'centered'] as const).map((variant) => (
              <button
                key={variant}
                type="button"
                onClick={() => setHeroLayout(variant)}
                className={`px-2.5 py-1 rounded-md text-xs font-medium capitalize cursor-pointer ${
                  heroLayout === variant
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                    : 'text-zinc-500 dark:text-zinc-400'
                }`}
              >
                {variant}
              </button>
            ))}
          </div>
        }
      >
        <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-gradient-to-br from-indigo-500/[0.06] via-transparent to-cyan-500/[0.06] p-5">
          <div
            className={`grid gap-4 items-center ${
              heroLayout === 'centered'
                ? 'grid-cols-1 text-center max-w-xl mx-auto'
                : heroLayout === 'asymmetric'
                ? 'grid-cols-1 md:grid-cols-12'
                : 'grid-cols-1 md:grid-cols-2'
            }`}
          >
            <div className={heroLayout === 'asymmetric' ? 'md:col-span-7 space-y-2' : 'space-y-2'}>
              <p className="font-mono text-[11px] text-indigo-600 dark:text-cyan-400">
                Live Hero Demonstrated Above · Variant: {heroLayout}
              </p>
              <h4 className="font-display text-lg font-bold text-zinc-900 dark:text-white">
                Mesh Gradient + Kinetic Headline + Interactive Proof
              </h4>
              <p className="text-xs text-zinc-600 dark:text-zinc-400">
                Switch layout ratios on the top-right to compare Split 50/50, Asymmetric 7/5, and Centered Hero framing.
              </p>
            </div>
            <div
              className={`rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-4 flex items-center justify-between gap-3 ${
                heroLayout === 'asymmetric' ? 'md:col-span-5' : ''
              }`}
            >
              <div className="text-left">
                <p className="text-xs font-semibold text-zinc-900 dark:text-white">
                  Live Hero Viewport
                </p>
                <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                  Scroll up to interact with the full Hero sandbox
                </p>
              </div>
              <a
                href="#top"
                className="px-3 py-1.5 rounded-lg bg-indigo-600 text-white text-xs font-medium whitespace-nowrap shrink-0"
              >
                Inspect Hero
              </a>
            </div>
          </div>
        </div>
      </AnatomyFrame>

      {/* 04. Main Content Area — Asymmetric Bento Grid */}
      <AnatomyFrame
        meta={meta04}
        useCase={bentoUseCase}
        onUseCaseChange={setBentoUseCase}
        availableUseCases={['saas', 'ecommerce', 'media']}
      >
        {bentoUseCase === 'saas' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-7 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-5 flex flex-col justify-between min-h-[210px]">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-indigo-600 dark:text-cyan-400">
                  Col-Span 7 · Primary Telemetry
                </span>
                <span className="font-mono text-xs text-emerald-500 tabular-nums">+18.4% QoQ</span>
              </div>
              <div className="my-4">
                <p className="font-display text-3xl font-bold text-zinc-900 dark:text-white tabular-nums">
                  142,890
                </p>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                  Weekly active component renders across production workspaces
                </p>
              </div>
              <div className="h-2 w-full rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden">
                <div className="h-full w-3/4 rounded-full bg-gradient-to-r from-indigo-500 to-cyan-400" />
              </div>
            </div>

            <div className="md:col-span-5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-5 flex flex-col justify-between">
              <span className="text-xs font-mono text-zinc-500 dark:text-zinc-400">
                Col-Span 5 · Deployment Gate
              </span>
              <div className="space-y-2.5 my-3">
                {['WCAG AA Contrast Verified', 'Zero Layout Shift Grid', 'Keyboard Focus Trapped'].map(
                  (check) => (
                    <div key={check} className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300">
                      <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>{check}</span>
                    </div>
                  )
                )}
              </div>
              <button
                type="button"
                onClick={() =>
                  addToast({
                    title: 'Bento Audit Passed',
                    description: 'All 3 architectural checks verified.',
                    variant: 'success',
                  })
                }
                className="w-full py-2 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-semibold cursor-pointer"
              >
                Run Bento Audit
              </button>
            </div>

            <div className="md:col-span-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-4">
              <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">Col-Span 4</p>
              <p className="text-sm font-semibold text-zinc-900 dark:text-white mt-1">
                Token Inheritance
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                Consistent radius and surface contrast across dark and light modes.
              </p>
            </div>
            <div className="md:col-span-8 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-4 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400">Col-Span 8 · Wide Feature Strip</p>
                <p className="text-sm font-semibold text-zinc-900 dark:text-white mt-1">
                  Edge-Cached Design Spec Distribution
                </p>
              </div>
              <span className="font-mono text-sm font-bold text-indigo-600 dark:text-cyan-400 tabular-nums">
                14ms avg
              </span>
            </div>
          </div>
        )}

        {bentoUseCase === 'ecommerce' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-7 relative rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 min-h-[240px]">
              <StudioImage
                src={STUDIO_MEDIA.keyboard}
                alt="Monolith K75 Mechanical Keyboard"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent p-5 flex flex-col justify-end">
                <p className="text-xs font-mono text-cyan-300">Featured Release · Input Hardware</p>
                <div className="flex items-end justify-between gap-4 mt-1">
                  <div>
                    <h4 className="font-display text-lg font-bold text-white">
                      Monolith K75 Rotary Keyboard
                    </h4>
                    <p className="text-xs text-zinc-300">Anodized charcoal chassis · $219.00</p>
                  </div>
                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        id: STORE_PRODUCTS[2].id,
                        name: STORE_PRODUCTS[2].name,
                        price: STORE_PRODUCTS[2].price,
                        finish: STORE_PRODUCTS[2].finish,
                        image: STORE_PRODUCTS[2].image,
                      })
                    }
                    className="px-3.5 py-2 rounded-lg bg-white text-zinc-900 text-xs font-semibold hover:bg-zinc-100 cursor-pointer whitespace-nowrap"
                  >
                    Add to Bag
                  </button>
                </div>
              </div>
            </div>

            <div className="md:col-span-5 grid grid-rows-2 gap-4">
              <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-4 flex items-center gap-4">
                <StudioImage
                  src={STUDIO_MEDIA.headphones}
                  alt="Aetheris Headphones"
                  className="w-20 h-20 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Studio Audio</p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                    Aetheris M1 Reference
                  </p>
                  <p className="font-mono text-xs font-semibold text-indigo-600 dark:text-cyan-400 tabular-nums mt-1">
                    $389.00
                  </p>
                </div>
              </div>
              <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-4 flex items-center gap-4">
                <StudioImage
                  src={STUDIO_MEDIA.lamp}
                  alt="Atelier Task Lamp"
                  className="w-20 h-20 rounded-lg object-cover shrink-0"
                />
                <div className="min-w-0">
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">Lighting</p>
                  <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate">
                    Atelier L4 CNC Lamp
                  </p>
                  <p className="font-mono text-xs font-semibold text-indigo-600 dark:text-cyan-400 tabular-nums mt-1">
                    $265.00
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {bentoUseCase === 'media' && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
            <div className="md:col-span-8 relative rounded-xl overflow-hidden border border-zinc-200 dark:border-white/10 min-h-[240px]">
              <StudioImage
                src={STUDIO_MEDIA.studio}
                alt="Editorial Design Studio"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-transparent p-5 flex flex-col justify-end">
                <p className="text-xs text-zinc-300">Architecture Essay · 8 min read</p>
                <h4 className="font-display text-xl font-bold text-white mt-1">
                  Why Asymmetric Bento Grids Outperform Uniform Card Walls
                </h4>
              </div>
            </div>
            <div className="md:col-span-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-5 flex flex-col justify-between">
              <div className="space-y-3">
                <p className="text-xs font-mono text-indigo-600 dark:text-cyan-400">
                  Issue Dispatch
                </p>
                <h4 className="font-display text-base font-semibold text-zinc-900 dark:text-white">
                  Spatial Rhythm & Editorial Contrast
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Pairing wide 8-column visual anchors with compact 4-column typographic sidebars directs reader attention without badge noise.
                </p>
              </div>
              <button
                type="button"
                onClick={() =>
                  addToast({
                    title: 'Article bookmarked',
                    description: 'Saved to your reading list.',
                    variant: 'info',
                  })
                }
                className="mt-4 w-full py-2 rounded-lg border border-zinc-200 dark:border-white/10 text-xs font-medium text-zinc-800 dark:text-zinc-200 hover:bg-white dark:hover:bg-zinc-900 cursor-pointer"
              >
                Bookmark Essay
              </button>
            </div>
          </div>
        )}
      </AnatomyFrame>

      {/* 05. Collapsible Sidebar Mini-App */}
      <AnatomyFrame
        meta={meta05}
        rightSlot={
          <div className="inline-flex p-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10">
            <button
              type="button"
              onClick={() => setSidebarMode('ecommerce')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer ${
                sidebarMode === 'ecommerce'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              E-Commerce Filters
            </button>
            <button
              type="button"
              onClick={() => setSidebarMode('dashboard')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer ${
                sidebarMode === 'dashboard'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              Dashboard Nav
            </button>
          </div>
        }
      >
        <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] overflow-hidden flex flex-col md:flex-row min-h-[360px]">
          {/* Collapsible Rail */}
          <motion.aside
            animate={{ width: sidebarCollapsed ? 72 : 248 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="shrink-0 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-white/10 bg-white dark:bg-[#141417] p-3.5 flex flex-col justify-between"
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                {!sidebarCollapsed && (
                  <span className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                    {sidebarMode === 'ecommerce' ? 'Catalog Filters' : 'Workspace Nav'}
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => setSidebarCollapsed((c) => !c)}
                  aria-label={sidebarCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                  className="p-1.5 rounded-lg border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer ml-auto"
                >
                  {sidebarCollapsed ? (
                    <PanelLeftOpen className="w-4 h-4" />
                  ) : (
                    <PanelLeftClose className="w-4 h-4" />
                  )}
                </button>
              </div>

              {sidebarMode === 'ecommerce' ? (
                sidebarCollapsed ? (
                  <div className="flex flex-col items-center gap-3 pt-2">
                    <Sliders className="w-4 h-4 text-indigo-500" />
                    <span className="font-mono text-[11px] text-zinc-500 tabular-nums">
                      ${maxPrice}
                    </span>
                    <span className="font-mono text-[11px] text-zinc-500 tabular-nums">
                      {selectedCategories.length}/4
                    </span>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                        Categories
                      </p>
                      {['Studio Audio', 'Lighting', 'Input Hardware', 'Workspace'].map((cat) => {
                        const checked = selectedCategories.includes(cat);
                        return (
                          <label
                            key={cat}
                            className="flex items-center gap-2 text-xs text-zinc-700 dark:text-zinc-300 cursor-pointer"
                          >
                            <input
                              type="checkbox"
                              checked={checked}
                              onChange={() => toggleCategory(cat)}
                              className="rounded border-zinc-300 text-indigo-600 focus:ring-indigo-500"
                            />
                            <span>{cat}</span>
                          </label>
                        );
                      })}
                    </div>

                    <div className="space-y-1.5 pt-2 border-t border-zinc-200 dark:border-white/10">
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-zinc-500 dark:text-zinc-400">Max Price</span>
                        <span className="font-mono font-semibold text-zinc-900 dark:text-white tabular-nums">
                          ${maxPrice}
                        </span>
                      </div>
                      <input
                        type="range"
                        min={100}
                        max={450}
                        step={10}
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full accent-indigo-600 cursor-pointer"
                      />
                    </div>
                  </div>
                )
              ) : (
                <nav className="space-y-1">
                  {[
                    { id: 'Overview', icon: LayoutDashboard },
                    { id: 'Compute', icon: Cpu },
                    { id: 'Team', icon: Users },
                    { id: 'Billing', icon: CreditCard },
                  ].map((item) => {
                    const active = activeDashRoute === item.id;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onClick={() => setActiveDashRoute(item.id)}
                        className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                          active
                            ? 'bg-indigo-600 text-white'
                            : 'text-zinc-600 dark:text-zinc-400 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                        }`}
                      >
                        <item.icon className="w-4 h-4 shrink-0" />
                        {!sidebarCollapsed && <span className="truncate">{item.id}</span>}
                      </button>
                    );
                  })}
                </nav>
              )}
            </div>

            {!sidebarCollapsed && (
              <p className="text-[11px] font-mono text-zinc-400 pt-4">
                Rail: 248px → 72px
              </p>
            )}
          </motion.aside>

          {/* Mini-App Main Viewport */}
          <div className="flex-1 p-5">
            {sidebarMode === 'ecommerce' ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    Showing <strong className="text-zinc-900 dark:text-white tabular-nums">{filteredProducts.length}</strong> studio hardware items
                  </p>
                  {filteredProducts.length < STORE_PRODUCTS.length && (
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedCategories(['Studio Audio', 'Lighting', 'Input Hardware', 'Workspace']);
                        setMaxPrice(450);
                      }}
                      className="text-xs text-indigo-600 dark:text-cyan-400 hover:underline cursor-pointer"
                    >
                      Reset filters
                    </button>
                  )}
                </div>

                {filteredProducts.length === 0 ? (
                  <div className="py-12 text-center border border-dashed border-zinc-300 dark:border-white/15 rounded-xl">
                    <p className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                      No products match current filters
                    </p>
                    <p className="text-xs text-zinc-500 mt-1">
                      Increase the price slider or re-enable a category.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                    {filteredProducts.map((product) => (
                      <div
                        key={product.id}
                        className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-3 flex items-center gap-3.5"
                      >
                        <StudioImage
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 rounded-lg object-cover shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                            {product.category}
                          </p>
                          <p className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                            {product.name}
                          </p>
                          <div className="flex items-center justify-between mt-1.5">
                            <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-white tabular-nums">
                              ${product.price}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                addToCart({
                                  id: product.id,
                                  name: product.name,
                                  price: product.price,
                                  finish: product.finish,
                                  image: product.image,
                                })
                              }
                              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-indigo-600 hover:bg-indigo-500 text-white text-[11px] font-medium cursor-pointer"
                            >
                              <ShoppingBag className="w-3 h-3" />
                              <span>Add</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <div className="space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-zinc-200 dark:border-white/10">
                  <div>
                    <h4 className="font-display text-base font-semibold text-zinc-900 dark:text-white">
                      {activeDashRoute} Console
                    </h4>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      Active route inside collapsible sidebar workspace
                    </p>
                  </div>
                  <span className="font-mono text-xs text-emerald-500">Healthy</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {[
                    { label: 'Requests / min', val: '24,810' },
                    { label: 'Error Budget', val: '99.98%' },
                    { label: 'Active Seats', val: '38' },
                  ].map((m) => (
                    <div
                      key={m.label}
                      className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-4"
                    >
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">{m.label}</p>
                      <p className="font-mono text-xl font-bold text-zinc-900 dark:text-white tabular-nums mt-1">
                        {m.val}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </AnatomyFrame>

      {/* 06. Multi-Column Modern Footer Reference Card */}
      <AnatomyFrame meta={meta06}>
        <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              Live Multi-Column Footer Anchored Below
            </p>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Includes sitemap anchors, live email newsletter signup with toast feedback, operational status indicator, and social triggers.
            </p>
          </div>
          <a
            href="#modern-footer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold whitespace-nowrap shrink-0"
          >
            <span>Jump to Live Footer</span>
            <ArrowDown className="w-3.5 h-3.5" />
          </a>
        </div>
      </AnatomyFrame>
    </div>
  );
}
