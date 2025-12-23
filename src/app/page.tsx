import { getObsidianPlugins } from '@/lib/obsidian-api';
import { PluginCard } from '@/components/PluginCard';
import { SearchAndPagination } from '@/components/SearchAndPagination';
import { Boxes } from 'lucide-react';

// Configuração da Paginação
const ITEMS_PER_PAGE = 9;

interface PageProps {
  searchParams: Promise<{
    q?: string;
    page?: string;
    sort?: string;
  }>;
}

export default async function Home(props: PageProps) {
  const searchParams = await props.searchParams;
  const query = (searchParams?.q || '').toLowerCase();
  const currentPage = Number(searchParams?.page) || 1;
  const sort = searchParams?.sort || 'newest';
  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  // 1. Busca todos os plugins da API do Obsidian
  const allPlugins = await getObsidianPlugins();

  // 2. Filtra os plugins localmente
  const filteredPlugins = query
    ? allPlugins.filter(plugin =>
      plugin.name.toLowerCase().includes(query) ||
      plugin.description.toLowerCase().includes(query) ||
      plugin.author.toLowerCase().includes(query)
    )
    : allPlugins;

  // 3. Ordenação
  const sortedPlugins = [...filteredPlugins].sort((a, b) => {
    if (sort === 'name_asc') {
      return a.name.localeCompare(b.name);
    }
    if (sort === 'name_desc') {
      return b.name.localeCompare(a.name);
    }
    if (sort === 'downloads') {
      return (b.downloads || 0) - (a.downloads || 0);
    }
    if (sort === 'stars') {
      return (b.stars || 0) - (a.stars || 0);
    }
    // newest (padrão) - ordena por timestamp de atualização
    return (b.updated || 0) - (a.updated || 0);
  });

  // 4. Paginação local
  const totalItems = sortedPlugins.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);
  const data = sortedPlugins.slice(offset, offset + ITEMS_PER_PAGE);

  return (
    <main className="min-h-screen bg-slate-950 text-slate-200">
      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-slate-900 py-20">
        <div className="absolute inset-0 bg-[url('/grid.svg')] bg-center [mask-image:linear-gradient(180deg,white,rgba(255,255,255,0))]"></div>
        <div className="container relative mx-auto px-4 text-center">
          <div className="mb-6 flex justify-center">
            <div className="rounded-full bg-purple-500/10 p-3 ring-1 ring-purple-500/50">
              <Boxes className="h-10 w-10 text-purple-400" />
            </div>
          </div>
          <h1 className="mb-4 bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-5xl font-extrabold tracking-tight text-transparent md:text-6xl">
            Awesome Obsidian
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-slate-400">
            Uma coleção curada dos melhores plugins, temas e recursos para o seu segundo cérebro.
          </p>
        </div>
      </section>

      {/* Conteúdo Principal */}
      <div className="container mx-auto px-4 py-12">
        {/* Componente Client-Side de Busca e Controles */}
        <SearchAndPagination totalPages={totalPages} />

        {/* Grid de Resultados */}
        {data.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {data.map((plugin) => (
              <PluginCard key={plugin.id} plugin={plugin} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <div className="mb-4 text-6xl">🔍</div>
            <h3 className="text-xl font-semibold text-slate-300">Nenhum plugin encontrado</h3>
            <p className="text-slate-500">Tente buscar por outro termo.</p>
          </div>
        )}
      </div>

      {/* Footer Simples */}
      <footer className="mt-20 border-t border-slate-800 bg-slate-900 py-8 text-center text-sm text-slate-500">
        <p>© {new Date().getFullYear()} Awesome Obsidian. Feito com Next.js & Drizzle.</p>
      </footer>
    </main>
  );
}