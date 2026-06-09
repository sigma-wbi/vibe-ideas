export interface SectionConfig {
  id: string;
  collection: string;
  title: string;
  description: string;
  icon: string;
  accentColor: string;
  slug: string;
}

export const sections: SectionConfig[] = [
  {
    id: '01',
    collection: 'claudeCode',
    title: 'Claude Code',
    description: 'MCP, CLAUDE.md, 프롬프트 엔지니어링',
    icon: '💻',
    accentColor: 'sky',
    slug: 'claude-code',
  },
  {
    id: '03',
    collection: 'arsenal',
    title: 'AI Arsenal',
    description: 'LLM·이미지·음성·영상 등 AI 서비스 활용 전략',
    icon: '⚡',
    accentColor: 'amber',
    slug: 'arsenal',
  },
  {
    id: '04',
    collection: 'projects',
    title: 'Side Projects',
    description: '아이디어 검증 기록과 사이드 프로젝트',
    icon: '🚀',
    accentColor: 'violet',
    slug: 'projects',
  },
];

export function getSectionBySlug(slug: string): SectionConfig | undefined {
  return sections.find((s) => s.slug === slug);
}
