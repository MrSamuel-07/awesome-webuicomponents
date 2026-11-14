import { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'motion/react';
import { ScanEye, Sun, Moon, Search, ShoppingBag, Menu } from 'lucide-react';
import { useShowcase } from '../context/ShowcaseContext';

export function SmartStickyHeader() {
  const {
    theme,
    toggleTheme,
    xrayMode,
    toggleXrayMode,
    activeSection,
    setActiveSection,
    setCommandPaletteOpen,
    setMobileDrawerOpen,
    openDrawer,
    cartItems,
    jumpToComponent,
  } = useShowcase();

  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, 'change', (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    setScrolled(latest > 24);
    if (latest > previous && latest > 140) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });

  const cartCount = cartItems.reduce((sum, item) => sum + item.qty, 0);

  return (
    <motion.header
      animate={{ y: hidden ? '-100%' : '0%' }}
      transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
      className={`fixed top-0 inset-x-0 z-40 transition-all duration-200 ${
        scrolled
          ? 'bg-white/80 dark:bg-[#09090B]/80 backdrop-blur-xl border-b border-zinc-200/80 dark:border-white/10 shadow-sm'
          : 'bg-transparent border-b border-transparent'
      } ${xrayMode ? 'outline-2 outline-dashed outline-blue-500/80 -outline-offset-2' : ''}`}
    >
      <div
        className={`max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4 sm:gap-8 transition-all duration-200 ${
          scrolled ? 'h-14' : 'h-16 sm:h-[72px]'
        }`}
      >
        {/* Zone 1: Brand Wordmark */}
        <div className="flex items-center gap-3 shrink-0">
          <a
            href="#top"
            className="font-display text-lg font-bold tracking-tight text-zinc-900 dark:text-white whitespace-nowrap shrink-0"
          >
            ComponentVerse
          </a>
          {xrayMode && (
            <span className="hidden xl:inline-flex items-center rounded-full bg-blue-600 text-white px-2 py-0.5 text-[11px] font-mono whitespace-nowrap">
              Cat 1 · Smart Header
            </span>
          )}
        </div>

        {/* Zone 2: Clean Single-Line Navigation Links */}
        <nav
          aria-label="Primary navigation"
          className="hidden md:flex items-center gap-6 text-sm font-medium text-zinc-600 dark:text-zinc-400"
        >
          <a
            href="#top"
            className="hover:text-zinc-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0"
          >
            Overview
          </a>
          <button
            type="button"
            onClick={() => {
              setActiveSection('layout');
              document.getElementById('showcase-workspace')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'layout'
                ? 'text-indigo-600 dark:text-cyan-400 font-semibold'
                : 'hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Structural Layout
          </button>
          <button
            type="button"
            onClick={() => {
              setActiveSection('interactive');
              document.getElementById('showcase-workspace')?.scrollIntoView({ behavior: 'smooth' });
            }}
            className={`transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
              activeSection === 'interactive'
                ? 'text-indigo-600 dark:text-cyan-400 font-semibold'
                : 'hover:text-zinc-900 dark:hover:text-white'
            }`}
          >
            Interactive UI
          </button>
          <button
            type="button"
            onClick={() => jumpToComponent('layout', 'collapsible-sidebar')}
            className="hover:text-zinc-900 dark:hover:text-white transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            Mini-App
          </button>
        </nav>

        {/* Zone 3: Floating X-Ray Toggle & Utility Actions */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Anatomy X-Ray Mode Switch */}
          <button
            type="button"
            role="switch"
            aria-checked={xrayMode}
            onClick={toggleXrayMode}
            title="Toggle Anatomy X-Ray Mode"
            className={`inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-xs font-medium border transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              xrayMode
                ? 'bg-indigo-600 text-white border-indigo-400 shadow-sm shadow-indigo-500/30'
                : 'bg-zinc-100/90 dark:bg-zinc-900/90 text-zinc-700 dark:text-zinc-200 border-zinc-200 dark:border-white/15 hover:border-indigo-500/50'
            }`}
          >
            <ScanEye className="w-3.5 h-3.5 shrink-0" />
            <span className="hidden sm:inline">X-Ray Mode</span>
            <span
              className={`font-mono text-[10px] px-1.5 py-0.2 rounded-full ${
                xrayMode
                  ? 'bg-white/20 text-white'
                  : 'bg-zinc-200 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-400'
              }`}
            >
              {xrayMode ? 'ON' : 'OFF'}
            </span>
          </button>

          {/* Cmd+K Search Trigger */}
          <button
            type="button"
            onClick={() => setCommandPaletteOpen(true)}
            aria-label="Open Command Palette"
            className="hidden sm:inline-flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-zinc-100/80 dark:bg-zinc-900/80 text-zinc-700 dark:text-zinc-300 border border-zinc-200 dark:border-white/10 hover:border-zinc-300 dark:hover:border-white/20 transition-colors whitespace-nowrap shrink-0 cursor-pointer"
          >
            <Search className="w-3.5 h-3.5" />
            <kbd className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">⌘K</kbd>
          </button>

          {/* Theme Toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            className="p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent hover:border-zinc-200 dark:hover:border-white/10 transition-colors cursor-pointer shrink-0"
          >
            {theme === 'dark' ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          {/* Bag / Drawer Trigger */}
          <button
            type="button"
            onClick={() => openDrawer('cart')}
            aria-label="Open shopping bag and settings drawer"
            className="relative p-2 rounded-lg text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 border border-transparent hover:border-zinc-200 dark:hover:border-white/10 transition-colors cursor-pointer shrink-0"
          >
            <ShoppingBag className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-indigo-600 text-white text-[10px] font-mono font-semibold flex items-center justify-center tabular-nums">
                {cartCount}
              </span>
            )}
          </button>

          {/* Mobile Hamburger Trigger */}
          <button
            type="button"
            onClick={() => setMobileDrawerOpen(true)}
            aria-label="Open mobile navigation drawer"
            className="md:hidden p-2 rounded-lg text-zinc-700 dark:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer shrink-0"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
