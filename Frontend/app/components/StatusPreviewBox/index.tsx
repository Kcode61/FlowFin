import {
  ArrowUpRight,
  ChartColumn,
  FolderCog2,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";

export function StatusPreviewBox() {
  return (
    <div className="max-w-4xl py-16 flex flex-col gap-4 mx-auto ">
      <div className="flex items-center justify-center gap-2">
        <ChartColumn size={15} className="text-[#E8BA14]" />

        <p className="text-xs font-medium text-[#9A8E91] font-inter">
          Prévia de como o seu dashboard vai ficar
        </p>

        <span className="inline-flex items-center rounded-full border border-[#27272a] bg-[#0f0f12] px-2 py-0.5 text-[10px] font-medium text-[#a1a1aa]">
          Exemplo
        </span>
      </div>
      <div className="pb-6 bg-[#0E0D11] border border-[#222225] rounded-2xl">
        <div className="px-4 py-3 border-b border-[#222225] flex gap-4 items-center">
          <div className="flex gap-2 items-center">
            <div className="w-3 h-3 rounded-full bg-[#952D30] "></div>
            <div className="w-3 h-3 rounded-full bg-[#93700A] "></div>
            <div className="w-3 h-3 rounded-full bg-[#1D7B3F] "></div>
          </div>
          <p className="text-xs font-medium text-[#9A8E91] font-inter">
            FlowFin.com/dashboard
          </p>
        </div>
        <div className="py-3 px-4 flex flex-col gap-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl border border-[#facc15]/20 bg-[#facc15]/5 p-4">
              <TrendingUp className="mb-2 h-4 w-4 text-[#facc15]" />
              <p className="text-[11px] text-[#a1a1aa]">Receita do mês</p>
              <p className="text-lg font-bold text-[#fafafa]">R$ 28.500</p>
            </div>
            <div className="rounded-xl border border-[#222225] bg-[#09090B] p-4">
              <TrendingDown className="mb-2 h-4 w-4 text-[#A2A1AA]" />
              <p className="text-[11px] text-[#a1a1aa]">Despesas</p>
              <p className="text-lg font-bold text-[#fafafa]">R$ 7.120</p>
            </div>
            <div className="rounded-xl border border-[#222225] bg-[#09090B] p-4">
              <Wallet className="mb-2 h-4 w-4 text-[#A2A1AA]" />
              <p className="text-[11px] text-[#a1a1aa]">Contas a receber</p>
              <p className="text-lg font-bold text-[#fafafa]">R$ 14.245</p>
            </div>
            <div className="rounded-xl border border-[#222225] bg-[#09090B] p-4">
              <FolderCog2 className="mb-2 h-4 w-4 text-[#A2A1AA]" />
              <p className="text-[11px] text-[#a1a1aa]">Projetos ativos</p>
              <p className="text-lg font-bold text-[#fafafa]">4</p>
            </div>
          </div>
          <div className="rounded-xl border border-[#222225] bg-[#09090B] p-6">
            <p className="text-sm mb-4 text-[#a1a1aa]">Receitas vs Despesas</p>

            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-3 py-2.5 border-b border-[#222225] last:border-0">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-green-500/10 text-green-500">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    Pagamento Recebido - Salário
                  </p>
                  <p className="text-xs text-white">17/08/2026</p>
                </div>

                <span className="text-sm font-semibold text-green-500">
                  +R$ 2.500,00
                </span>
              </div>

              <div className="flex items-center gap-3 py-2.5 border-b border-[#222225] last:border-0">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-green-500/10 text-green-500">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    Pagamento Recebido - Freelance
                  </p>
                  <p className="text-xs text-white">15/08/2026</p>
                </div>

                <span className="text-sm font-semibold text-green-500">
                  +R$ 850,00
                </span>
              </div>

              <div className="flex items-center gap-3 py-2.5 border-b border-[#222225] last:border-0">
                <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-green-500/10 text-green-500">
                  <ArrowUpRight className="w-4 h-4" />
                </div>

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">
                    Pagamento Recebido - Investimento
                  </p>
                  <p className="text-xs text-white">08/08/2026</p>
                </div>

                <span className="text-sm font-semibold text-green-500">
                  +R$ 180,50
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
