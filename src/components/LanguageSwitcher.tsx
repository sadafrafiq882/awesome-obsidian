'use client';

import { useLocale, useTranslations } from 'next-intl';
import { routing, usePathname, useRouter } from '@/i18n/routing';
import { Languages } from 'lucide-react';

export function LanguageSwitcher() {
  const t = useTranslations('LanguageSwitcher');
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  function onLanguageChange(newLocale: string) {
    router.replace(pathname, { locale: newLocale });
  }

  return (
    <div className="relative flex items-center gap-2 rounded-xl border border-border bg-card/50 p-1.5">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/10 text-accent">
        <Languages size={16} />
      </div>
      <select
        value={locale}
        onChange={(e) => onLanguageChange(e.target.value)}
        className="bg-transparent text-xs font-bold uppercase tracking-wider text-foreground focus:outline-none cursor-pointer pr-2"
        aria-label={t('label')}
      >
        {routing.locales.map((loc) => (
          <option key={loc} value={loc} className="bg-card text-foreground">
            {loc}
          </option>
        ))}
      </select>
    </div>
  );
}
