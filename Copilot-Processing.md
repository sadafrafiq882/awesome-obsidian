# Copilot Processing - Internacionalização (i18n)

## Request
Implementar internacionalização no projeto disponibilizando o inglês e português.

## Status
- [x] Phase 1: Initialization
- [x] Phase 2: Planning
- [x] Phase 3: Execution
- [x] Phase 4: Summary

## Action Plan
1. [x] Instalar `next-intl`.
2. [x] Criar arquivos de tradução em `messages/` (en.json, pt.json).
3. [x] Configurar `next-intl` para Next.js App Router (Static Export).
4. [x] Refatorar a estrutura de pastas para `src/app/[locale]`.
5. [x] Implementar `generateStaticParams` para suportar os locales no build estático.
6. [x] Traduzir os textos estáticos no `layout.tsx` e `page.tsx`.
7. [x] Traduzir os componentes `PluginList`, `PluginCard`, `SearchAndPagination`.
8. [x] Adicionar um seletor de idioma (Language Switcher).
9. [x] Validar o build estático.
10. [x] Adicionar o badge "Ver no GitHub" no rodapé.

## Summary
A internacionalização foi implementada com sucesso utilizando `next-intl`. O projeto agora suporta Inglês (`en`) e Português (`pt`), com o Português como idioma padrão. A estrutura foi adaptada para suportar exportação estática (`output: 'export'`), utilizando `generateStaticParams` para gerar as páginas de cada idioma durante o build. Um seletor de idioma foi adicionado ao cabeçalho e o badge do GitHub foi restaurado no rodapé com suporte a tradução.
