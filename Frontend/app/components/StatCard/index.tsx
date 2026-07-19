import {
  DollarSign,
  TrendingDown,
  FolderKanban,
  LucideIcon,
  Clock,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string;
  icon: LucideIcon;
  accent?: boolean;
  subtitle?: string;
}

function StatCard({
  title,
  value,
  icon: Icon,
  accent = false,
  subtitle,
}: StatCardProps) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border p-5 transition-colors duration-200 ${
        accent
          ? "border-[#EBCC15]/20 bg-[#EBCC15]/3"
          : "border-[#1F2229] bg-[#111114]"
      } hover:border-[#2A2D34]`}
    >
      {accent && (
        <div className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-[#EBCC15]/10 blur-2xl" />
      )}

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-[#8A93A3]">{title}</p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-white">
            {value}
          </p>
          {subtitle && (
            <p className="mt-1 text-xs text-[#8A93A3]">{subtitle}</p>
          )}
        </div>

        <div
          className={`flex h-10 w-10 items-center justify-center rounded-xl ${
            accent
              ? "bg-[#EBCC15]/10 text-[#EBCC15]"
              : "bg-[#1A1D25] text-[#8A93A3]"
          }`}
        >
          <Icon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}
const localdate = new Date().toLocaleDateString("pt-BR", {
  day: "2-digit",
  month: "long",
  year: "numeric",
});
interface DashboardStatsProps {
  totalReceitas?: number;
  totalDespesas?: number;
  totalContasReceber?: number;
  totalProjetosAtivos?: number;
  receitasPendentes?: number;
  pagamentosPendentes?: number;
}

export function DashboardStats({
  totalReceitas = 0,
  totalDespesas = 0,
  totalContasReceber = 0,
  totalProjetosAtivos = 0,
  receitasPendentes = 0,
  pagamentosPendentes = 0,
}: DashboardStatsProps) {
  const stats: StatCardProps[] = [
    {
      title: "Receita total",
      value: `R$ ${totalReceitas.toFixed(2)}`,
      icon: DollarSign,
      accent: true,
      subtitle: `${localdate}`,
    },
    {
      title: "Despesas total",
      value: `R$ ${totalDespesas.toFixed(2)}`,
      icon: TrendingDown,
      subtitle: `${localdate}`,
    },
    {
      title: "Contas a receber",
      value: `R$ ${totalContasReceber.toFixed(2)}`,
      icon: Clock,
      subtitle: `${pagamentosPendentes} pagamentos pendentes`,
    },
    {
      title: "Projetos ativos",
      value: `${totalProjetosAtivos}`,
      icon: FolderKanban,
      subtitle: "Em andamento",
    },
  ];

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  );
}
