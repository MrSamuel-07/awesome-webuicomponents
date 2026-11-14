import { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ChevronDown,
  Bell,
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  ArrowUpDown,
  Search,
  ChevronLeft,
  ChevronRight,
  Loader2,
  RotateCcw,
} from 'lucide-react';
import { useShowcase } from '../../context/ShowcaseContext';
import {
  COMPONENT_DIRECTORY,
  TABLE_RECORDS_ADMIN,
  TABLE_RECORDS_ECOMMERCE,
  PAGINATION_FEED_ITEMS,
  STUDIO_MEDIA,
} from '../../data/showcaseData';
import { AnatomyFrame } from '../AnatomyFrame';
import { StudioImage } from '../StudioImage';

const FAQ_ITEMS = [
  {
    id: 'faq-1',
    q: 'How does Anatomy X-Ray Mode separate Structural Layout from Interactive UI?',
    a: 'Category 1 (blue dashed frames) marks viewport containers, grid matrices, and navigation shells. Category 2 (purple dashed frames) highlights stateful controls, overlays, and micro-interaction primitives.',
  },
  {
    id: 'faq-2',
    q: 'Why animate transform and opacity instead of height or margin?',
    a: 'Compositor-only transforms avoid expensive browser layout recalculations, keeping interactions silky at 60–120fps even inside dense dashboards.',
  },
  {
    id: 'faq-3',
    q: 'When should teams prefer Pagination over Infinite Scroll?',
    a: 'Use Pagination when users need deterministic URL/page landmarks, footers, or comparison tables. Choose Infinite Scroll for continuous discovery feeds where item order is chronological.',
  },
];

const ANIMATED_TABS = [
  {
    id: 'overview',
    label: 'Architecture',
    title: 'Single-Elevation Surface System',
    body: 'Surfaces rely on hairline borders and subtle luminance steps rather than stacked drop shadows, keeping visual hierarchy clear across dark and light modes.',
    stat: '1px hairline · ≤12% contrast delta',
  },
  {
    id: 'tokens',
    label: 'Tokens',
    title: 'Semantic Light & Dark Pairing',
    body: 'Every canvas, card, text, and border token pairs cleanly via Tailwind v4 custom dark variants without !important overrides.',
    stat: '24 paired tokens · WCAG AA+',
  },
  {
    id: 'a11y',
    label: 'Accessibility',
    title: 'Keyboard & Reduced Motion Compliance',
    body: 'All dialogs trap focus, interactive controls maintain ≥40px touch targets, and reduced-motion preferences gracefully collapse spring animations.',
    stat: '4.5:1 text · 100% keyboard operable',
  },
  {
    id: 'perf',
    label: 'Performance',
    title: 'Zero-Latency Client State',
    body: 'Sorting, filtering, and tab transitions execute in memory under 16ms with tabular numerals preventing horizontal text jitter.',
    stat: '<16ms frame budget',
  },
];

export function TabsFeedbackAndDataDemo() {
  const { addToast, globalUseCase } = useShowcase();

  // 13. Accordions & Animated Tabs
  const [openFaqIds, setOpenFaqIds] = useState<string[]>(['faq-1']);
  const [multiExpand, setMultiExpand] = useState(false);
  const [activeTabId, setActiveTabId] = useState('overview');

  const toggleFaq = (id: string) => {
    setOpenFaqIds((prev) => {
      if (prev.includes(id)) return prev.filter((item) => item !== id);
      return multiExpand ? [...prev, id] : [id];
    });
  };

  // 14. Feedback & Micro-UI
  const [skeletonLoading, setSkeletonLoading] = useState(false);
  const [activeTooltip, setActiveTooltip] = useState<string | null>(null);

  // 15. Data Table state
  const [tableDomain, setTableDomain] = useState<'admin' | 'ecommerce'>('admin');
  const [tableQuery, setTableQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [sortField, setSortField] = useState<'name' | 'amount' | 'date'>('date');
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (globalUseCase === 'ecommerce') setTableDomain('ecommerce');
    if (globalUseCase === 'admin' || globalUseCase === 'saas') setTableDomain('admin');
  }, [globalUseCase]);

  const rawRows = tableDomain === 'admin' ? TABLE_RECORDS_ADMIN : TABLE_RECORDS_ECOMMERCE;

  const processedRows = useMemo(() => {
    const q = tableQuery.trim().toLowerCase();
    return rawRows
      .filter((r) => (statusFilter === 'All' ? true : r.status === statusFilter))
      .filter(
        (r) =>
          !q ||
          r.name.toLowerCase().includes(q) ||
          r.secondary.toLowerCase().includes(q) ||
          r.category.toLowerCase().includes(q)
      )
      .sort((a, b) => {
        const dir = sortAsc ? 1 : -1;
        if (sortField === 'amount') return (a.amount - b.amount) * dir;
        if (sortField === 'name') return a.name.localeCompare(b.name) * dir;
        return a.date.localeCompare(b.date) * dir;
      });
  }, [rawRows, tableQuery, statusFilter, sortField, sortAsc]);

  const toggleSort = (field: 'name' | 'amount' | 'date') => {
    if (sortField === field) {
      setSortAsc((v) => !v);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const toggleRow = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const allSelected =
    processedRows.length > 0 && processedRows.every((r) => selectedIds.includes(r.id));

  // 16. Pagination vs Infinite Scroll
  const [listMode, setListMode] = useState<'pagination' | 'infinite'>('pagination');
  const [page, setPage] = useState(1);
  const pageSize = 4;
  const totalPages = Math.ceil(PAGINATION_FEED_ITEMS.length / pageSize);
  const pagedItems = PAGINATION_FEED_ITEMS.slice((page - 1) * pageSize, page * pageSize);

  const [infiniteCount, setInfiniteCount] = useState(4);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleLoadMore = () => {
    if (loadingMore || infiniteCount >= PAGINATION_FEED_ITEMS.length) return;
    setLoadingMore(true);
    window.setTimeout(() => {
      setInfiniteCount((c) => Math.min(PAGINATION_FEED_ITEMS.length, c + 4));
      setLoadingMore(false);
    }, 650);
  };

  const meta13 = COMPONENT_DIRECTORY.find((c) => c.id === 'accordions-tabs')!;
  const meta14 = COMPONENT_DIRECTORY.find((c) => c.id === 'feedback-microui')!;
  const meta15 = COMPONENT_DIRECTORY.find((c) => c.id === 'data-tables')!;
  const meta16 = COMPONENT_DIRECTORY.find((c) => c.id === 'pagination-infinite')!;

  const activeTabObj = ANIMATED_TABS.find((t) => t.id === activeTabId)!;

  return (
    <div className="space-y-8">
      {/* 13. Accordions & Animated Tabs */}
      <AnatomyFrame meta={meta13}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* FAQ Accordion */}
          <div className="lg:col-span-6 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-indigo-600 dark:text-cyan-400">
                Smooth Height FAQ Accordion
              </span>
              <button
                type="button"
                onClick={() => setMultiExpand((m) => !m)}
                className="text-xs text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
              >
                Mode: <strong>{multiExpand ? 'Multi-Open' : 'Single-Open'}</strong>
              </button>
            </div>
            <div className="space-y-2">
              {FAQ_ITEMS.map((item) => {
                const isOpen = openFaqIds.includes(item.id);
                return (
                  <div
                    key={item.id}
                    className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] overflow-hidden"
                  >
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      onClick={() => toggleFaq(item.id)}
                      className="w-full flex items-center justify-between gap-3 p-4 text-left cursor-pointer"
                    >
                      <span className="text-xs sm:text-sm font-semibold text-zinc-900 dark:text-white">
                        {item.q}
                      </span>
                      <ChevronDown
                        className={`w-4 h-4 text-zinc-400 shrink-0 transition-transform duration-200 ${
                          isOpen ? 'rotate-180 text-indigo-500' : ''
                        }`}
                      />
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                          className="overflow-hidden"
                        >
                          <p className="px-4 pb-4 text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                            {item.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Sliding Pill Animated Tabs */}
          <div className="lg:col-span-6 space-y-3">
            <span className="block text-xs font-mono text-indigo-600 dark:text-cyan-400">
              Sliding-Pill Indicator Tabs
            </span>
            <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-4 space-y-4">
              <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-zinc-200/70 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10">
                {ANIMATED_TABS.map((tab) => {
                  const active = tab.id === activeTabId;
                  return (
                    <button
                      key={tab.id}
                      type="button"
                      onClick={() => setActiveTabId(tab.id)}
                      className={`relative flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap ${
                        active
                          ? 'text-zinc-900 dark:text-white'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                      }`}
                    >
                      {active && (
                        <motion.span
                          layoutId="animatedTabPill"
                          transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                          className="absolute inset-0 rounded-lg bg-white dark:bg-zinc-800 shadow-sm"
                        />
                      )}
                      <span className="relative z-10">{tab.label}</span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTabObj.id}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.16 }}
                  className="p-4 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 space-y-2 min-h-[132px]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-display text-sm font-semibold text-zinc-900 dark:text-white">
                      {activeTabObj.title}
                    </h4>
                    <span className="font-mono text-[11px] text-indigo-600 dark:text-cyan-400">
                      {activeTabObj.stat}
                    </span>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    {activeTabObj.body}
                  </p>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </AnatomyFrame>

      {/* 14. Feedback & Micro-UI */}
      <AnatomyFrame meta={meta14}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Toast Triggers + Tooltips + Badges */}
          <div className="lg:col-span-7 space-y-5">
            {/* Swipeable Toast Launcher */}
            <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-900 dark:text-white">
                  Stacked Swipeable Toasts
                </span>
                <span className="text-[11px] font-mono text-zinc-500">
                  Drag toast right to dismiss
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() =>
                    addToast({
                      title: 'Deployment succeeded',
                      description: 'Production build is live on edge nodes.',
                      variant: 'success',
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-medium cursor-pointer"
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Success Toast</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    addToast({
                      title: 'Tokens synchronized',
                      description: '42 variables updated in workspace.',
                      variant: 'info',
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-medium cursor-pointer"
                >
                  <Info className="w-3.5 h-3.5" />
                  <span>Info Toast</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    addToast({
                      title: 'Rate limit approaching',
                      description: '82% of monthly API quota consumed.',
                      variant: 'warning',
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-500 text-white text-xs font-medium cursor-pointer"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Warning Toast</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    addToast({
                      title: 'Webhook delivery failed',
                      description: 'Retrying endpoint in 30 seconds.',
                      variant: 'error',
                    })
                  }
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-600 hover:bg-rose-500 text-white text-xs font-medium cursor-pointer"
                >
                  <XCircle className="w-3.5 h-3.5" />
                  <span>Error Toast</span>
                </button>
              </div>
            </div>

            {/* Interactive Tooltips & Semantic Badges */}
            <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-4 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <span className="text-xs font-semibold text-zinc-900 dark:text-white">
                  Interactive Tooltips
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  {[
                    { id: 'top', label: 'Hover Top', tip: 'Appears above trigger' },
                    { id: 'bottom', label: 'Hover Bottom', tip: 'Appears below trigger' },
                  ].map((item) => (
                    <div
                      key={item.id}
                      onMouseEnter={() => setActiveTooltip(item.id)}
                      onMouseLeave={() => setActiveTooltip(null)}
                      className="relative"
                    >
                      <button
                        type="button"
                        onFocus={() => setActiveTooltip(item.id)}
                        onBlur={() => setActiveTooltip(null)}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-xs font-medium text-zinc-700 dark:text-zinc-200 cursor-pointer"
                      >
                        <Bell className="w-3.5 h-3.5 text-indigo-500" />
                        <span>{item.label}</span>
                      </button>
                      <AnimatePresence>
                        {activeTooltip === item.id && (
                          <motion.div
                            initial={{ opacity: 0, y: item.id === 'top' ? 4 : -4 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className={`absolute left-1/2 -translate-x-1/2 z-30 px-2.5 py-1 rounded-md bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-[11px] font-medium whitespace-nowrap shadow-lg ${
                              item.id === 'top' ? 'bottom-full mb-2' : 'top-full mt-2'
                            }`}
                          >
                            {item.tip}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-3 border-t border-zinc-200 dark:border-white/10 flex flex-wrap items-center gap-2">
                <span className="text-xs text-zinc-500 dark:text-zinc-400 mr-1">
                  Accessible Badges:
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Verified
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                  <AlertTriangle className="w-3.5 h-3.5" /> Review Needed
                </span>
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-rose-500/10 text-rose-600 dark:text-rose-400 border border-rose-500/20">
                  <XCircle className="w-3.5 h-3.5" /> Blocked
                </span>
              </div>
            </div>
          </div>

          {/* Skeleton Loader Toggle */}
          <div className="lg:col-span-5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-4 flex flex-col justify-between space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-zinc-900 dark:text-white">
                Skeleton Loader State
              </span>
              <button
                type="button"
                onClick={() => setSkeletonLoading((s) => !s)}
                className={`px-3 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                  skeletonLoading
                    ? 'bg-indigo-600 text-white'
                    : 'bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-200'
                }`}
              >
                {skeletonLoading ? 'Show Loaded Card' : 'Simulate Loading'}
              </button>
            </div>

            <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-4">
              {skeletonLoading ? (
                <div className="animate-pulse space-y-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-full bg-zinc-200 dark:bg-zinc-800" />
                    <div className="flex-1 space-y-2">
                      <div className="h-3.5 w-32 rounded bg-zinc-200 dark:bg-zinc-800" />
                      <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
                    </div>
                  </div>
                  <div className="h-3 w-full rounded bg-zinc-200 dark:bg-zinc-800" />
                  <div className="h-3 w-4/5 rounded bg-zinc-200 dark:bg-zinc-800" />
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <StudioImage
                      src={STUDIO_MEDIA.avatar}
                      alt="Kenji Watanabe"
                      className="w-11 h-11 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                        Kenji Watanabe
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Principal Design Architect
                      </p>
                    </div>
                  </div>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                    Skeleton geometry mirrors the exact avatar, heading, and 2-line copy footprint to avoid layout shift.
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </AnatomyFrame>

      {/* 15. Data Tables & Lists */}
      <AnatomyFrame
        meta={meta15}
        rightSlot={
          <div className="inline-flex p-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10">
            <button
              type="button"
              onClick={() => {
                setTableDomain('admin');
                setSelectedIds([]);
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer ${
                tableDomain === 'admin'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              Admin Users
            </button>
            <button
              type="button"
              onClick={() => {
                setTableDomain('ecommerce');
                setSelectedIds([]);
              }}
              className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer ${
                tableDomain === 'ecommerce'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              E-Commerce Orders
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          {/* Search & Status Filter Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="relative flex-1 max-w-xs">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={tableQuery}
                onChange={(e) => setTableQuery(e.target.value)}
                placeholder="Search records..."
                className="w-full rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] pl-9 pr-3 py-2 text-xs text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-[#09090B] border border-zinc-200 dark:border-white/10">
              {['All', 'Active', 'Completed', 'Pending', 'Flagged'].map((st) => (
                <button
                  key={st}
                  type="button"
                  onClick={() => setStatusFilter(st)}
                  className={`px-2.5 py-1 rounded-lg text-xs font-medium cursor-pointer ${
                    statusFilter === st
                      ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                      : 'text-zinc-500 dark:text-zinc-400'
                  }`}
                >
                  {st}
                </button>
              ))}
            </div>
          </div>

          {/* Selection Action Bar */}
          {selectedIds.length > 0 && (
            <div className="flex items-center justify-between gap-3 px-4 py-2.5 rounded-xl bg-indigo-600/10 border border-indigo-500/30 text-xs">
              <span className="font-medium text-indigo-700 dark:text-cyan-300 tabular-nums">
                {selectedIds.length} row(s) selected
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => {
                    addToast({
                      title: 'CSV Export Ready',
                      description: `Exported ${selectedIds.length} selected record(s).`,
                      variant: 'success',
                    });
                    setSelectedIds([]);
                  }}
                  className="px-3 py-1 rounded-lg bg-indigo-600 text-white font-medium cursor-pointer"
                >
                  Export Selected
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedIds([])}
                  className="px-2.5 py-1 rounded-lg text-zinc-600 dark:text-zinc-300 hover:underline cursor-pointer"
                >
                  Clear
                </button>
              </div>
            </div>
          )}

          {/* Responsive Data Table */}
          <div className="overflow-x-auto rounded-xl border border-zinc-200 dark:border-white/10">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                  <th className="p-3 w-10">
                    <input
                      type="checkbox"
                      aria-label="Select all rows"
                      checked={allSelected}
                      onChange={() =>
                        setSelectedIds(allSelected ? [] : processedRows.map((r) => r.id))
                      }
                      className="rounded border-zinc-300 text-indigo-600 cursor-pointer"
                    />
                  </th>
                  <th className="p-3">ID</th>
                  <th className="p-3">
                    <button
                      type="button"
                      onClick={() => toggleSort('name')}
                      className="inline-flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                    >
                      <span>{tableDomain === 'admin' ? 'Member' : 'Product'}</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="p-3">Category</th>
                  <th className="p-3">Status</th>
                  <th className="p-3 text-right">
                    <button
                      type="button"
                      onClick={() => toggleSort('amount')}
                      className="inline-flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white cursor-pointer ml-auto"
                    >
                      <span>Amount</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                  <th className="p-3 text-right">
                    <button
                      type="button"
                      onClick={() => toggleSort('date')}
                      className="inline-flex items-center gap-1 hover:text-zinc-900 dark:hover:text-white cursor-pointer ml-auto"
                    >
                      <span>Date</span>
                      <ArrowUpDown className="w-3 h-3" />
                    </button>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-200 dark:divide-white/10 text-xs">
                {processedRows.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="p-8 text-center text-zinc-500 dark:text-zinc-400">
                      No matching rows. Clear search or status filter to view records.
                    </td>
                  </tr>
                ) : (
                  processedRows.map((row) => {
                    const checked = selectedIds.includes(row.id);
                    const statusStyle =
                      row.status === 'Active' || row.status === 'Completed'
                        ? 'text-emerald-600 dark:text-emerald-400 bg-emerald-500/10'
                        : row.status === 'Pending'
                        ? 'text-amber-600 dark:text-amber-400 bg-amber-500/10'
                        : 'text-rose-600 dark:text-rose-400 bg-rose-500/10';
                    return (
                      <tr
                        key={row.id}
                        className={`transition-colors ${
                          checked
                            ? 'bg-indigo-500/[0.06]'
                            : 'hover:bg-zinc-50 dark:hover:bg-white/[0.02]'
                        }`}
                      >
                        <td className="p-3">
                          <input
                            type="checkbox"
                            aria-label={`Select ${row.name}`}
                            checked={checked}
                            onChange={() => toggleRow(row.id)}
                            className="rounded border-zinc-300 text-indigo-600 cursor-pointer"
                          />
                        </td>
                        <td className="p-3 font-mono text-zinc-500 dark:text-zinc-400 tabular-nums whitespace-nowrap">
                          {row.id}
                        </td>
                        <td className="p-3">
                          <p className="font-medium text-zinc-900 dark:text-white">{row.name}</p>
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                            {row.secondary}
                          </p>
                        </td>
                        <td className="p-3 text-zinc-600 dark:text-zinc-300">{row.category}</td>
                        <td className="p-3">
                          <span
                            className={`inline-flex items-center px-2 py-0.5 rounded-md text-[11px] font-medium ${statusStyle}`}
                          >
                            {row.status}
                          </span>
                        </td>
                        <td className="p-3 text-right font-mono font-semibold text-zinc-900 dark:text-white tabular-nums">
                          ${row.amount.toLocaleString()}
                        </td>
                        <td className="p-3 text-right font-mono text-zinc-500 dark:text-zinc-400 tabular-nums whitespace-nowrap">
                          {row.date}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </AnatomyFrame>

      {/* 16. Pagination vs. Infinite Scroll Demo */}
      <AnatomyFrame
        meta={meta16}
        rightSlot={
          <div className="inline-flex p-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10">
            <button
              type="button"
              onClick={() => setListMode('pagination')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer ${
                listMode === 'pagination'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              Classic Pagination
            </button>
            <button
              type="button"
              onClick={() => setListMode('infinite')}
              className={`px-3 py-1.5 rounded-md text-xs font-medium cursor-pointer ${
                listMode === 'infinite'
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                  : 'text-zinc-500 dark:text-zinc-400'
              }`}
            >
              Infinite Scroll / Load More
            </button>
          </div>
        }
      >
        {listMode === 'pagination' ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {pagedItems.map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-4 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-[11px] font-mono text-indigo-600 dark:text-cyan-400">
                      {item.tag} · Item #{String(item.index).padStart(2, '0')}
                    </p>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate mt-0.5">
                      {item.title}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                      {item.subtitle}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-zinc-600 dark:text-zinc-300 shrink-0 tabular-nums">
                    {item.metric}
                  </span>
                </div>
              ))}
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 tabular-nums">
                Showing {(page - 1) * pageSize + 1}–{page * pageSize} of {PAGINATION_FEED_ITEMS.length} patterns
              </span>
              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  aria-label="Previous page"
                  className="p-2 rounded-lg border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setPage(num)}
                    className={`w-8 h-8 rounded-lg text-xs font-mono font-semibold tabular-nums cursor-pointer ${
                      page === num
                        ? 'bg-indigo-600 text-white'
                        : 'border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                    }`}
                  >
                    {num}
                  </button>
                ))}
                <button
                  type="button"
                  disabled={page === totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  aria-label="Next page"
                  className="p-2 rounded-lg border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 disabled:opacity-40 cursor-pointer"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="max-h-72 overflow-y-auto pr-1 grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PAGINATION_FEED_ITEMS.slice(0, infiniteCount).map((item) => (
                <div
                  key={item.id}
                  className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-4 flex items-center justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-[11px] font-mono text-indigo-600 dark:text-cyan-400">
                      {item.tag} · #{String(item.index).padStart(2, '0')}
                    </p>
                    <p className="text-sm font-semibold text-zinc-900 dark:text-white truncate mt-0.5">
                      {item.title}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400 truncate">
                      {item.subtitle}
                    </p>
                  </div>
                  <span className="font-mono text-xs text-zinc-600 dark:text-zinc-300 shrink-0 tabular-nums">
                    {item.metric}
                  </span>
                </div>
              ))}

              {loadingMore &&
                [1, 2].map((sk) => (
                  <div
                    key={`sk-${sk}`}
                    className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-4 animate-pulse space-y-2"
                  >
                    <div className="h-3 w-24 rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-4 w-44 rounded bg-zinc-200 dark:bg-zinc-800" />
                    <div className="h-3 w-36 rounded bg-zinc-200 dark:bg-zinc-800" />
                  </div>
                ))}
            </div>

            <div className="flex items-center justify-between gap-3 pt-1">
              <span className="text-xs text-zinc-500 dark:text-zinc-400 tabular-nums">
                Loaded {infiniteCount} of {PAGINATION_FEED_ITEMS.length} items
              </span>

              {infiniteCount < PAGINATION_FEED_ITEMS.length ? (
                <button
                  type="button"
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer disabled:opacity-70"
                >
                  {loadingMore && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  <span>{loadingMore ? 'Loading Next Batch...' : 'Load More (+4)'}</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setInfiniteCount(4)}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl border border-zinc-200 dark:border-white/10 text-xs font-medium text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Feed</span>
                </button>
              )}
            </div>
          </div>
        )}
      </AnatomyFrame>
    </div>
  );
}
