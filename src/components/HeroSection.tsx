import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ArrowRight, Command, Layers, Sparkles, SlidersHorizontal, Check } from 'lucide-react';
import { useShowcase, GlobalUseCasePreset } from '../context/ShowcaseContext';
import { USE_CASE_LABELS, UseCaseId } from '../data/showcaseData';

export function HeroSection() {
  const {
    xrayMode,
    toggleXrayMode,
    activeSection,
    setActiveSection,
    globalUseCase,
    setGlobalUseCase,
    setCommandPaletteOpen,
    jumpToComponent,
  } = useShowcase();

  const [previewMode, setPreviewMode] = useState<'saas' | 'ecommerce' | 'analytics'>('saas');
  const [liveNotifications, setLiveNotifications] = useState(true);
  const [compactDensity, setCompactDensity] = useState(false);

  const presets: { id: GlobalUseCasePreset; label: string }[] = [
    { id: 'custom', label: 'Independent' },
    ...(['saas', 'ecommerce', 'media', 'admin'] as UseCaseId[]).map((id) => ({
      id,
      label: USE_CASE_LABELS[id],
    })),
  ];

  return (
    <div id="top" className="relative overflow-hidden pt-24 sm:pt-28 pb-10">
      {/* Subtle Mesh Gradient Backdrop */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div className="absolute -top-40 left-1/4 w-[540px] h-[540px] rounded-full bg-indigo-500/15 dark:bg-indigo-500/20 blur-[120px]" />
        <div className="absolute top-10 right-1/5 w-[420px] h-[420px] rounded-full bg-cyan-500/10 dark:bg-cyan-500/15 blur-[120px]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Component #3: Split & Bento Hero Section */}
        <div
          className={`relative rounded-3xl p-6 sm:p-10 transition-colors duration-200 ${
            xrayMode
              ? 'border-2 border-dashed border-blue-500/75 bg-blue-500/[0.03]'
              : 'border border-zinc-200/80 dark:border-white/10 bg-white/75 dark:bg-[#18181B]/70 backdrop-blur-md'
          }`}
        >
          <AnimatePresence>
            {xrayMode && (
              <motion.div
                initial={{ opacity: 0, y: -6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                className="absolute -top-3.5 left-6 z-20 inline-flex items-center gap-2 rounded-full bg-blue-600 text-white px-3 py-1 text-xs font-mono font-medium shadow-md border border-blue-400/50"
              >
                <Layers className="w-3.5 h-3.5" />
                <span>Category 1: Structural Layout · Split & Bento Hero</span>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-stretch">
            {/* Left Copy & Dual CTAs */}
            <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
              <div className="space-y-4">
                <p className="text-xs font-mono tracking-wide text-indigo-600 dark:text-cyan-400">
                  Modern Web Anatomy · 16 Interactive Pattern Sandboxes
                </p>
                <h1
                  className="font-display font-bold tracking-tight text-zinc-900 dark:text-white leading-[1.08]"
                  style={{ fontSize: 'clamp(2.25rem, 4vw, 3.5rem)', textWrap: 'balance' }}
                >
                  Inspect every layer of modern web architecture.
                </h1>
                <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 max-w-2xl leading-relaxed">
                  ComponentVerse separates structural layout scaffolding from tactile interactive UI.
                  Toggle <span className="text-zinc-900 dark:text-zinc-100 font-medium">X-Ray Mode</span> to reveal
                  architectural boundaries or switch live use-case presets across 16 working components.
                </p>
              </div>

              {/* Dual CTAs */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => jumpToComponent('interactive', 'buttons-ctas')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-500 hover:to-cyan-500 shadow-lg shadow-indigo-500/20 transition-all cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>Explore Interactive UI</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setCommandPaletteOpen(true)}
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium text-zinc-800 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 hover:border-indigo-500/40 transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <Command className="w-4 h-4 text-indigo-500 dark:text-cyan-400" />
                  <span>Command Palette</span>
                  <kbd className="font-mono text-xs text-zinc-500 dark:text-zinc-400 ml-1">⌘K</kbd>
                </button>
                <button
                  type="button"
                  onClick={toggleXrayMode}
                  className="inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl text-xs font-mono font-medium text-zinc-600 dark:text-zinc-300 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer whitespace-nowrap shrink-0"
                >
                  <span>{xrayMode ? 'Disable X-Ray Overlay' : 'Enable X-Ray Overlay'}</span>
                </button>
              </div>
            </div>

            {/* Right Interactive Live Preview Widget */}
            <div className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50/90 dark:bg-[#09090B]/90 p-5">
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-zinc-200 dark:border-white/10">
                <span className="text-xs font-mono font-medium text-zinc-500 dark:text-zinc-400">
                  Live Hero Preview Widget
                </span>
                <div className="inline-flex p-0.5 rounded-lg bg-zinc-200/70 dark:bg-zinc-800/80">
                  {(['saas', 'ecommerce', 'analytics'] as const).map((m) => (
                    <button
                      key={m}
                      type="button"
                      onClick={() => setPreviewMode(m)}
                      className={`px-2 py-1 text-[11px] font-medium rounded-md capitalize transition-colors cursor-pointer whitespace-nowrap ${
                        previewMode === m
                          ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm'
                          : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                      }`}
                    >
                      {m === 'saas' ? 'SaaS' : m === 'ecommerce' ? 'Store' : 'Metrics'}
                    </button>
                  ))}
                </div>
              </div>

              <div className={`py-4 transition-all ${compactDensity ? 'space-y-2' : 'space-y-3.5'}`}>
                {previewMode === 'saas' && (
                  <>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                          Release Readiness
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          Design tokens · Accessibility · Motion
                        </p>
                      </div>
                      <span className="font-mono text-lg font-semibold text-indigo-600 dark:text-cyan-400 tabular-nums">
                        16/16
                      </span>
                    </div>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { label: 'Contrast', val: 'AA+' },
                        { label: 'Latency', val: '12ms' },
                        { label: 'Layers', val: '2 Cat' },
                      ].map((stat) => (
                        <div
                          key={stat.label}
                          className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-2.5"
                        >
                          <p className="text-[11px] text-zinc-500 dark:text-zinc-400">{stat.label}</p>
                          <p className="font-mono text-sm font-semibold text-zinc-900 dark:text-zinc-100 tabular-nums mt-0.5">
                            {stat.val}
                          </p>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {previewMode === 'ecommerce' && (
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-zinc-900 dark:text-white">
                        Active Storefront Cart
                      </span>
                      <span className="font-mono text-xs text-emerald-600 dark:text-emerald-400">
                        Express Ready
                      </span>
                    </div>
                    <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 p-3 flex items-center justify-between">
                      <div>
                        <p className="text-xs font-medium text-zinc-900 dark:text-zinc-100">
                          Aetheris M1 Reference
                        </p>
                        <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                          Matte Obsidian · In Stock
                        </p>
                      </div>
                      <span className="font-mono text-sm font-semibold text-zinc-900 dark:text-white tabular-nums">
                        $389.00
                      </span>
                    </div>
                  </div>
                )}

                {previewMode === 'analytics' && (
                  <div className="space-y-2.5">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-zinc-600 dark:text-zinc-400">Interaction Throughput</span>
                      <span className="font-mono font-semibold text-indigo-600 dark:text-cyan-400 tabular-nums">
                        99.4%
                      </span>
                    </div>
                    <div className="flex items-end gap-1.5 h-16 pt-2">
                      {[42, 68, 54, 82, 76, 94, 88, 98].map((height, i) => (
                        <motion.div
                          key={i}
                          initial={{ scaleY: 0.4 }}
                          animate={{ scaleY: 1 }}
                          transition={{ delay: i * 0.03, duration: 0.2 }}
                          style={{ height: `${height}%`, transformOrigin: 'bottom' }}
                          className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-600 to-cyan-500/80"
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Interactive Controls inside Hero Widget */}
              <div className="pt-3 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between gap-3 text-xs">
                <button
                  type="button"
                  onClick={() => setCompactDensity((d) => !d)}
                  className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                >
                  <SlidersHorizontal className="w-3.5 h-3.5" />
                  <span>{compactDensity ? 'Compact Density' : 'Balanced Spacing'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLiveNotifications((n) => !n)}
                  className="inline-flex items-center gap-1.5 text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                >
                  <span
                    className={`w-4 h-4 rounded flex items-center justify-center border ${
                      liveNotifications
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-zinc-400 dark:border-zinc-600'
                    }`}
                  >
                    {liveNotifications && <Check className="w-3 h-3" />}
                  </span>
                  <span>Live Telemetry</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Workspace Tab & Global Use-Case Sync Toolbar */}
        <div
          id="showcase-workspace"
          className="mt-8 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 p-3 rounded-2xl border border-zinc-200/80 dark:border-white/10 bg-white/90 dark:bg-[#18181B]/90 backdrop-blur-md"
        >
          {/* Primary Section Tabs: Layout vs Interactive UI */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-zinc-100 dark:bg-[#09090B] border border-zinc-200/60 dark:border-white/10">
            <button
              type="button"
              onClick={() => setActiveSection('layout')}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeSection === 'layout'
                  ? 'text-white'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {activeSection === 'layout' && (
                <motion.span
                  layoutId="mainSectionPill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-lg bg-indigo-600 shadow-sm"
                />
              )}
              <Layers className="relative z-10 w-4 h-4" />
              <span className="relative z-10">Section 1: Structural & Layout</span>
              <span className="relative z-10 font-mono text-xs opacity-80 tabular-nums">06</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveSection('interactive')}
              className={`relative flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                activeSection === 'interactive'
                  ? 'text-white'
                  : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-100'
              }`}
            >
              {activeSection === 'interactive' && (
                <motion.span
                  layoutId="mainSectionPill"
                  transition={{ type: 'spring', stiffness: 420, damping: 32 }}
                  className="absolute inset-0 rounded-lg bg-indigo-600 shadow-sm"
                />
              )}
              <Sparkles className="relative z-10 w-4 h-4" />
              <span className="relative z-10">Section 2: Interactive & UI</span>
              <span className="relative z-10 font-mono text-xs opacity-80 tabular-nums">10</span>
            </button>
          </div>

          {/* Global Use-Case Sync Preset */}
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400 px-1 whitespace-nowrap">
              Global Use-Case Sync:
            </span>
            <div className="flex flex-wrap items-center gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-[#09090B] border border-zinc-200/60 dark:border-white/10">
              {presets.map((preset) => {
                const active = globalUseCase === preset.id;
                return (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setGlobalUseCase(preset.id)}
                    className={`px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                      active
                        ? 'bg-white dark:bg-zinc-800 text-indigo-600 dark:text-cyan-400 shadow-sm'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    {preset.label}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
