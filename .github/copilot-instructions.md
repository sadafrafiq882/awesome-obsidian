# Awesome Obsidian - AI Coding Instructions

Curadoria de plugins para Obsidian com Next.js 16, Drizzle ORM e Tailwind CSS 4.

## 🏗️ Architecture & Tech Stack

- **Framework**: Next.js 16 (App Router) com `output: 'export'`.
  - **Importante**: O site é estático. Funcionalidades que exigem servidor (como Server Actions) só funcionam se o ambiente de deploy suportar ou se forem usadas apenas no build.
- **Styling**: Tailwind CSS 4 (configurado via `@tailwindcss/postcss`).
- **Database**: Drizzle ORM com LibSQL (Turso). Focado no sistema de ratings.
- **i18n**: `next-intl` com roteamento por locale (`[locale]`). Mensagens em `messages/*.json`.
- **Data Source**: Plugins buscados via GitHub API em `src/lib/obsidian-api.ts`.

## 🎨 Coding Conventions

### UI Components
- Localizados em `src/components/`.
- Use Tailwind 4 e `lucide-react` para ícones.
- **Padrão de Card**: Veja `src/components/PluginCard.tsx`.
- **Client-side Logic**: Busca e paginação são feitas no cliente em `src/components/PluginList.tsx`.

### Data & State
- **Schema**: `src/db/schema.ts`.
- **Queries**: Centralizadas em `src/lib/db-queries.ts` usando `unstable_cache`.
- **API Integration**: Lógica de fetch do Obsidian em `src/lib/obsidian-api.ts`.
- **Server Actions**: `src/app/actions/` (ex: `rate.ts`). Note a limitação com `output: 'export'`.

### i18n (Internationalization)
- Use `useTranslations` no Client e `getTranslations` no Server.
- Adicione novas chaves em `messages/en.json` e `messages/pt.json`.
- Exemplo: `const t = useTranslations('PluginCard');`

## 🛠️ Critical Workflows

- **Dev**: `npm run dev`
- **Database**: `npm run db:push` para sincronizar schema com Turso/SQLite local.
- **Build**: `npm run build` gera exportação estática em `out/`.

## ⚠️ Project Specific Patterns

- **Caching**: O projeto usa `unstable_cache` agressivamente para evitar rate limit da API do GitHub.
- **Static Params**: `generateStaticParams` em `layout.tsx` é obrigatório para o export estático com i18n.
- **Images**: Configurado com `unoptimized: true` no `next.config.ts` para compatibilidade com export estático.
