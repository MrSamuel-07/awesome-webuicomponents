import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Layers, Sparkles } from 'lucide-react';
import { useShowcase } from '../context/ShowcaseContext';
import { ComponentMeta, UseCaseId, USE_CASE_LABELS } from '../data/showcaseData';

interface AnatomyFrameProps {
  meta: ComponentMeta;
  children: React.ReactNode;
  useCase?: UseCaseId;
  onUseCaseChange?: (id: UseCaseId) => void;
  availableUseCases?: UseCaseId[];
  rightSlot?: React.ReactNode;
}

export function AnatomyFrame({
  meta,
  children,
  useCase,
  onUseCaseChange,
  availableUseCases,
  rightSlot,
}: AnatomyFrameProps) {
  const { xrayMode, globalUseCase } = useShowcase();
  const isLayout = meta.category === 'layout';

  return (
    <section
      id={meta.id}
      className={`relative scroll-mt-24 rounded-2xl transition-colors duration-200 p-5 sm:p-7 ${
        xrayMode
          ? isLayout
            ? 'border-2 border-dashed border-blue-500/75 bg-blue-500/[0.03] dark:bg-blue-500/[0.04]'
            : 'border-2 border-dashed border-purple-500/75 bg-purple-500/[0.03] dark:bg-purple-500/[0.04]'
          : 'border border-zinc-200/80 dark:border-white/10 bg-white dark:bg-[#18181B]'
      }`}
    >
      {/* Floating X-Ray Pill Badge */}
      <AnimatePresence>
        {xrayMode && (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -6, scale: 0.96 }}
            transition={{ duration: 0.16 }}
            className={`absolute -top-3.5 left-5 z-20 inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-mono font-medium shadow-md border ${
              isLayout
                ? 'bg-blue-600 text-white border-blue-400/50'
                : 'bg-purple-600 text-white border-purple-400/50'
            }`}
          >
            {isLayout ? <Layers className="w-3.5 h-3.5 shrink-0" /> : <Sparkles className="w-3.5 h-3.5 shrink-0" />}
            <span className="whitespace-nowrap">
              {isLayout ? 'Category 1: Structural Layout' : 'Category 2: Interactive UI'}
            </span>
            <span className="hidden md:inline text-white/80 font-sans font-normal border-l border-white/25 pl-2">
              {meta.xrayExplanation}
            </span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Component Header & Use-Case Controls */}
      <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 pb-5 mb-6 border-b border-zinc-200/80 dark:border-white/10">
        <div className="space-y-1.5 max-w-2xl">
          <div className="flex items-center gap-2.5">
            <span className="font-mono text-xs font-medium text-indigo-600 dark:text-cyan-400 tabular-nums">
              {meta.number}
            </span>
            <h3 className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {meta.title}
            </h3>
          </div>
          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            {meta.summary}
          </p>
          <p className="text-xs text-zinc-500 dark:text-zinc-400 pt-0.5">
            <span className="font-medium text-zinc-700 dark:text-zinc-300">Best for:</span>{' '}
            {meta.bestFor}
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2 shrink-0">
          {availableUseCases && useCase && onUseCaseChange && (
            <div className="inline-flex items-center p-1 rounded-lg bg-zinc-100 dark:bg-zinc-900/90 border border-zinc-200 dark:border-white/10">
              {availableUseCases.map((uc) => {
                const active = useCase === uc;
                return (
                  <button
                    key={uc}
                    type="button"
                    onClick={() => onUseCaseChange(uc)}
                    className={`px-2.5 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                      active
                        ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                        : 'text-zinc-600 dark:text-zinc-400 hover:text-zinc-900 dark:hover:text-zinc-200'
                    }`}
                  >
                    {USE_CASE_LABELS[uc]}
                  </button>
                );
              })}
              {globalUseCase !== 'custom' && (
                <span className="ml-1.5 pr-1.5 text-[11px] font-mono text-indigo-600 dark:text-cyan-400 whitespace-nowrap">
                  Synced
                </span>
              )}
            </div>
          )}
          {rightSlot}
        </div>
      </div>

      {/* Interactive Sandbox Canvas */}
      <div>{children}</div>
    </section>
  );
}
