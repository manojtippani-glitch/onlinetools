'use client';

import { useState, useEffect, useRef, useMemo, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Icon from './Icon';
import { TOOLS, toolHref, categoryName, type Tool } from '@/lib/tools';
import { getRecent } from '@/lib/recent';

/**
 * Rank by where the query lands: a name that starts with it beats a name
 * that merely contains it, which beats a description match. Without this a
 * search for "json" surfaces the JSON-to-CSV converter above the formatter
 * purely on array order.
 */
function score(tool: Tool, query: string): number {
  const q = query.toLowerCase();
  const name = tool.name.toLowerCase();

  if (name === q) return 0;
  if (name.startsWith(q)) return 1;
  if (name.includes(q)) return 2;
  if (tool.id.includes(q)) return 3;
  if (tool.description.toLowerCase().includes(q)) return 4;
  return Infinity;
}

export default function CommandPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [active, setActive] = useState(0);
  const [recent, setRecent] = useState<string[]>([]);

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const results = useMemo(() => {
    if (!query.trim()) {
      const recentTools = recent
        .map((id) => TOOLS.find((t) => t.id === id))
        .filter((t): t is Tool => !!t);
      // Fall back to the first few tools so the panel is never empty.
      return recentTools.length ? recentTools : TOOLS.slice(0, 6);
    }
    return TOOLS.map((tool) => ({ tool, rank: score(tool, query) }))
      .filter(({ rank }) => rank !== Infinity)
      .sort((a, b) => a.rank - b.rank)
      .slice(0, 8)
      .map(({ tool }) => tool);
  }, [query, recent]);

  const showingRecent = !query.trim() && recent.length > 0;

  const close = useCallback(() => {
    setOpen(false);
    setQuery('');
    setActive(0);
  }, []);

  const go = useCallback(
    (tool: Tool) => {
      close();
      router.push(toolHref(tool));
    },
    [close, router]
  );

  // Global shortcut. Ignored while typing so it can't hijack a tool's input.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      const typing =
        target &&
        (target.tagName === 'INPUT' ||
          target.tagName === 'TEXTAREA' ||
          target.isContentEditable);

      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setRecent(getRecent());
        setOpen((v) => !v);
        return;
      }

      if (e.key === '/' && !typing && !open) {
        e.preventDefault();
        setRecent(getRecent());
        setOpen(true);
      }
    };

    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    setActive(0);
  }, [query]);

  // Keep the highlighted row in view when arrowing past the fold.
  useEffect(() => {
    listRef.current
      ?.querySelector<HTMLElement>(`[data-index="${active}"]`)
      ?.scrollIntoView({ block: 'nearest' });
  }, [active]);

  if (!open) return null;

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      e.preventDefault();
      close();
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActive((i) => (i + 1) % results.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActive((i) => (i - 1 + results.length) % results.length);
    } else if (e.key === 'Enter' && results[active]) {
      e.preventDefault();
      go(results[active]);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[100] flex items-start justify-center px-4 pt-[12vh]"
      role="dialog"
      aria-modal="true"
      aria-label="Search tools"
    >
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
        onClick={close}
      />

      <div
        className="relative w-full max-w-lg panel overflow-hidden shadow-2xl"
        onKeyDown={onKeyDown}
      >
        <div className="flex items-center gap-3 px-4 h-12 border-b border-line">
          <span className="text-ink-subtle shrink-0">
            <Icon name="search" className="w-4 h-4" />
          </span>
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search tools"
            className="flex-1 bg-transparent border-0 p-0 text-[14px] focus:outline-none placeholder:text-ink-subtle"
            aria-label="Search tools"
          />
          <kbd className="font-mono text-[10px] text-ink-subtle border border-line rounded px-1.5 py-0.5 shrink-0">
            esc
          </kbd>
        </div>

        <div ref={listRef} className="max-h-[19rem] overflow-y-auto p-1.5">
          {showingRecent && (
            <p className="eyebrow px-2.5 py-2">Recent</p>
          )}

          {results.length > 0 ? (
            results.map((tool, i) => (
              <button
                key={tool.id}
                data-index={i}
                onClick={() => go(tool)}
                onMouseMove={() => setActive(i)}
                className={`w-full flex items-center gap-3 px-2.5 py-2 rounded-lg text-left transition-colors ${
                  i === active ? 'bg-surface-muted' : ''
                }`}
              >
                <span
                  className={
                    i === active ? 'text-accent shrink-0' : 'text-ink-subtle shrink-0'
                  }
                >
                  <Icon name={tool.id} className="w-4 h-4" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block text-[13px] font-medium truncate">
                    {tool.name}
                  </span>
                  <span className="block text-[12px] text-ink-muted truncate">
                    {tool.description}
                  </span>
                </span>
                <span className="font-mono text-[10px] text-ink-subtle shrink-0">
                  {categoryName(tool.category)}
                </span>
              </button>
            ))
          ) : (
            <p className="px-2.5 py-8 text-center text-[13px] text-ink-subtle">
              No tool matches “{query}”.
            </p>
          )}
        </div>

        <div className="flex items-center gap-4 px-4 h-9 border-t border-line font-mono text-[10px] text-ink-subtle">
          <span>↑↓ move</span>
          <span>↵ open</span>
          <span className="ml-auto">{results.length} shown</span>
        </div>
      </div>
    </div>
  );
}
