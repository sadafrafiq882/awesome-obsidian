import React from 'react';
import { Star, Download, User, ExternalLink } from 'lucide-react';
import { useTranslations } from 'next-intl';

interface PluginCardProps {
  plugin: {
    name: string;
    description: string;
    author: string;
    repo: string;
    stars?: number;
    downloads?: number;
  };
}

export function PluginCard({ plugin }: PluginCardProps) {
  const t = useTranslations('PluginCard');
  return (
    <div className="group relative flex flex-col justify-between rounded-2xl border border-border bg-card/50 p-6 transition-all duration-300 hover:border-accent/30 hover:bg-card hover:shadow-[0_0_40px_-15px_rgba(124,58,237,0.1)] dark:bg-white/[0.02] dark:hover:bg-white/[0.04]">

      {/* Header do Card */}
      <div>
        <div className="mb-6 flex items-start justify-between">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent ring-1 ring-accent/20 transition-colors group-hover:bg-accent/20 group-hover:text-accent">
            <ExternalLink size={22} />
          </div>
          <span className="rounded-full border border-border bg-background px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted">
            Plugin
          </span>
        </div>

        <h3 className="mb-3 text-xl font-semibold tracking-tight text-foreground transition-colors group-hover:text-accent">
          {plugin.name}
        </h3>

        <p className="mb-8 line-clamp-3 text-sm leading-relaxed text-muted transition-colors group-hover:text-foreground/80">
          {plugin.description}
        </p>
      </div>

      {/* Footer do Card */}
      <div className="mt-auto">
        <div className="mb-6 flex items-center justify-between border-t border-border pt-5 text-xs font-medium text-muted">
          <div className="flex items-center gap-2 transition-colors hover:text-foreground">
            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-border text-muted">
              <User size={12} />
            </div>
            <span className="truncate max-w-[120px]">{plugin.author}</span>
          </div>

          <div className="flex gap-4">
            <div className="flex items-center gap-1.5" title={t('stars')}>
              <Star size={14} className="text-yellow-500/80" />
              <span className="text-muted">{plugin.stars?.toLocaleString() || 0}</span>
            </div>
            {plugin.downloads && (
              <div className="flex items-center gap-1.5" title={t('downloads')}>
                <Download size={14} className="text-blue-400/80" />
                <span className="text-muted">{plugin.downloads.toLocaleString()}</span>
              </div>
            )}
          </div>
        </div>

        <a
          href={`https://github.com/${plugin.repo}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-foreground text-background py-3 text-sm font-bold transition-all hover:bg-accent hover:text-white active:scale-[0.98]"
        >
          {t('viewOnGithub')}
          <ExternalLink size={14} />
        </a>
      </div>
    </div>
  );
}
