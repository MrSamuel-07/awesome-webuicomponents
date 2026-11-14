import React, { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Search,
  X,
  CornerDownLeft,
  Layers,
  Sparkles,
  ScanEye,
  Sun,
  Moon,
  ShoppingBag,
  Trash2,
  Plus,
  Minus,
  CheckCircle2,
  AlertTriangle,
  Info,
  XCircle,
  ShieldCheck,
  SlidersHorizontal,
} from 'lucide-react';
import { useShowcase, GlobalUseCasePreset } from '../context/ShowcaseContext';
import { COMPONENT_DIRECTORY, USE_CASE_LABELS, UseCaseId } from '../data/showcaseData';
import { StudioImage } from './StudioImage';

export function GlobalOverlays() {
  const {
    theme,
    toggleTheme,
    xrayMode,
    toggleXrayMode,
    globalUseCase,
    setGlobalUseCase,
    commandPaletteOpen,
    setCommandPaletteOpen,
    mobileDrawerOpen,
    setMobileDrawerOpen,
    drawerOpen,
    drawerTab,
    openDrawer,
    closeDrawer,
    glassModalOpen,
    setGlassModalOpen,
    cookieBannerVisible,
    setCookieBannerVisible,
    toasts,
    dismissToast,
    addToast,
    cartItems,
    updateCartQty,
    removeFromCart,
    clearCart,
    jumpToComponent,
  } = useShowcase();

  // Command Palette state
  const [cmdQuery, setCmdQuery] = useState('');
  const [cmdIndex, setCmdIndex] = useState(0);

  // Glass Modal state
  const [modalNote, setModalNote] = useState('Export Design Tokens v2');

  // Cookie Banner preferences
  const [cookieAnalytics, setCookieAnalytics] = useState(true);

  const commandItems = useMemo(() => {
    const actions = [
      {
        id: 'act-xray',
        title: xrayMode ? 'Disable Anatomy X-Ray Mode' : 'Enable Anatomy X-Ray Mode',
        subtitle: 'Overlay Category 1 & Category 2 architectural boundaries',
        group: 'Quick Actions',
        run: () => toggleXrayMode(),
      },
      {
        id: 'act-theme',
        title: `Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`,
        subtitle: 'Update global canvas and surface tokens',
        group: 'Quick Actions',
        run: () => toggleTheme(),
      },
      {
        id: 'act-cart',
        title: 'Open Shopping Bag & Settings Drawer',
        subtitle: 'Inspect slide-over drawer and live bag items',
        group: 'Quick Actions',
        run: () => openDrawer('cart'),
      },
      ...COMPONENT_DIRECTORY.map((c) => ({
        id: c.id,
        title: `${c.number}. ${c.title}`,
        subtitle: c.bestFor,
        group: c.category === 'layout' ? 'Section 1 · Structural Layout' : 'Section 2 · Interactive UI',
        run: () => jumpToComponent(c.category, c.id),
      })),
    ];

    const q = cmdQuery.trim().toLowerCase();
    if (!q) return actions;
    return actions.filter(
      (item) =>
        item.title.toLowerCase().includes(q) ||
        item.subtitle.toLowerCase().includes(q) ||
        item.group.toLowerCase().includes(q)
    );
  }, [cmdQuery, xrayMode, theme, toggleXrayMode, toggleTheme, openDrawer, jumpToComponent]);

  useEffect(() => {
    setCmdIndex(0);
  }, [cmdQuery, commandPaletteOpen]);

  const handleCmdKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setCommandPaletteOpen(false);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setCmdIndex((prev) => (commandItems.length ? (prev + 1) % commandItems.length : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setCmdIndex((prev) =>
        commandItems.length ? (prev - 1 + commandItems.length) % commandItems.length : 0
      );
    } else if (e.key === 'Enter' && commandItems[cmdIndex]) {
      e.preventDefault();
      commandItems[cmdIndex].run();
      setCommandPaletteOpen(false);
    }
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <>
      {/* 1. Command Palette (Cmd+K / Ctrl+K) */}
      <AnimatePresence>
        {commandPaletteOpen && (
          <div className="fixed inset-0 z-50 flex items-start justify-center pt-[12vh] px-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCommandPaletteOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Command Palette"
              initial={{ opacity: 0, scale: 0.96, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -10 }}
              transition={{ duration: 0.16, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-full max-w-xl rounded-2xl border border-zinc-200 dark:border-white/15 bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
              <div className="flex items-center gap-3 px-4 py-3.5 border-b border-zinc-200 dark:border-white/10">
                <Search className="w-4 h-4 text-indigo-500 dark:text-cyan-400 shrink-0" />
                <input
                  autoFocus
                  type="text"
                  value={cmdQuery}
                  onChange={(e) => setCmdQuery(e.target.value)}
                  onKeyDown={handleCmdKeyDown}
                  placeholder="Jump to component, toggle X-Ray Mode, or switch theme..."
                  className="w-full bg-transparent text-sm text-zinc-900 dark:text-white placeholder:text-zinc-400 focus:outline-none"
                />
                <button
                  type="button"
                  onClick={() => setCommandPaletteOpen(false)}
                  className="p-1 rounded-md text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="max-h-80 overflow-y-auto p-2 space-y-1">
                {commandItems.length === 0 ? (
                  <div className="py-10 text-center text-sm text-zinc-500 dark:text-zinc-400">
                    No matching commands or components found.
                  </div>
                ) : (
                  commandItems.map((item, idx) => {
                    const selected = idx === cmdIndex;
                    return (
                      <button
                        key={item.id}
                        type="button"
                        onMouseEnter={() => setCmdIndex(idx)}
                        onClick={() => {
                          item.run();
                          setCommandPaletteOpen(false);
                        }}
                        className={`w-full flex items-center justify-between gap-3 px-3 py-2.5 rounded-xl text-left transition-colors cursor-pointer ${
                          selected
                            ? 'bg-indigo-600 text-white'
                            : 'text-zinc-800 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800/70'
                        }`}
                      >
                        <div className="min-w-0">
                          <p className="text-sm font-medium truncate">{item.title}</p>
                          <p
                            className={`text-xs truncate ${
                              selected ? 'text-indigo-100' : 'text-zinc-500 dark:text-zinc-400'
                            }`}
                          >
                            {item.group} · {item.subtitle}
                          </p>
                        </div>
                        {selected && <CornerDownLeft className="w-3.5 h-3.5 shrink-0 opacity-90" />}
                      </button>
                    );
                  })
                )}
              </div>

              <div className="px-4 py-2.5 border-t border-zinc-200 dark:border-white/10 bg-zinc-50/80 dark:bg-zinc-900/60 flex items-center justify-between text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
                <span>↑↓ Navigate · ↵ Execute · Esc Close</span>
                <span>{commandItems.length} results</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Mobile Slide-Over Hamburger Drawer */}
      <AnimatePresence>
        {mobileDrawerOpen && (
          <div className="fixed inset-0 z-50 flex">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileDrawerOpen(false)}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm"
            />
            <motion.aside
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 34 }}
              className="relative z-10 w-80 max-w-[85vw] h-full bg-white dark:bg-[#18181B] border-r border-zinc-200 dark:border-white/10 p-5 flex flex-col justify-between overflow-y-auto"
            >
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-zinc-200 dark:border-white/10">
                  <span className="font-display text-lg font-bold text-zinc-900 dark:text-white">
                    ComponentVerse
                  </span>
                  <button
                    type="button"
                    onClick={() => setMobileDrawerOpen(false)}
                    aria-label="Close navigation drawer"
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="space-y-2">
                  <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 px-2">
                    Sections
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      jumpToComponent('layout', 'sticky-header');
                      setMobileDrawerOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    <Layers className="w-4 h-4 text-blue-500" />
                    <span>Section 1 · Structural Layout</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      jumpToComponent('interactive', 'buttons-ctas');
                      setMobileDrawerOpen(false);
                    }}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-zinc-800 dark:text-zinc-100 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 text-purple-500" />
                    <span>Section 2 · Interactive UI</span>
                  </button>
                </div>

                <div className="space-y-2 pt-2 border-t border-zinc-200 dark:border-white/10">
                  <p className="text-xs font-mono text-zinc-500 dark:text-zinc-400 px-2">
                    Quick Jump
                  </p>
                  <div className="space-y-1 max-h-60 overflow-y-auto">
                    {COMPONENT_DIRECTORY.map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => {
                          jumpToComponent(c.category, c.id);
                          setMobileDrawerOpen(false);
                        }}
                        className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 text-left cursor-pointer"
                      >
                        <span className="font-mono text-indigo-500 dark:text-cyan-400">
                          {c.number}
                        </span>
                        <span className="truncate">{c.title}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-zinc-200 dark:border-white/10 flex items-center justify-between gap-2">
                <button
                  type="button"
                  onClick={toggleXrayMode}
                  className={`flex-1 inline-flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-medium border cursor-pointer ${
                    xrayMode
                      ? 'bg-indigo-600 text-white border-indigo-500'
                      : 'bg-zinc-100 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-white/10'
                  }`}
                >
                  <ScanEye className="w-3.5 h-3.5" />
                  <span>X-Ray {xrayMode ? 'ON' : 'OFF'}</span>
                </button>
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="p-2 rounded-xl bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-200 cursor-pointer"
                >
                  {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
                </button>
              </div>
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Slide-Over Shopping Cart & Preferences Drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <div className="fixed inset-0 z-50 flex justify-end">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={closeDrawer}
              className="fixed inset-0 bg-black/55 backdrop-blur-sm"
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Slide-over drawer"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 360, damping: 34 }}
              className="relative z-10 w-full max-w-md h-full bg-white dark:bg-[#18181B] border-l border-zinc-200 dark:border-white/10 flex flex-col justify-between shadow-2xl"
            >
              <div className="p-5 border-b border-zinc-200 dark:border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-display text-lg font-semibold text-zinc-900 dark:text-white">
                    Slide-Over Drawer
                  </h3>
                  <button
                    type="button"
                    onClick={closeDrawer}
                    aria-label="Close drawer"
                    className="p-1.5 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-1 p-1 rounded-xl bg-zinc-100 dark:bg-zinc-900">
                  <button
                    type="button"
                    onClick={() => openDrawer('cart')}
                    className={`flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      drawerTab === 'cart'
                        ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                        : 'text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Shopping Bag ({cartItems.reduce((s, i) => s + i.qty, 0)})</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => openDrawer('settings')}
                    className={`flex items-center justify-center gap-2 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                      drawerTab === 'settings'
                        ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                        : 'text-zinc-500 dark:text-zinc-400'
                    }`}
                  >
                    <SlidersHorizontal className="w-3.5 h-3.5" />
                    <span>Preferences</span>
                  </button>
                </div>
              </div>

              {drawerTab === 'cart' ? (
                <>
                  <div className="flex-1 overflow-y-auto p-5 space-y-3">
                    {cartItems.length === 0 ? (
                      <div className="py-16 text-center space-y-2">
                        <ShoppingBag className="w-8 h-8 mx-auto text-zinc-400" />
                        <p className="text-sm font-medium text-zinc-800 dark:text-zinc-200">
                          Your shopping bag is empty
                        </p>
                        <p className="text-xs text-zinc-500 dark:text-zinc-400">
                          Add items from Smart Cards or the E-Commerce Sidebar demo.
                        </p>
                      </div>
                    ) : (
                      cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex items-center gap-3 p-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900/70"
                        >
                          <StudioImage
                            src={item.image}
                            alt={item.name}
                            className="w-16 h-16 rounded-lg object-cover shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-medium text-zinc-900 dark:text-zinc-100 truncate">
                              {item.name}
                            </p>
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">{item.finish}</p>
                            <div className="flex items-center justify-between mt-2">
                              <div className="inline-flex items-center rounded-lg border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-800">
                                <button
                                  type="button"
                                  onClick={() => updateCartQty(item.id, -1)}
                                  className="p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                                  aria-label="Decrease quantity"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="px-2 text-xs font-mono tabular-nums text-zinc-900 dark:text-white">
                                  {item.qty}
                                </span>
                                <button
                                  type="button"
                                  onClick={() => updateCartQty(item.id, 1)}
                                  className="p-1 text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                                  aria-label="Increase quantity"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                              <span className="font-mono text-sm font-semibold text-zinc-900 dark:text-white tabular-nums">
                                ${(item.price * item.qty).toFixed(2)}
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeFromCart(item.id)}
                            aria-label="Remove item"
                            className="p-1.5 text-zinc-400 hover:text-rose-500 cursor-pointer"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      ))
                    )}
                  </div>

                  <div className="p-5 border-t border-zinc-200 dark:border-white/10 space-y-3 bg-zinc-50 dark:bg-zinc-900/50">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-zinc-600 dark:text-zinc-400">Subtotal</span>
                      <span className="font-mono text-base font-bold text-zinc-900 dark:text-white tabular-nums">
                        ${subtotal.toFixed(2)}
                      </span>
                    </div>
                    <button
                      type="button"
                      disabled={cartItems.length === 0}
                      onClick={() => {
                        addToast({
                          title: 'Demo checkout complete',
                          description: `Simulated order for $${subtotal.toFixed(2)} placed.`,
                          variant: 'success',
                        });
                        clearCart();
                        closeDrawer();
                      }}
                      className="w-full py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 disabled:opacity-40 text-white text-sm font-semibold transition-colors cursor-pointer"
                    >
                      Complete Simulated Checkout
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex-1 overflow-y-auto p-5 space-y-5">
                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-200 dark:border-white/10">
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">
                        Anatomy X-Ray Mode
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Show dashed layout & UI boundaries
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={toggleXrayMode}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium cursor-pointer ${
                        xrayMode
                          ? 'bg-indigo-600 text-white'
                          : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300'
                      }`}
                    >
                      {xrayMode ? 'ON' : 'OFF'}
                    </button>
                  </div>

                  <div className="flex items-center justify-between p-3.5 rounded-xl border border-zinc-200 dark:border-white/10">
                    <div>
                      <p className="text-sm font-medium text-zinc-900 dark:text-white">
                        Color Theme
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Dark Obsidian or Light Studio
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={toggleTheme}
                      className="px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-100 dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 cursor-pointer capitalize"
                    >
                      {theme}
                    </button>
                  </div>

                  <div className="space-y-2">
                    <p className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                      Global Use-Case Sync
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {(['custom', 'saas', 'ecommerce', 'media', 'admin'] as GlobalUseCasePreset[]).map(
                        (preset) => (
                          <button
                            key={preset}
                            type="button"
                            onClick={() => setGlobalUseCase(preset)}
                            className={`px-3 py-2 rounded-xl text-xs font-medium border text-left cursor-pointer ${
                              globalUseCase === preset
                                ? 'border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-cyan-400'
                                : 'border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300'
                            }`}
                          >
                            {preset === 'custom'
                              ? 'Independent'
                              : USE_CASE_LABELS[preset as UseCaseId]}
                          </button>
                        )
                      )}
                    </div>
                  </div>
                </div>
              )}
            </motion.aside>
          </div>
        )}
      </AnimatePresence>

      {/* 4. Glassmorphic Center Modal */}
      <AnimatePresence>
        {glassModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setGlassModalOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Glassmorphic dialog"
              initial={{ opacity: 0, scale: 0.94, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 12 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              className="relative z-10 w-full max-w-md rounded-2xl border border-white/20 bg-white/85 dark:bg-zinc-900/80 backdrop-blur-2xl p-6 shadow-2xl space-y-4"
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h4 className="font-display text-lg font-semibold text-zinc-900 dark:text-white">
                    Confirm Token Deployment
                  </h4>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                    Glassmorphic modal with backdrop blur, focus containment, and action feedback.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setGlassModalOpen(false)}
                  aria-label="Close modal"
                  className="p-1 rounded-lg text-zinc-500 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Release Label
                </label>
                <input
                  type="text"
                  value={modalNote}
                  onChange={(e) => setModalNote(e.target.value)}
                  className="w-full rounded-xl border border-zinc-300 dark:border-white/15 bg-white/70 dark:bg-black/40 px-3 py-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setGlassModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200/60 dark:hover:bg-white/10 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => {
                    addToast({
                      title: 'Release confirmed',
                      description: `Deployed "${modalNote}" cleanly.`,
                      variant: 'success',
                    });
                    setGlassModalOpen(false);
                  }}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-indigo-600 hover:bg-indigo-500 cursor-pointer"
                >
                  Confirm & Deploy
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* 5. Simulated Cookie / GDPR Consent Banner */}
      <AnimatePresence>
        {cookieBannerVisible && (
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 24 }}
            className="fixed bottom-4 left-4 right-4 md:left-6 md:right-auto md:max-w-lg z-40 rounded-2xl border border-zinc-200 dark:border-white/15 bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-xl p-4 shadow-2xl"
          >
            <div className="flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-indigo-600 dark:text-cyan-400 shrink-0 mt-0.5" />
              <div className="space-y-2.5 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h4 className="text-sm font-semibold text-zinc-900 dark:text-white">
                    Simulated Cookie & GDPR Preferences
                  </h4>
                  <button
                    type="button"
                    onClick={() => setCookieBannerVisible(false)}
                    className="text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  Control essential session storage and optional telemetry analytics in this simulated compliance banner.
                </p>
                <div className="flex items-center justify-between text-xs py-1">
                  <span className="text-zinc-700 dark:text-zinc-300">Performance Analytics</span>
                  <button
                    type="button"
                    onClick={() => setCookieAnalytics((v) => !v)}
                    className={`px-2.5 py-1 rounded-md font-mono text-[11px] cursor-pointer ${
                      cookieAnalytics
                        ? 'bg-indigo-600 text-white'
                        : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
                    }`}
                  >
                    {cookieAnalytics ? 'Enabled' : 'Disabled'}
                  </button>
                </div>
                <div className="flex flex-wrap items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => {
                      addToast({
                        title: 'Privacy preferences saved',
                        description: cookieAnalytics
                          ? 'Essential + Analytics enabled.'
                          : 'Essential cookies only.',
                        variant: 'info',
                      });
                      setCookieBannerVisible(false);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-medium cursor-pointer"
                  >
                    Save Preferences
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setCookieAnalytics(false);
                      addToast({
                        title: 'Essential cookies only',
                        description: 'Optional analytics declined.',
                        variant: 'info',
                      });
                      setCookieBannerVisible(false);
                    }}
                    className="px-3 py-1.5 rounded-lg border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 text-xs font-medium hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                  >
                    Reject Optional
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 6. Stacked Swipeable Toast Notifications */}
      <div
        aria-live="polite"
        className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 w-full max-w-sm pointer-events-none px-4 sm:px-0"
      >
        <AnimatePresence>
          {toasts.map((toast) => {
            const Icon =
              toast.variant === 'success'
                ? CheckCircle2
                : toast.variant === 'warning'
                ? AlertTriangle
                : toast.variant === 'error'
                ? XCircle
                : Info;
            const iconColor =
              toast.variant === 'success'
                ? 'text-emerald-500'
                : toast.variant === 'warning'
                ? 'text-amber-500'
                : toast.variant === 'error'
                ? 'text-rose-500'
                : 'text-cyan-500';

            return (
              <motion.div
                key={toast.id}
                layout
                drag="x"
                dragConstraints={{ left: 0, right: 180 }}
                dragElastic={0.4}
                onDragEnd={(_, info) => {
                  if (info.offset.x > 70 || info.velocity.x > 300) {
                    dismissToast(toast.id);
                  }
                }}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 100, scale: 0.95 }}
                transition={{ duration: 0.18 }}
                className="pointer-events-auto cursor-grab active:cursor-grabbing rounded-xl border border-zinc-200 dark:border-white/15 bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-xl p-3.5 shadow-xl flex items-start gap-3"
              >
                <Icon className={`w-4 h-4 shrink-0 mt-0.5 ${iconColor}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-zinc-900 dark:text-white">
                    {toast.title}
                  </p>
                  {toast.description && (
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-0.5">
                      {toast.description}
                    </p>
                  )}
                  <p className="text-[10px] font-mono text-zinc-400 mt-1">Swipe right to dismiss</p>
                </div>
                <button
                  type="button"
                  onClick={() => dismissToast(toast.id)}
                  aria-label="Dismiss notification"
                  className="p-1 text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </>
  );
}
