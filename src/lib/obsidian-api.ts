export interface ObsidianPlugin {
  id: string;
  name: string;
  author: string;
  description: string;
  repo: string;
  downloads?: number;
  updated?: number;
  stars?: number;
}

export async function getObsidianPlugins(): Promise<ObsidianPlugin[]> {
  const pluginsUrl = "https://raw.githubusercontent.com/obsidianmd/obsidian-releases/HEAD/community-plugins.json";
  const statsUrl = "https://raw.githubusercontent.com/obsidianmd/obsidian-releases/HEAD/community-plugin-stats.json";

  try {
    const [pluginsRes, statsRes] = await Promise.all([
      fetch(pluginsUrl, { next: { revalidate: 86400 } }), // 24h cache
      fetch(statsUrl, { next: { revalidate: 86400 } }),   // 24h cache
    ]);

    if (!pluginsRes.ok || !statsRes.ok) {
      throw new Error("Failed to fetch Obsidian data");
    }

    const plugins: ObsidianPlugin[] = await pluginsRes.json();
    const stats: Record<string, any> = await statsRes.json();

    return plugins.map((plugin) => ({
      ...plugin,
      downloads: stats[plugin.id]?.downloads || 0,
      updated: stats[plugin.id]?.updated || 0,
      stars: stats[plugin.id]?.stars || 0,
    }));
  } catch (error) {
    console.error("Error fetching Obsidian plugins:", error);
    return [];
  }
}
