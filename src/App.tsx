import { AnimatePresence, motion } from 'motion/react';
import { Layers, Sparkles } from 'lucide-react';
import { ShowcaseProvider, useShowcase } from './context/ShowcaseContext';
import { COMPONENT_DIRECTORY } from './data/showcaseData';
import { SmartStickyHeader } from './components/SmartStickyHeader';
import { HeroSection } from './components/HeroSection';
import { StructuralSection } from './components/StructuralSection';
import { InteractiveSection } from './components/InteractiveSection';
import { MultiColumnFooter } from './components/MultiColumnFooter';
import { GlobalOverlays } from './components/GlobalOverlays';

function ShowcaseContent() {
  const { activeSection, xrayMode } = useShowcase();
  const sectionItems = COMPONENT_DIRECTORY.filter((c) => c.category === activeSection);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAFAFA] text-[#09090B] dark:bg-[#09090B] dark:text-[#FAFAFA] transition-colors duration-200">
      <SmartStickyHeader />

      <main className="flex-1">
        <HeroSection />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 space-y-6">
          {/* Quick Index Pills for Active Tab */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 py-2">
            <div className="flex items-center gap-2.5">
              {activeSection === 'layout' ? (
                <Layers className="w-4 h-4 text-blue-500 shrink-0" />
              ) : (
                <Sparkles className="w-4 h-4 text-purple-500 shrink-0" />
              )}
              <h2 className="font-display text-base sm:text-lg font-semibold text-zinc-900 dark:text-white">
                {activeSection === 'layout'
                  ? 'Section 1 — Structural & Layout Components'
                  : 'Section 2 — Interactive & UI Components'}
              </h2>
              {xrayMode && (
                <span className="font-mono text-xs text-indigo-600 dark:text-cyan-400">
                  (X-Ray Active)
                </span>
              )}
            </div>

            <nav
              aria-label="Section component index"
              className="flex flex-wrap items-center gap-1.5"
            >
              {sectionItems.map((item) => (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  className="px-2.5 py-1 rounded-lg text-xs font-mono text-zinc-600 dark:text-zinc-400 bg-white dark:bg-[#18181B] border border-zinc-200 dark:border-white/10 hover:border-indigo-500/50 hover:text-zinc-900 dark:hover:text-white transition-colors whitespace-nowrap"
                >
                  {item.number} {item.title.split(' ')[0]}
                </a>
              ))}
            </nav>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {activeSection === 'layout' ? <StructuralSection /> : <InteractiveSection />}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      <MultiColumnFooter />
      <GlobalOverlays />
    </div>
  );
}

export default function App() {
  return (
    <ShowcaseProvider>
      <ShowcaseContent />
    </ShowcaseProvider>
  );
}
