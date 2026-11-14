import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, ArrowRight, Github, Globe, Mail, CheckCircle2 } from 'lucide-react';
import { useShowcase } from '../context/ShowcaseContext';

export function MultiColumnFooter() {
  const { xrayMode, addToast, jumpToComponent, toggleTheme, toggleXrayMode } = useShowcase();
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    const valid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    if (!valid) {
      addToast({
        title: 'Invalid email address',
        description: 'Enter a valid email such as studio@company.com.',
        variant: 'error',
      });
      return;
    }
    setSubscribed(true);
    addToast({
      title: 'Newsletter subscription confirmed',
      description: `Pattern digest updates will be sent to ${email.trim()}.`,
      variant: 'success',
    });
    setEmail('');
    window.setTimeout(() => setSubscribed(false), 3500);
  };

  return (
    <footer
      id="modern-footer"
      className={`relative mt-16 border-t transition-colors duration-200 ${
        xrayMode
          ? 'border-2 border-dashed border-blue-500/75 bg-blue-500/[0.03]'
          : 'border-zinc-200 dark:border-white/10 bg-white dark:bg-[#0D0D10]'
      }`}
    >
      <AnimatePresence>
        {xrayMode && (
          <motion.div
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            className="absolute -top-3.5 left-8 z-20 inline-flex items-center gap-2 rounded-full bg-blue-600 text-white px-3 py-1 text-xs font-mono font-medium shadow-md border border-blue-400/50"
          >
            <Layers className="w-3.5 h-3.5" />
            <span>Category 1: Structural Layout · 06. Multi-Column Modern Footer</span>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10">
          {/* Brand & Status Column */}
          <div className="lg:col-span-4 space-y-4">
            <a
              href="#top"
              className="font-display text-lg font-bold tracking-tight text-zinc-900 dark:text-white inline-block"
            >
              ComponentVerse
            </a>
            <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed max-w-sm">
              Component 06 — Multi-Column Modern Footer combining structured sitemaps,
              validated newsletter capture, and operational status clarity.
            </p>
            <div className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 px-3 py-1.5 text-xs text-zinc-700 dark:text-zinc-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
              <span>All systems operational · 99.98% uptime</span>
            </div>
          </div>

          {/* Sitemap Columns */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">
              Structural Layout
            </h4>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <button
                  type="button"
                  onClick={() => jumpToComponent('layout', 'sticky-header')}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Smart Sticky Header
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => jumpToComponent('layout', 'navigation-suite')}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Navigation Suite
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => jumpToComponent('layout', 'asymmetric-bento')}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Asymmetric Bento
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => jumpToComponent('layout', 'collapsible-sidebar')}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Collapsible Sidebar
                </button>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">
              Interactive UI
            </h4>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <button
                  type="button"
                  onClick={() => jumpToComponent('interactive', 'smart-cards')}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Smart Cards
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => jumpToComponent('interactive', 'modern-forms')}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Modern Forms
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => jumpToComponent('interactive', 'data-tables')}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Data Tables
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => jumpToComponent('interactive', 'pagination-infinite')}
                  className="hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer text-left"
                >
                  Pagination & Scroll
                </button>
              </li>
            </ul>
          </div>

          {/* Newsletter Signup Column */}
          <div className="lg:col-span-4 space-y-3">
            <h4 className="text-xs font-semibold tracking-wide text-zinc-900 dark:text-zinc-100">
              Pattern Digest Newsletter
            </h4>
            <p className="text-xs text-zinc-600 dark:text-zinc-400">
              Submit your email to test live validation and instant toast feedback.
            </p>
            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
              <label htmlFor="footer-newsletter" className="sr-only">
                Email address
              </label>
              <input
                id="footer-newsletter"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="architect@studio.dev"
                className="flex-1 min-w-0 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 px-3.5 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/60"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center gap-1.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap shrink-0 cursor-pointer"
              >
                <span>{subscribed ? 'Subscribed' : 'Subscribe'}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={toggleTheme}
                className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white underline-offset-4 hover:underline cursor-pointer"
              >
                Toggle Theme
              </button>
              <span className="text-zinc-300 dark:text-zinc-700">·</span>
              <button
                type="button"
                onClick={toggleXrayMode}
                className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white underline-offset-4 hover:underline cursor-pointer"
              >
                Toggle X-Ray
              </button>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-zinc-200 dark:border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-zinc-500 dark:text-zinc-400">
          <p>© 2026 ComponentVerse Showcase. Built for design system exploration.</p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() =>
                addToast({
                  title: 'Documentation link copied',
                  description: 'ComponentVerse architecture spec URL ready.',
                  variant: 'info',
                })
              }
              aria-label="Copy repository link"
              className="p-2 rounded-lg border border-zinc-200 dark:border-white/10 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <Github className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                addToast({
                  title: 'Design System Portal',
                  description: 'Viewing ComponentVerse live workspace.',
                  variant: 'info',
                })
              }
              aria-label="Design system portal"
              className="p-2 rounded-lg border border-zinc-200 dark:border-white/10 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <Globe className="w-4 h-4" />
            </button>
            <button
              type="button"
              onClick={() =>
                addToast({
                  title: 'Contact studio',
                  description: 'hello@componentverse.dev copied to clipboard.',
                  variant: 'success',
                })
              }
              aria-label="Contact email"
              className="p-2 rounded-lg border border-zinc-200 dark:border-white/10 hover:text-zinc-900 dark:hover:text-white transition-colors cursor-pointer"
            >
              <Mail className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
