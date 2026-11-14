import React, { useState, useMemo } from 'react';
import {
  Eye,
  EyeOff,
  Check,
  ChevronDown,
  Calendar,
  UploadCloud,
  X,
  Search,
  Command,
  CornerDownLeft,
  Image as ImageIcon,
} from 'lucide-react';
import { useShowcase } from '../../context/ShowcaseContext';
import { COMPONENT_DIRECTORY, STUDIO_MEDIA } from '../../data/showcaseData';
import { AnatomyFrame } from '../AnatomyFrame';

const STACK_OPTIONS = [
  'React 19 + Tailwind v4',
  'Next.js App Router',
  'Remix Full-Stack',
  'Astro Islands',
  'Vite + Motion',
  'Radix Primitives',
];

export function FormsAndSearchDemo() {
  const { setCommandPaletteOpen, jumpToComponent, addToast } = useShowcase();

  // 09. Form states
  const [fullName, setFullName] = useState('Clara Lindholm');
  const [email, setEmail] = useState('clara@studio.dev');
  const [password, setPassword] = useState('Studio#2026');
  const [showPw, setShowPw] = useState(false);

  const [autoDeploy, setAutoDeploy] = useState(true);
  const [strictA11y, setStrictA11y] = useState(true);
  const [radioEnv, setRadioEnv] = useState<'production' | 'staging' | 'preview'>('production');

  // Searchable custom dropdown
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownQuery, setDropdownQuery] = useState('');
  const [selectedStack, setSelectedStack] = useState(STACK_OPTIONS[0]);

  // Date selector
  const [datePickerOpen, setDatePickerOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(14);

  // Drag & Drop File Uploader
  const [dragActive, setDragActive] = useState(false);
  const [uploadedPreview, setUploadedPreview] = useState<{
    name: string;
    size: string;
    url: string;
  } | null>(null);

  // 10. Inline Autocomplete state
  const [inlineQuery, setInlineQuery] = useState('');
  const [inlineIndex, setInlineIndex] = useState(0);
  const [inlineFocused, setInlineFocused] = useState(false);

  // Password strength calculation
  const pwStrength = useMemo(() => {
    let score = 0;
    if (password.length >= 8) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return score;
  }, [password]);

  const filteredStacks = STACK_OPTIONS.filter((s) =>
    s.toLowerCase().includes(dropdownQuery.toLowerCase())
  );

  const handleFile = (file: File) => {
    if (!file.type.startsWith('image/')) {
      addToast({
        title: 'Unsupported file type',
        description: 'Please upload a PNG, JPG, or WebP image file.',
        variant: 'error',
      });
      return;
    }
    const url = URL.createObjectURL(file);
    setUploadedPreview({
      name: file.name,
      size: `${Math.max(1, Math.round(file.size / 1024))} KB`,
      url,
    });
    addToast({
      title: 'Image preview ready',
      description: file.name,
      variant: 'success',
    });
  };

  const inlineMatches = useMemo(() => {
    const q = inlineQuery.trim().toLowerCase();
    if (!q) return COMPONENT_DIRECTORY.slice(0, 5);
    return COMPONENT_DIRECTORY.filter(
      (c) =>
        c.title.toLowerCase().includes(q) ||
        c.bestFor.toLowerCase().includes(q) ||
        c.category.toLowerCase().includes(q)
    ).slice(0, 6);
  }, [inlineQuery]);

  const meta09 = COMPONENT_DIRECTORY.find((c) => c.id === 'modern-forms')!;
  const meta10 = COMPONENT_DIRECTORY.find((c) => c.id === 'command-palette')!;

  return (
    <div className="space-y-8">
      {/* 09. Modern Forms & Inputs */}
      <AnatomyFrame meta={meta09}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Floating Labels, Password Meter, Controls */}
          <div className="lg:col-span-6 space-y-5">
            {/* Floating Label Inputs */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              <div className="relative">
                <input
                  id="float-name"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder=" "
                  className="peer w-full rounded-xl border border-zinc-200 dark:border-white/15 bg-zinc-50 dark:bg-[#09090B] px-3.5 pt-5 pb-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <label
                  htmlFor="float-name"
                  className="pointer-events-none absolute left-3.5 top-2 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-indigo-500"
                >
                  Full Name
                </label>
              </div>

              <div className="relative">
                <input
                  id="float-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder=" "
                  className="peer w-full rounded-xl border border-zinc-200 dark:border-white/15 bg-zinc-50 dark:bg-[#09090B] px-3.5 pt-5 pb-2 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <label
                  htmlFor="float-email"
                  className="pointer-events-none absolute left-3.5 top-2 text-[11px] font-medium text-zinc-500 dark:text-zinc-400 transition-all peer-placeholder-shown:top-3.5 peer-placeholder-shown:text-sm peer-focus:top-2 peer-focus:text-[11px] peer-focus:text-indigo-500"
                >
                  Work Email
                </label>
              </div>
            </div>

            {/* Password Input + Strength Meter */}
            <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-4 space-y-2.5">
              <div className="flex items-center justify-between text-xs">
                <label htmlFor="pw-meter" className="font-medium text-zinc-800 dark:text-zinc-200">
                  Password Strength Meter
                </label>
                <span className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                  {pwStrength <= 1
                    ? 'Weak'
                    : pwStrength === 2
                    ? 'Fair'
                    : pwStrength === 3
                    ? 'Strong'
                    : 'Excellent'}
                </span>
              </div>
              <div className="relative">
                <input
                  id="pw-meter"
                  type={showPw ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full rounded-lg border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 px-3 py-2 pr-10 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPw((v) => !v)}
                  aria-label={showPw ? 'Hide password' : 'Show password'}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-900 dark:hover:text-white cursor-pointer"
                >
                  {showPw ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              <div className="grid grid-cols-4 gap-1.5 pt-1">
                {[1, 2, 3, 4].map((seg) => (
                  <div
                    key={seg}
                    className={`h-1.5 rounded-full transition-colors ${
                      pwStrength >= seg
                        ? pwStrength <= 1
                          ? 'bg-rose-500'
                          : pwStrength === 2
                          ? 'bg-amber-500'
                          : 'bg-emerald-500'
                        : 'bg-zinc-200 dark:bg-zinc-800'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Custom Toggle, Checkbox & Radio Group */}
            <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-4 space-y-4">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-semibold text-zinc-900 dark:text-white">
                    Custom Toggle Switch
                  </p>
                  <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                    Automatic preview deployments on push
                  </p>
                </div>
                <button
                  type="button"
                  role="switch"
                  aria-checked={autoDeploy}
                  onClick={() => setAutoDeploy((v) => !v)}
                  className={`relative w-11 h-6 rounded-full transition-colors cursor-pointer shrink-0 ${
                    autoDeploy ? 'bg-indigo-600' : 'bg-zinc-300 dark:bg-zinc-700'
                  }`}
                >
                  <span
                    className={`block w-4 h-4 rounded-full bg-white shadow transform transition-transform ${
                      autoDeploy ? 'translate-x-6' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>

              <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-zinc-200 dark:border-white/10">
                <button
                  type="button"
                  onClick={() => setStrictA11y((v) => !v)}
                  className="inline-flex items-center gap-2 text-xs text-zinc-800 dark:text-zinc-200 cursor-pointer"
                >
                  <span
                    className={`w-4 h-4 rounded flex items-center justify-center border transition-colors ${
                      strictA11y
                        ? 'bg-indigo-600 border-indigo-600 text-white'
                        : 'border-zinc-400 dark:border-zinc-600'
                    }`}
                  >
                    {strictA11y && <Check className="w-3 h-3" />}
                  </span>
                  <span>Strict WCAG AA Check</span>
                </button>

                <div className="flex items-center gap-3">
                  {(['production', 'staging', 'preview'] as const).map((env) => (
                    <button
                      key={env}
                      type="button"
                      onClick={() => setRadioEnv(env)}
                      className="inline-flex items-center gap-1.5 text-xs capitalize text-zinc-700 dark:text-zinc-300 cursor-pointer"
                    >
                      <span
                        className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                          radioEnv === env
                            ? 'border-indigo-600'
                            : 'border-zinc-400 dark:border-zinc-600'
                        }`}
                      >
                        {radioEnv === env && (
                          <span className="w-2 h-2 rounded-full bg-indigo-600" />
                        )}
                      </span>
                      <span>{env}</span>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Searchable Dropdown, Date Picker, Drag & Drop File Uploader */}
          <div className="lg:col-span-6 space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {/* Searchable Custom Dropdown */}
              <div className="relative">
                <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Searchable Dropdown
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setDropdownOpen((o) => !o);
                    setDatePickerOpen(false);
                  }}
                  className="w-full flex items-center justify-between gap-2 rounded-xl border border-zinc-200 dark:border-white/15 bg-zinc-50 dark:bg-[#09090B] px-3.5 py-2.5 text-xs font-medium text-zinc-900 dark:text-white cursor-pointer"
                >
                  <span className="truncate">{selectedStack}</span>
                  <ChevronDown className="w-4 h-4 text-zinc-400 shrink-0" />
                </button>
                {dropdownOpen && (
                  <div className="absolute z-30 mt-1.5 w-full rounded-xl border border-zinc-200 dark:border-white/15 bg-white dark:bg-zinc-900 shadow-xl p-2 space-y-1.5">
                    <input
                      type="text"
                      value={dropdownQuery}
                      onChange={(e) => setDropdownQuery(e.target.value)}
                      placeholder="Filter stack..."
                      className="w-full rounded-lg border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-zinc-950 px-2.5 py-1.5 text-xs text-zinc-900 dark:text-white focus:outline-none"
                    />
                    <div className="max-h-36 overflow-y-auto space-y-0.5">
                      {filteredStacks.map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => {
                            setSelectedStack(opt);
                            setDropdownOpen(false);
                            setDropdownQuery('');
                          }}
                          className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs cursor-pointer ${
                            selectedStack === opt
                              ? 'bg-indigo-600 text-white'
                              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Date Selector */}
              <div className="relative">
                <label className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1.5">
                  Release Date Selector
                </label>
                <button
                  type="button"
                  onClick={() => {
                    setDatePickerOpen((o) => !o);
                    setDropdownOpen(false);
                  }}
                  className="w-full flex items-center justify-between gap-2 rounded-xl border border-zinc-200 dark:border-white/15 bg-zinc-50 dark:bg-[#09090B] px-3.5 py-2.5 text-xs font-mono text-zinc-900 dark:text-white cursor-pointer"
                >
                  <span>2026-11-{String(selectedDay).padStart(2, '0')}</span>
                  <Calendar className="w-4 h-4 text-zinc-400 shrink-0" />
                </button>
                {datePickerOpen && (
                  <div className="absolute right-0 z-30 mt-1.5 w-64 rounded-xl border border-zinc-200 dark:border-white/15 bg-white dark:bg-zinc-900 shadow-xl p-3">
                    <p className="text-xs font-semibold text-zinc-900 dark:text-white mb-2 text-center">
                      November 2026
                    </p>
                    <div className="grid grid-cols-7 gap-1 text-center text-[11px]">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((d, idx) => (
                        <span key={idx} className="text-zinc-400 py-0.5">
                          {d}
                        </span>
                      ))}
                      {Array.from({ length: 30 }, (_, i) => i + 1).map((day) => (
                        <button
                          key={day}
                          type="button"
                          onClick={() => {
                            setSelectedDay(day);
                            setDatePickerOpen(false);
                          }}
                          className={`py-1 rounded-md font-mono tabular-nums cursor-pointer ${
                            selectedDay === day
                              ? 'bg-indigo-600 text-white font-semibold'
                              : 'text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800'
                          }`}
                        >
                          {day}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Drag-and-Drop File Uploader with Image Preview */}
            <div
              onDragOver={(e) => {
                e.preventDefault();
                setDragActive(true);
              }}
              onDragLeave={() => setDragActive(false)}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);
                const file = e.dataTransfer.files?.[0];
                if (file) handleFile(file);
              }}
              className={`rounded-xl border-2 border-dashed p-4 transition-colors ${
                dragActive
                  ? 'border-indigo-500 bg-indigo-500/10'
                  : 'border-zinc-300 dark:border-white/15 bg-zinc-50 dark:bg-[#09090B]'
              }`}
            >
              {uploadedPreview ? (
                <div className="flex items-center gap-4">
                  <img
                    src={uploadedPreview.url}
                    alt={uploadedPreview.name}
                    className="w-16 h-16 rounded-lg object-cover border border-zinc-200 dark:border-white/10 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-zinc-900 dark:text-white truncate">
                      {uploadedPreview.name}
                    </p>
                    <p className="font-mono text-[11px] text-zinc-500 dark:text-zinc-400">
                      {uploadedPreview.size} · Image Preview Loaded
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setUploadedPreview(null)}
                    aria-label="Clear uploaded file"
                    className="p-1.5 rounded-lg text-zinc-400 hover:text-rose-500 cursor-pointer"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ) : (
                <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-600 dark:text-cyan-400 shrink-0">
                      <UploadCloud className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-zinc-900 dark:text-white">
                        Drag & drop an image or browse
                      </p>
                      <p className="text-[11px] text-zinc-500 dark:text-zinc-400">
                        Instant client-side preview (PNG, JPG, WebP)
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <label className="px-3 py-1.5 rounded-lg bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 text-xs font-medium cursor-pointer">
                      <span>Browse</span>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) handleFile(file);
                        }}
                        className="sr-only"
                      />
                    </label>
                    <button
                      type="button"
                      onClick={() =>
                        setUploadedPreview({
                          name: 'studio_keyboard_sample.jpg',
                          size: '342 KB',
                          url: STUDIO_MEDIA.keyboard,
                        })
                      }
                      className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border border-zinc-200 dark:border-white/10 text-xs text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 cursor-pointer"
                    >
                      <ImageIcon className="w-3.5 h-3.5" />
                      <span>Sample</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </AnatomyFrame>

      {/* 10. Command Palette Search (Cmd+K) & Inline Autocomplete */}
      <AnatomyFrame meta={meta10}>
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Global Cmd+K Modal Launcher */}
          <div className="lg:col-span-5 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-5 space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-indigo-600 dark:text-cyan-400">
                Global Modal Trigger
              </span>
              <div className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 font-mono text-[11px] text-zinc-700 dark:text-zinc-300">
                  ⌘
                </kbd>
                <kbd className="px-1.5 py-0.5 rounded bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-white/10 font-mono text-[11px] text-zinc-700 dark:text-zinc-300">
                  K
                </kbd>
              </div>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
              Press <span className="font-mono text-zinc-900 dark:text-zinc-200">Cmd+K</span> or{' '}
              <span className="font-mono text-zinc-900 dark:text-zinc-200">Ctrl+K</span> anywhere on the
              page to search all 16 components, toggle X-Ray Mode, or switch Dark/Light themes.
            </p>
            <button
              type="button"
              onClick={() => setCommandPaletteOpen(true)}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold cursor-pointer"
            >
              <Command className="w-4 h-4" />
              <span>Launch Command Palette</span>
            </button>
          </div>

          {/* Inline Autocomplete Search Bar with Keyboard Navigation */}
          <div className="lg:col-span-7 rounded-xl border border-zinc-200 dark:border-white/10 bg-zinc-50 dark:bg-[#09090B] p-5 space-y-3">
            <label
              htmlFor="inline-autocomplete"
              className="block text-xs font-mono text-indigo-600 dark:text-cyan-400"
            >
              Inline Autocomplete Search (↑ ↓ Enter)
            </label>
            <div className="relative">
              <Search className="w-4 h-4 text-zinc-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                id="inline-autocomplete"
                type="text"
                value={inlineQuery}
                onFocus={() => setInlineFocused(true)}
                onBlur={() => window.setTimeout(() => setInlineFocused(false), 150)}
                onChange={(e) => {
                  setInlineQuery(e.target.value);
                  setInlineIndex(0);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'ArrowDown') {
                    e.preventDefault();
                    setInlineIndex((i) =>
                      inlineMatches.length ? (i + 1) % inlineMatches.length : 0
                    );
                  } else if (e.key === 'ArrowUp') {
                    e.preventDefault();
                    setInlineIndex((i) =>
                      inlineMatches.length
                        ? (i - 1 + inlineMatches.length) % inlineMatches.length
                        : 0
                    );
                  } else if (e.key === 'Enter' && inlineMatches[inlineIndex]) {
                    const target = inlineMatches[inlineIndex];
                    jumpToComponent(target.category, target.id);
                    setInlineQuery(target.title);
                  }
                }}
                placeholder="Type 'table', 'modal', 'carousel', or 'sidebar'..."
                className="w-full rounded-xl border border-zinc-200 dark:border-white/15 bg-white dark:bg-zinc-900 pl-10 pr-4 py-2.5 text-sm text-zinc-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <div className="rounded-xl border border-zinc-200 dark:border-white/10 bg-white dark:bg-zinc-900 divide-y divide-zinc-200/70 dark:divide-white/5 overflow-hidden">
              {inlineMatches.length === 0 ? (
                <p className="p-3 text-xs text-zinc-500 text-center">No matching patterns.</p>
              ) : (
                inlineMatches.map((item, idx) => {
                  const highlighted = inlineFocused && idx === inlineIndex;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onMouseEnter={() => setInlineIndex(idx)}
                      onClick={() => jumpToComponent(item.category, item.id)}
                      className={`w-full flex items-center justify-between gap-3 px-3.5 py-2.5 text-left transition-colors cursor-pointer ${
                        highlighted
                          ? 'bg-indigo-600 text-white'
                          : 'hover:bg-zinc-50 dark:hover:bg-zinc-800/70 text-zinc-800 dark:text-zinc-200'
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="text-xs font-semibold truncate">
                          {item.number}. {item.title}
                        </p>
                        <p
                          className={`text-[11px] truncate ${
                            highlighted ? 'text-indigo-100' : 'text-zinc-500 dark:text-zinc-400'
                          }`}
                        >
                          {item.bestFor}
                        </p>
                      </div>
                      <CornerDownLeft className="w-3.5 h-3.5 shrink-0 opacity-60" />
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>
      </AnatomyFrame>
    </div>
  );
}
