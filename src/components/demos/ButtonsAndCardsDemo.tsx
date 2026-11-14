import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import {
  Loader2,
  Check,
  Sparkles,
  Copy,
  Bookmark,
  Share2,
  Download,
  ShoppingBag,
  ArrowUpRight,
  Plus,
  Minus,
} from 'lucide-react';
import { useShowcase } from '../../context/ShowcaseContext';
import { COMPONENT_DIRECTORY, STORE_PRODUCTS, STUDIO_MEDIA } from '../../data/showcaseData';
import { AnatomyFrame } from '../AnatomyFrame';
import { StudioImage } from '../StudioImage';

export function ButtonsAndCardsDemo() {
  const { addToast, addToCart } = useShowcase();

  // 07. Buttons state
  const [magneticPos, setMagneticPos] = useState({ x: 0, y: 0 });
  const magneticRef = useRef<HTMLButtonElement>(null);
  const [deployState, setDeployState] = useState<'idle' | 'loading' | 'success'>('idle');
  const [bookmarkedBtn, setBookmarkedBtn] = useState(false);

  const handleMagneticMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left - rect.width / 2) * 0.28;
    const y = (e.clientY - rect.top - rect.height / 2) * 0.28;
    setMagneticPos({ x, y });
  };

  const triggerDeploy = () => {
    if (deployState !== 'idle') return;
    setDeployState('loading');
    window.setTimeout(() => {
      setDeployState('success');
      addToast({
        title: 'Action completed',
        description: 'Morphing CTA transitioned from loading to success.',
        variant: 'success',
      });
      window.setTimeout(() => setDeployState('idle'), 2200);
    }, 1100);
  };

  // 08. Smart Cards state
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, mx: 50, my: 50, hovering: false });
  const [selectedFinish, setSelectedFinish] = useState<'Matte Obsidian' | 'Brushed Silver'>('Matte Obsidian');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('yearly');
  const [seats, setSeats] = useState(3);
  const [planStarted, setPlanStarted] = useState(false);
  const [articleSaved, setArticleSaved] = useState(false);

  const handleTiltMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - py) * 10,
      ry: (px - 0.5) * 10,
      mx: px * 100,
      my: py * 100,
      hovering: true,
    });
  };

  const pricePerSeat = billingCycle === 'yearly' ? 23 : 29;
  const totalPlanPrice = pricePerSeat * seats;

  const meta07 = COMPONENT_DIRECTORY.find((c) => c.id === 'buttons-ctas')!;
  const meta08 = COMPONENT_DIRECTORY.find((c) => c.id === 'smart-cards')!;

  return (
    <div className="space-y-8">
      {/* 07. Buttons & CTAs */}
      <AnatomyFrame meta={meta07}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {/* Magnetic Button */}
          <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-5 flex flex-col justify-between gap-4">
            <div>
              <p className="text-xs font-mono text-indigo-600 dark:text-cyan-400">Magnetic Hover</p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                Tracks cursor offset inside bounds with spring return.
              </p>
            </div>
            <div className="flex items-center justify-center py-2">
              <motion.button
                ref={magneticRef}
                type="button"
                onMouseMove={handleMagneticMove}
                onMouseLeave={() => setMagneticPos({ x: 0, y: 0 })}
                animate={{ x: magneticPos.x, y: magneticPos.y }}
                transition={{ type: 'spring', stiffness: 320, damping: 18 }}
                onClick={() =>
                  addToast({
                    title: 'Magnetic CTA triggered',
                    description: 'Pointer-tracked spring action confirmed.',
                    variant: 'info',
                  })
                }
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-sm font-semibold shadow-lg cursor-pointer whitespace-nowrap"
              >
                <Sparkles className="w-4 h-4 text-cyan-400 dark:text-indigo-600" />
                <span>Magnetic Action</span>
              </motion.button>
            </div>
          </div>

          {/* Async Spinner -> Morphing Success Button */}
          <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-5 flex flex-col justify-between gap-4">
            <div>
              <p className="text-xs font-mono text-indigo-600 dark:text-cyan-400">
                Async Spinner → Morphing Success
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                Click to simulate async work and morph into a confirmed state.
              </p>
            </div>
            <div className="flex items-center justify-center py-2">
              <motion.button
                type="button"
                layout
                onClick={triggerDeploy}
                className={`inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-colors cursor-pointer whitespace-nowrap min-w-[168px] ${
                  deployState === 'success'
                    ? 'bg-emerald-600'
                    : 'bg-indigo-600 hover:bg-indigo-500'
                }`}
              >
                {deployState === 'idle' && <span>Publish Release</span>}
                {deployState === 'loading' && (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Publishing...</span>
                  </>
                )}
                {deployState === 'success' && (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Success!</span>
                  </>
                )}
              </motion.button>
            </div>
          </div>

          {/* Gradient Primary, Ghost Secondary & Icon Action Bar */}
          <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-5 flex flex-col justify-between gap-4">
            <div>
              <p className="text-xs font-mono text-indigo-600 dark:text-cyan-400">
                Gradient, Ghost & Icon Buttons
              </p>
              <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-1">
                Visual hierarchy pairing primary emphasis with quiet secondary triggers.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() =>
                  addToast({ title: 'Gradient CTA clicked', variant: 'info' })
                }
                className="px-4 py-2 rounded-xl text-xs font-semibold text-white bg-gradient-to-r from-indigo-600 to-cyan-500 hover:opacity-95 shadow-md shadow-indigo-500/20 cursor-pointer whitespace-nowrap"
              >
                Gradient Primary
              </button>
              <button
                type="button"
                onClick={() =>
                  addToast({ title: 'Ghost secondary clicked', variant: 'info' })
                }
                className="px-4 py-2 rounded-xl text-xs font-medium text-zinc-700 dark:text-zinc-200 border border-zinc-300 dark:border-white/15 hover:bg-zinc-200/60 dark:hover:bg-white/10 transition-colors cursor-pointer whitespace-nowrap"
              >
                Ghost Secondary
              </button>
              <div className="flex items-center gap-1.5 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    addToast({ title: 'Token CSS copied to clipboard', variant: 'success' })
                  }
                  aria-label="Copy token"
                  className="p-2 rounded-lg border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-indigo-500/50 cursor-pointer"
                >
                  <Copy className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => setBookmarkedBtn((b) => !b)}
                  aria-label="Bookmark pattern"
                  className={`p-2 rounded-lg border transition-colors cursor-pointer ${
                    bookmarkedBtn
                      ? 'border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-cyan-400'
                      : 'border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => addToast({ title: 'Share link ready', variant: 'info' })}
                  aria-label="Share pattern"
                  className="p-2 rounded-lg border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-indigo-500/50 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => addToast({ title: 'Spec PDF downloaded', variant: 'success' })}
                  aria-label="Download spec"
                  className="p-2 rounded-lg border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 hover:border-indigo-500/50 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </AnatomyFrame>

      {/* 08. Smart Cards */}
      <AnatomyFrame meta={meta08}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch">
          {/* Card 1: 3D Tilt + Cursor Spotlight E-Commerce Card */}
          <div
            onMouseMove={handleTiltMove}
            onMouseLeave={() => setTilt((t) => ({ ...t, rx: 0, ry: 0, hovering: false }))}
            style={{ perspective: 900 }}
            className="flex"
          >
            <motion.div
              animate={{ rotateX: tilt.rx, rotateY: tilt.ry }}
              transition={{ type: 'spring', stiffness: 260, damping: 24 }}
              className="relative w-full rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] overflow-hidden flex flex-col justify-between"
            >
              {/* Cursor Spotlight Glow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 transition-opacity duration-200"
                style={{
                  opacity: tilt.hovering ? 1 : 0,
                  background: `radial-gradient(280px circle at ${tilt.mx}% ${tilt.my}%, rgba(99, 102, 241, 0.18), transparent 70%)`,
                }}
              />
              <div className="relative aspect-[4/3] overflow-hidden bg-zinc-900">
                <StudioImage
                  src={STUDIO_MEDIA.headphones}
                  alt="Aetheris M1 Studio Headphones"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="relative p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Studio Audio · 3D Spotlight Card
                  </p>
                  <h4 className="font-display text-base font-semibold text-zinc-900 dark:text-white mt-1">
                    {STORE_PRODUCTS[0].name}
                  </h4>
                  <div className="flex items-center gap-2 mt-3">
                    {(['Matte Obsidian', 'Brushed Silver'] as const).map((finish) => (
                      <button
                        key={finish}
                        type="button"
                        onClick={() => setSelectedFinish(finish)}
                        className={`px-2.5 py-1 rounded-md text-[11px] font-medium border cursor-pointer ${
                          selectedFinish === finish
                            ? 'border-indigo-500 bg-indigo-500/10 text-indigo-600 dark:text-cyan-400'
                            : 'border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-400'
                        }`}
                      >
                        {finish}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-white/10">
                  <span className="font-mono text-lg font-bold text-zinc-900 dark:text-white tabular-nums">
                    ${STORE_PRODUCTS[0].price}.00
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      addToCart({
                        id: `${STORE_PRODUCTS[0].id}-${selectedFinish}`,
                        name: STORE_PRODUCTS[0].name,
                        price: STORE_PRODUCTS[0].price,
                        finish: selectedFinish,
                        image: STORE_PRODUCTS[0].image,
                      })
                    }
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Add to Bag</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Card 2: SaaS Pricing Card with Monthly/Yearly Toggle */}
          <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-5 flex flex-col justify-between space-y-5">
            <div className="space-y-4">
              <div className="flex items-center justify-between gap-2">
                <div>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">For Scaling Teams</p>
                  <h4 className="font-display text-lg font-bold text-zinc-900 dark:text-white">
                    Pro Architecture Plan
                  </h4>
                </div>
                <div className="inline-flex p-0.5 rounded-lg bg-zinc-200/80 dark:bg-zinc-800">
                  {(['monthly', 'yearly'] as const).map((cycle) => (
                    <button
                      key={cycle}
                      type="button"
                      onClick={() => setBillingCycle(cycle)}
                      className={`px-2 py-1 rounded-md text-[11px] font-medium capitalize cursor-pointer ${
                        billingCycle === cycle
                          ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white shadow-sm'
                          : 'text-zinc-600 dark:text-zinc-400'
                      }`}
                    >
                      {cycle}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="font-display text-4xl font-bold text-zinc-900 dark:text-white tabular-nums">
                  ${totalPlanPrice}
                </span>
                <span className="text-xs text-zinc-500 dark:text-zinc-400">
                  / month ({seats} seats · {billingCycle === 'yearly' ? '20% yearly savings' : 'billed monthly'})
                </span>
              </div>

              {/* Seat Stepper */}
              <div className="flex items-center justify-between p-3 rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900">
                <span className="text-xs font-medium text-zinc-700 dark:text-zinc-300">
                  Team Seats
                </span>
                <div className="inline-flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setSeats((s) => Math.max(1, s - 1))}
                    aria-label="Decrease seats"
                    className="p-1 rounded-md border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300 cursor-pointer"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="font-mono text-sm font-semibold w-6 text-center tabular-nums text-zinc-900 dark:text-white">
                    {seats}
                  </span>
                  <button
                    type="button"
                    onClick={() => setSeats((s) => Math.min(20, s + 1))}
                    aria-label="Increase seats"
                    className="p-1 rounded-md border border-zinc-200 dark:border-white/10 text-zinc-600 dark:text-zinc-300 cursor-pointer"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                {[
                  'Unlimited component sandboxes & token exports',
                  'Role-based workspace permissions & audit logs',
                  'Priority Slack channel & WCAG review',
                ].map((feat) => (
                  <li key={feat} className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>

            <button
              type="button"
              onClick={() => {
                setPlanStarted((p) => !p);
                addToast({
                  title: planStarted ? 'Trial paused' : '14-day Pro trial started',
                  description: `${seats} seats at $${totalPlanPrice}/mo (${billingCycle}).`,
                  variant: 'success',
                });
              }}
              className={`w-full py-2.5 rounded-xl text-xs font-semibold transition-colors cursor-pointer ${
                planStarted
                  ? 'bg-emerald-600 text-white'
                  : 'bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 hover:opacity-90'
              }`}
            >
              {planStarted ? 'Active Trial Selected' : 'Start 14-Day Trial'}
            </button>
          </div>

          {/* Card 3: Editorial Article Card */}
          <div className="rounded-2xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] overflow-hidden flex flex-col justify-between">
            <div className="aspect-[4/3] overflow-hidden bg-zinc-900">
              <StudioImage
                src={STUDIO_MEDIA.studio}
                alt="Editorial industrial design studio"
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-zinc-400">
                  <span>Design Engineering</span>
                  <span aria-hidden="true">·</span>
                  <span>Nov 2026</span>
                  <span aria-hidden="true">·</span>
                  <span>6 min read</span>
                </div>
                <h4 className="font-display text-base font-semibold text-zinc-900 dark:text-white mt-2 leading-snug">
                  Tactile Precision: Calibrating Micro-Interactions Under 200ms
                </h4>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 mt-2 leading-relaxed">
                  How settling curves and compositor-only animations create responsive hardware feel in browser interfaces.
                </p>
              </div>
              <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setArticleSaved((s) => !s);
                    addToast({
                      title: articleSaved ? 'Removed from bookmarks' : 'Article bookmarked',
                      variant: 'info',
                    });
                  }}
                  className={`inline-flex items-center gap-1.5 text-xs font-medium cursor-pointer ${
                    articleSaved
                      ? 'text-indigo-600 dark:text-cyan-400'
                      : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-white'
                  }`}
                >
                  <Bookmark className="w-3.5 h-3.5" />
                  <span>{articleSaved ? 'Saved' : 'Save'}</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    addToast({
                      title: 'Opening editorial essay',
                      description: 'Tactile Precision · Design Engineering Dispatch.',
                      variant: 'info',
                    })
                  }
                  className="inline-flex items-center gap-1 text-xs font-semibold text-zinc-900 dark:text-white hover:text-indigo-600 dark:hover:text-cyan-400 cursor-pointer"
                >
                  <span>Read Essay</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </AnatomyFrame>
    </div>
  );
}
