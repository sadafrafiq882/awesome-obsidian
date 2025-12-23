# Awesome Obsidian - Instruções para IA

Este projeto é uma curadoria de plugins para o Obsidian, construído com Next.js 16, Drizzle ORM e Tailwind CSS 4.

## Arquitetura e Tecnologias

- **Framework**: Next.js 16 (App Router) com `output: 'export'`.
- **Estilização**: Tailwind CSS 4 (configurado via `@tailwindcss/postcss`).
- **Banco de Dados**: Drizzle ORM com LibSQL (SQLite). Utilizado principalmente para o sistema de avaliações (ratings).
- **Fonte de Dados**: Os plugins são buscados diretamente do repositório oficial do Obsidian via `src/lib/obsidian-api.ts`.
- **Ícones**: Lucide React.

## Convenções de Código

### Componentes UI
- Localizados em `src/components/`.
- Use Tailwind CSS 4 para estilização.
- Prefira componentes funcionais e `lucide-react` para ícones.
- Exemplo: [src/components/PluginCard.tsx](src/components/PluginCard.tsx).

### Acesso a Dados e Banco de Dados
- **Schema**: Definido em [src/db/schema.ts](src/db/schema.ts).
- **Queries**: Queries complexas ou cacheadas devem ficar em `src/lib/db-queries.ts`.
- **Server Actions**: Localizadas em `src/app/actions/`. Usadas para mutações como avaliações.
- **Cache**: Utilize `unstable_cache` e `revalidateTag` para gerenciar o cache de dados do banco.

### Integração Obsidian
- Toda a lógica de busca de plugins e estatísticas (downloads, stars) do GitHub do Obsidian deve residir em [src/lib/obsidian-api.ts](src/lib/obsidian-api.ts).

## Workflows Comuns

- **Desenvolvimento**: `npm run dev`
- **Banco de Dados**: Para atualizar o schema no banco local, use `npm run db:push`.
- **Build**: `npm run build` gera uma exportação estática em `out/`.

## Padrões Específicos
- O projeto utiliza `next-themes` para suporte a tema escuro/claro.
- A paginação e busca são feitas no lado do cliente em [src/components/PluginList.tsx](src/components/PluginList.tsx).
- O arquivo [next.config.ts](next.config.ts) está configurado para `output: 'export'`, o que significa que o site é estático. Tenha cuidado ao adicionar funcionalidades que dependem estritamente de um servidor Node.js em runtime.
