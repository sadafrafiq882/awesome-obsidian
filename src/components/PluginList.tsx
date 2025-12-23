'use client';

import { useMemo, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { PluginCard } from './PluginCard';
import { SearchAndPagination } from './SearchAndPagination';
import { ObsidianPlugin } from '@/lib/obsidian-api';

const ITEMS_PER_PAGE = 9;

function PluginListContent({ allPlugins }: { allPlugins: ObsidianPlugin[] }) {
  const searchParams = useSearchParams();

  const query = (searchParams.get('q') || '').toLowerCase();
  const currentPage = Number(searchParams.get('page')) || 1;
  const sort = searchParams.get('sort') || 'newest';
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // Filtra os plugins localmente
  const filteredPlugins = useMemo(() => {
    return query
      ? allPlugins.filter(plugin =>
        plugin.name.toLowerCase().includes(query) ||
        plugin.description.toLowerCase().includes(query) ||
        plugin.author.toLowerCase().includes(query)
      )
      : allPlugins;
  }, [allPlugins, query]);

  // Ordenação
  const sortedPlugins = useMemo(() => {
    return [...filteredPlugins].sort((a, b) => {
      if (sort === 'name_asc') return a.name.localeCompare(b.name);
      if (sort === 'name_desc') return b.name.localeCompare(a.name);
      if (sort === 'downloads') return (b.downloads || 0) - (a.downloads || 0);
      if (sort === 'stars') return (b.stars || 0) - (a.stars || 0);
      return (b.updated || 0) - (a.updated || 0);
    });
  }, [filteredPlugins, sort]);

  const totalItems = sortedPlugins.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const data = sortedPlugins.slice(offset, offset + ITEMS_PER_PAGE);

  return (
    <>
      <SearchAndPagination totalPages={totalPages} />
      {data.length > 0 ? (
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.map((plugin) => (
            <PluginCard key={plugin.id} plugin={plugin} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 text-center">
          <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-card text-4xl ring-1 ring-border">
            🔍
          </div>
          <h3 className="mb-2 text-2xl font-semibold text-foreground">Nenhum plugin encontrado</h3>
          <p className="max-w-xs text-muted">
            Não encontramos nada para &quot;{query}&quot;. Tente termos mais genéricos ou verifique a ortografia.
          </p>
        </div>
      )}
    </>
  );
}

export function PluginList({ allPlugins }: { allPlugins: ObsidianPlugin[] }) {
  return (
    <Suspense fallback={<div className="py-20 text-center">Carregando plugins...</div>}>
      <PluginListContent allPlugins={allPlugins} />
    </Suspense>
  );
}
