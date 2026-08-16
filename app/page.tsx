'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import AdContainer from '@/components/shared/AdContainer';
import Icon from '@/components/shared/Icon';
import { TOOLS, CATEGORIES, toolHref } from '@/lib/tools';

export default function Home() {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');

  useEffect(() => {
    const categoryParam = searchParams.get('category');
    if (categoryParam) setCategory(categoryParam);
  }, [searchParams]);

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return TOOLS.filter((tool) => {
      const matchesSearch =
        !q ||
        tool.name.toLowerCase().includes(q) ||
        tool.description.toLowerCase().includes(q);
      const matchesCategory = !category || tool.category === category;
      return matchesSearch && matchesCategory;
    });
  }, [search, category]);

  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-line">
        <div className="absolute inset-0 grid-veil pointer-events-none" aria-hidden="true" />
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 pt-20 pb-16 sm:pt-28 sm:pb-20">
          <div className="max-w-2xl">
            <p className="eyebrow mb-5">{TOOLS.length} tools</p>
            <h1 className="display text-[2.75rem] sm:text-6xl mb-6">
              The utilities you
              <br />
              keep googling.
            </h1>
            <p className="text-lg text-ink-muted leading-relaxed max-w-xl">
              Formatters, encoders, and converters for the small jobs that
              interrupt real work. They run inside this tab — whatever you paste
              stays on your machine.
            </p>
          </div>

          {/* Search */}
          <div className="mt-10 max-w-md relative">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-subtle pointer-events-none">
              <Icon name="search" className="w-4 h-4" />
            </span>
            <input
              type="search"
              placeholder="Search tools"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full h-11 pl-10 pr-4 rounded-xl bg-surface border border-line text-[14px] placeholder:text-ink-subtle focus:outline-none focus:border-line-strong transition-colors"
            />
          </div>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-5 sm:px-6">
        {/* Filters */}
        <div className="flex flex-wrap items-center gap-1.5 py-8">
          <button
            onClick={() => setCategory('')}
            className={`h-8 px-3 rounded-lg text-[13px] font-medium transition-colors ${
              !category
                ? 'bg-invert-bg text-invert-fg'
                : 'text-ink-muted hover:text-ink hover:bg-surface-muted'
            }`}
          >
            All
          </button>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setCategory(cat.id)}
              className={`h-8 px-3 rounded-lg text-[13px] font-medium inline-flex items-center gap-1.5 transition-colors ${
                category === cat.id
                  ? 'bg-invert-bg text-invert-fg'
                  : 'text-ink-muted hover:text-ink hover:bg-surface-muted'
              }`}
            >
              <Icon name={cat.id} className="w-3.5 h-3.5" />
              {cat.name}
            </button>
          ))}
          <span className="ml-auto font-mono text-[11px] text-ink-subtle tabular-nums">
            {filtered.length} {filtered.length === 1 ? 'tool' : 'tools'}
          </span>
        </div>

        {/* Grid */}
        {filtered.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {filtered.map((tool) => (
              <Link
                key={tool.id}
                href={toolHref(tool)}
                className="tool-card group"
              >
                <span className="text-ink-subtle group-hover:text-accent transition-colors">
                  <Icon name={tool.id} className="w-[18px] h-[18px]" />
                </span>
                <h2 className="text-[15px] font-medium tracking-tight mt-1">
                  {tool.name}
                </h2>
                <p className="text-[13px] text-ink-muted leading-relaxed">
                  {tool.description}
                </p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="py-20 text-center">
            <p className="text-ink-muted text-[14px]">
              Nothing matches “{search}”.
            </p>
            <button
              onClick={() => {
                setSearch('');
                setCategory('');
              }}
              className="btn btn-secondary btn-sm mt-4"
            >
              Clear filters
            </button>
          </div>
        )}

        {/* Ad */}
        <div className="mt-16">
          <AdContainer slot="0000000000" format="horizontal" />
        </div>

        {/* Notes — concrete claims, not badges */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-line border border-line rounded-xl overflow-hidden mt-20">
          {[
            {
              title: 'Nothing leaves the tab',
              body: 'Every tool is JavaScript running locally. There is no upload step and no server to send your input to.',
            },
            {
              title: 'No account, no limits',
              body: 'No sign-up wall, no daily quota, and no email capture before you can use a formatter.',
            },
            {
              title: 'Links carry your input',
              body: 'Most tools read from the URL, so you can share a prewired link instead of pasting instructions.',
            },
          ].map((item) => (
            <div key={item.title} className="bg-canvas p-6">
              <h3 className="text-[14px] font-medium tracking-tight mb-2">
                {item.title}
              </h3>
              <p className="text-[13px] text-ink-muted leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
