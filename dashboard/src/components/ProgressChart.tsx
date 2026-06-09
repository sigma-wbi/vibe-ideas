import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

interface SectionStat {
  title: string;
  avgProgress: number;
  accentColor: string;
}

interface Props {
  stats: SectionStat[];
}

const colorMap: Record<string, string> = {
  sky: '#38bdf8',
  emerald: '#34d399',
  amber: '#fbbf24',
  violet: '#a78bfa',
  rose: '#fb7185',
  teal: '#2dd4bf',
};

export default function ProgressChart({ stats }: Props) {
  const data = {
    labels: stats.map((s) => s.title),
    datasets: [
      {
        data: stats.map((s) => s.avgProgress),
        backgroundColor: stats.map((s) => colorMap[s.accentColor] ?? '#38bdf8'),
        borderWidth: 0,
        hoverOffset: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
        labels: {
          color: '#94a3b8',
          padding: 16,
          font: { size: 12 },
        },
      },
      tooltip: {
        callbacks: {
          label: (ctx: any) => `${ctx.label}: ${ctx.parsed}%`,
        },
      },
    },
    cutout: '65%',
  };

  const allZero = stats.every((s) => s.avgProgress === 0);

  return (
    <div
      className="rounded-xl p-6"
      style={{ background: 'var(--bg-card)', border: '1px solid var(--border)' }}
    >
      <h3
        className="font-semibold mb-4 text-center"
        style={{ color: 'var(--text-primary)' }}
      >
        섹션별 진행률
      </h3>

      {allZero ? (
        <p
          className="text-center py-8 text-sm"
          style={{ color: 'var(--text-secondary)' }}
        >
          아직 진행 데이터가 없습니다. 문서의 frontmatter에 progress 값을 추가해보세요.
        </p>
      ) : (
        <div className="h-64 flex items-center justify-center">
          <Doughnut data={data} options={options} aria-label="섹션별 진행률 차트" />
        </div>
      )}

      {/* 접근성: 대체 텍스트 테이블 (스크린리더) */}
      <table className="sr-only" aria-label="섹션별 진행률 데이터">
        <thead>
          <tr>
            <th>섹션</th>
            <th>진행률</th>
          </tr>
        </thead>
        <tbody>
          {stats.map((s) => (
            <tr key={s.title}>
              <td>{s.title}</td>
              <td>{s.avgProgress}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
