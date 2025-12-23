'use client';

import { Search, ChevronLeft, ChevronRight, ArrowUpDown } from 'lucide-react';
import { usePathname, useRouter } from '@/i18n/routing';
import { useSearchParams } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';
import { useTranslations } from 'next-intl';

export function SearchAndPagination({ totalPages }: { totalPages: number }) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const t = useTranslations('PluginList');

  const currentPage = Number(searchParams.get('page')) || 1;
  const currentSort = searchParams.get('sort') || 'newest';

  const handleSearch = useDebouncedCallback((term: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');

    if (term) {
      params.set('q', term);
    } else {
      params.delete('q');
    }
    replace(`${pathname}?${params.toString()}`);
  }, 300);

  const handleSort = (sort: string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    params.set('sort', sort);
    replace(`${pathname}?${params.toString()}`);
  };

  const handlePageChange = (direction: 'next' | 'prev') => {
    const params = new URLSearchParams(searchParams);
    const newPage = direction === 'next' ? currentPage + 1 : currentPage - 1;

    if (newPage >= 1 && newPage <= totalPages) {
      params.set('page', newPage.toString());
      replace(`${pathname}?${params.toString()}`);
    }
  };

  return (
    <div className="mb-12 flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
      {/* Campo de Busca */}
      <div className="relative w-full md:max-w-xl">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <Search className="h-5 w-5 text-muted" />
        </div>
        <input
          id="search"
          className="block w-full rounded-2xl border border-border bg-card/50 py-4 pl-12 pr-4 text-foreground placeholder-muted transition-all focus:border-accent/50 focus:bg-card focus:outline-none focus:ring-4 focus:ring-accent/10 sm:text-sm"
          placeholder={t('searchPlaceholder')}
          onChange={(e) => handleSearch(e.target.value)}
          defaultValue={searchParams.get('q')?.toString()}
        />
      </div>

      <div className="flex flex-wrap items-center gap-4">
        {/* Ordenação */}
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-4 flex items-center">
            <ArrowUpDown className="h-4 w-4 text-muted" />
          </div>
          <select
            id="sort"
            className="block w-full appearance-none rounded-2xl border border-border bg-card/50 py-4 pl-12 pr-10 text-sm font-medium text-foreground transition-all focus:border-accent/50 focus:bg-card focus:outline-none focus:ring-4 focus:ring-accent/10 md:w-56"
            value={currentSort}
            onChange={(e) => handleSort(e.target.value)}
          >
            <option value="newest">{t('sort.newest')}</option>
            <option value="downloads">{t('sort.downloads')}</option>
            <option value="stars">{t('sort.stars')}</option>
            <option value="name_asc">{t('sort.name_asc')}</option>
            <option value="name_desc">{t('sort.name_desc')}</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-4 flex items-center">
            <ChevronRight className="h-4 w-4 rotate-90 text-muted" />
          </div>
        </div>

        {/* Controles de Paginação */}
        <div className="flex items-center gap-2 rounded-2xl border border-border bg-card/50 p-1.5">
          <button
            onClick={() => handlePageChange('prev')}
            disabled={currentPage <= 1}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-muted transition-all hover:bg-accent/10 hover:text-accent disabled:opacity-20 disabled:hover:bg-transparent"
          >
            <ChevronLeft size={20} />
          </button>
          <div className="px-3 text-sm font-semibold text-foreground/80">
            {currentPage} <span className="mx-1 text-muted/50">/</span> {totalPages}
          </div>
          <button
            onClick={() => handlePageChange('next')}
            disabled={currentPage >= totalPages}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-muted transition-all hover:bg-accent/10 hover:text-accent disabled:opacity-20 disabled:hover:bg-transparent"
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </div>
  );
}
