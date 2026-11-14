import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Layers,
  ShoppingBag,
  SlidersHorizontal,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Pause,
  Play,
  Quote,
} from 'lucide-react';
import { useShowcase } from '../../context/ShowcaseContext';
import { COMPONENT_DIRECTORY, STUDIO_MEDIA } from '../../data/showcaseData';
import { AnatomyFrame } from '../AnatomyFrame';
import { StudioImage } from '../StudioImage';

const PRODUCT_SLIDES = [
  {
    id: 'slide-1',
    title: 'Monolith K75 Rotary Keyboard',
    category: 'Input Hardware · CNC Aluminum',
    description:
      'Gasket-mounted 75% chassis with precision knurled rotary encoder and matte PBT keycaps.',
    metric: '$219.00 · In Stock',
    image: STUDIO_MEDIA.keyboard,
  },
  {
    id: 'slide-2',
    title: 'Aetheris M1 Reference Headphones',
    category: 'Studio Audio · Planar Magnetic',
    description:
      'Open-stage acoustic architecture milled from aerospace-grade brushed aluminum and memory lambskin.',
    metric: '$389.00 · Limited Batch',
    image: STUDIO_MEDIA.headphones,
  },
  {
    id: 'slide-3',
    title: 'Atelier L4 CNC Task Lamp',
    category: 'Architectural Lighting · 97 CRI',
    description:
      'Counterbalanced dual-arm desktop luminaire with stepless dimming dial and warm 3000K optics.',
    metric: '$265.00 · Ships Worldwide',
    image: STUDIO_MEDIA.lamp,
  },
];

const TESTIMONIAL_SLIDES = [
  {
    id: 'test-1',
    name: 'Kenji Watanabe',
    role: 'Principal Design Architect · Northstar Systems',
    quote:
      'Consolidating our structural grids and interactive primitives cut front-end review cycles by 42% across four product squads.',
    outcome: '42% faster UI shipping in Q3',
  },
  {
    id: 'test-2',
    name: 'Hannah Lindstrom',
    role: 'VP of Product · Atelier Commerce',
    quote:
      'Replacing static component screenshots with live X-Ray anatomy sandboxes eliminated handoff ambiguity between design and engineering.',
    outcome: 'Zero layout regression bugs post-launch',
  },
  {
    id: 'test-3',
    name: 'Devon Alverez',
    role: 'Staff Frontend Engineer · MetricFlow',
    quote:
      'Tabular numeric discipline and keyboard-first Command Palette patterns transformed our enterprise console usability scores.',
    outcome: '+31% task completion speed',
  },
];

export function OverlaysAndCarouselDemo() {
  const { setGlassModalOpen, openDrawer, setCookieBannerVisible, cookieBannerVisible } =
    useShowcase();

  // 12. Carousel state
  const [carouselMode, setCarouselMode] = useState<'products' | 'testimonials'>('products');
  const [slideIdx, setSlideIdx] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);
  const [pausedHover, setPausedHover] = useState(false);

  const slidesCount =
    carouselMode === 'products' ? PRODUCT_SLIDES.length : TESTIMONIAL_SLIDES.length;

  useEffect(() => {
    setSlideIdx(0);
  }, [carouselMode]);

  useEffect(() => {
    if (!autoPlay || pausedHover) return;
    const timer = window.setInterval(() => {
      setSlideIdx((prev) => (prev + 1) % slidesCount);
    }, 4500);
    return () => window.clearInterval(timer);
  }, [autoPlay, pausedHover, slidesCount]);

  const meta11 = COMPONENT_DIRECTORY.find((c) => c.id === 'modals-drawers')!;
  const meta12 = COMPONENT_DIRECTORY.find((c) => c.id === 'carousels-sliders')!;

  return (
    <div className="space-y-8">
      {/* 11. Modals, Drawers & Pop-ups */}
      <AnatomyFrame meta={meta11}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <button
            type="button"
            onClick={() => setGlassModalOpen(true)}
            className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-4 text-left hover:border-indigo-500/60 transition-colors space-y-2 cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-cyan-400 w-fit">
              <Layers className="w-4 h-4" />
            </div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              Glassmorphic Modal
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Center dialog with backdrop blur and focus containment.
            </p>
          </button>

          <button
            type="button"
            onClick={() => openDrawer('cart')}
            className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-4 text-left hover:border-indigo-500/60 transition-colors space-y-2 cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-cyan-400 w-fit">
              <ShoppingBag className="w-4 h-4" />
            </div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              Slide-Over Cart Drawer
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Live shopping bag with quantity steppers and checkout flow.
            </p>
          </button>

          <button
            type="button"
            onClick={() => openDrawer('settings')}
            className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-4 text-left hover:border-indigo-500/60 transition-colors space-y-2 cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-cyan-400 w-fit">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              Settings Drawer
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Right-edge preferences drawer synced with global state.
            </p>
          </button>

          <button
            type="button"
            onClick={() => setCookieBannerVisible(!cookieBannerVisible)}
            className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-4 text-left hover:border-indigo-500/60 transition-colors space-y-2 cursor-pointer"
          >
            <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-600 dark:text-cyan-400 w-fit">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <p className="text-sm font-semibold text-zinc-900 dark:text-white">
              Cookie / GDPR Banner
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              {cookieBannerVisible ? 'Click to hide simulated banner' : 'Click to simulate compliance banner'}
            </p>
          </button>
        </div>
      </AnatomyFrame>

      {/* 12. Carousels & Sliders */}
      <AnatomyFrame
        meta={meta12}
        rightSlot={
          <div className="flex items-center gap-2">
            <div className="inline-flex p-1 rounded-lg bg-zinc-100 dark:bg-zinc-900 border border-zinc-200 dark:border-white/10">
              <button
                type="button"
                onClick={() => setCarouselMode('products')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer ${
                  carouselMode === 'products'
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                    : 'text-zinc-500 dark:text-zinc-400'
                }`}
              >
                Products
              </button>
              <button
                type="button"
                onClick={() => setCarouselMode('testimonials')}
                className={`px-2.5 py-1 rounded-md text-xs font-medium cursor-pointer ${
                  carouselMode === 'testimonials'
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                    : 'text-zinc-500 dark:text-zinc-400'
                }`}
              >
                Testimonials
              </button>
            </div>
            <button
              type="button"
              onClick={() => setAutoPlay((p) => !p)}
              aria-label={autoPlay ? 'Pause autoplay' : 'Play autoplay'}
              className="p-2 rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-900 text-zinc-700 dark:text-zinc-300 cursor-pointer"
            >
              {autoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
            </button>
          </div>
        }
      >
        <div
          onMouseEnter={() => setPausedHover(true)}
          onMouseLeave={() => setPausedHover(false)}
          className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] overflow-hidden"
        >
          <AnimatePresence mode="wait">
            {carouselMode === 'products' ? (
              <motion.div
                key={`prod-${slideIdx}`}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) {
                    setSlideIdx((prev) => (prev + 1) % slidesCount);
                  } else if (info.offset.x > 50) {
                    setSlideIdx((prev) => (prev - 1 + slidesCount) % slidesCount);
                  }
                }}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.22 }}
                className="grid grid-cols-1 md:grid-cols-12 items-stretch cursor-grab active:cursor-grabbing"
              >
                <div className="md:col-span-7 aspect-[16/9] md:aspect-auto md:h-64 overflow-hidden bg-zinc-900">
                  <StudioImage
                    src={PRODUCT_SLIDES[slideIdx].image}
                    alt={PRODUCT_SLIDES[slideIdx].title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="md:col-span-5 p-6 flex flex-col justify-between space-y-4">
                  <div className="space-y-2">
                    <p className="text-xs font-mono text-indigo-600 dark:text-cyan-400">
                      {PRODUCT_SLIDES[slideIdx].category}
                    </p>
                    <h4 className="font-display text-xl font-bold text-zinc-900 dark:text-white">
                      {PRODUCT_SLIDES[slideIdx].title}
                    </h4>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                      {PRODUCT_SLIDES[slideIdx].description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-3 border-t border-zinc-200 dark:border-white/10">
                    <span className="font-mono text-xs font-semibold text-zinc-900 dark:text-white tabular-nums">
                      {PRODUCT_SLIDES[slideIdx].metric}
                    </span>
                    <span className="font-mono text-[11px] text-zinc-400 tabular-nums">
                      0{slideIdx + 1} / 0{slidesCount}
                    </span>
                  </div>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key={`test-${slideIdx}`}
                drag="x"
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={(_, info) => {
                  if (info.offset.x < -50) {
                    setSlideIdx((prev) => (prev + 1) % slidesCount);
                  } else if (info.offset.x > 50) {
                    setSlideIdx((prev) => (prev - 1 + slidesCount) % slidesCount);
                  }
                }}
                initial={{ opacity: 0, x: 24 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -24 }}
                transition={{ duration: 0.22 }}
                className="p-6 sm:p-8 flex flex-col justify-between min-h-[240px] cursor-grab active:cursor-grabbing"
              >
                <div className="space-y-4 max-w-3xl">
                  <Quote className="w-6 h-6 text-indigo-500 dark:text-cyan-400 opacity-70" />
                  <p className="font-display text-lg sm:text-xl font-medium text-zinc-900 dark:text-white leading-relaxed">
                    “{TESTIMONIAL_SLIDES[slideIdx].quote}”
                  </p>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-4 pt-6 mt-4 border-t border-zinc-200 dark:border-white/10">
                  <div className="flex items-center gap-3">
                    <StudioImage
                      src={STUDIO_MEDIA.avatar}
                      alt={TESTIMONIAL_SLIDES[slideIdx].name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-zinc-900 dark:text-white">
                        {TESTIMONIAL_SLIDES[slideIdx].name}
                      </p>
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        {TESTIMONIAL_SLIDES[slideIdx].role}
                      </p>
                    </div>
                  </div>
                  <span className="font-mono text-xs font-medium text-emerald-600 dark:text-emerald-400">
                    {TESTIMONIAL_SLIDES[slideIdx].outcome}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Carousel Controls & Animated Progress Bars */}
          <div className="px-5 py-3.5 border-t border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900/80 flex items-center justify-between gap-4">
            <div className="flex-1 grid grid-cols-3 gap-2 max-w-xs">
              {Array.from({ length: slidesCount }).map((_, idx) => {
                const isActive = idx === slideIdx;
                return (
                  <button
                    key={idx}
                    type="button"
                    aria-label={`Go to slide ${idx + 1}`}
                    onClick={() => setSlideIdx(idx)}
                    className="h-1.5 rounded-full bg-zinc-200 dark:bg-zinc-800 overflow-hidden cursor-pointer"
                  >
                    {isActive && (
                      <motion.div
                        key={`prog-${slideIdx}-${autoPlay}-${pausedHover}`}
                        initial={{ scaleX: 0 }}
                        animate={{ scaleX: autoPlay && !pausedHover ? 1 : 1 }}
                        transition={{
                          duration: autoPlay && !pausedHover ? 4.5 : 0.25,
                          ease: 'linear',
                        }}
                        style={{ transformOrigin: 'left' }}
                        className="h-full bg-indigo-600 dark:bg-cyan-400"
                      />
                    )}
                  </button>
                );
              })}
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setSlideIdx((prev) => (prev - 1 + slidesCount) % slidesCount)}
                aria-label="Previous slide"
                className="p-1.5 rounded-lg border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setSlideIdx((prev) => (prev + 1) % slidesCount)}
                aria-label="Next slide"
                className="p-1.5 rounded-lg border border-zinc-200 dark:border-white/10 text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </AnatomyFrame>
    </div>
  );
}
