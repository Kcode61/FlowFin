import {
  FolderKanbanIcon,
  LayoutDashboardIcon,
  Target,
  TrendingDown,
  TrendingUp,
  Users,
} from "lucide-react";

export function HandToolsSection() {
  return (
    <section className="py-22 border-t border-[#19181A] ">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="md:text-4xl text-3xl text-white mb-6 font-bold font-poppins">
            Tudo que você precisa pra gerir o dinheiro
          </h2>
          <p className=" text-[#9A8E91] text-sm md:text-base max-w-75 md:max-w-none mx-auto font-inter">
            Ferramentas pensadas pra quem é freelancer e precisa de clareza nas
            finanças.
          </p>
        </div>
        <div className="max-w-6xl py-10 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
          <div className="group rounded-2xl border border-[#27272a] bg-[#0f0f12] p-6 transition-colors hover:border-[#facc15]/30">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#facc15]/10 text-[#facc15] transition-colors group-hover:bg-[#facc15]/15">
              <TrendingUp className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-[#fafafa]">
              Controle de receitas
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#a1a1aa]">
              Registre todos os seus ganhos por categoria, projeto e cliente.
              Saiba exatamente quanto entra e de onde vem.
            </p>
          </div>
          <div className="group rounded-2xl border border-[#27272a] bg-[#0f0f12] p-6 transition-colors hover:border-[#facc15]/30">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#facc15]/10 text-[#facc15] transition-colors group-hover:bg-[#facc15]/15">
              <TrendingDown className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-[#fafafa]">
              Gestão de despesas
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#a1a1aa]">
              Acompanhe cada centavo que sai. Categorize gastos recorrentes e
              pontuais para enxergar onde dá pra economizar.
            </p>
          </div>
          <div className="group rounded-2xl border border-[#27272a] bg-[#0f0f12] p-6 transition-colors hover:border-[#facc15]/30">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#facc15]/10 text-[#facc15] transition-colors group-hover:bg-[#facc15]/15">
              <FolderKanbanIcon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-[#fafafa]">
              Projetos organizados
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#a1a1aa]">
              Vincule projetos a clientes, defina valores e acompanhe o
              progresso de cada trabalho em um só lugar.
            </p>
          </div>
          <div className="group rounded-2xl border border-[#27272a] bg-[#0f0f12] p-6 transition-colors hover:border-[#facc15]/30">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#facc15]/10 text-[#facc15] transition-colors group-hover:bg-[#facc15]/15">
              <Target className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-[#fafafa]">
              Metas financeiras
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#a1a1aa]">
              Crie metas de reserva, investimento ou equipamento e acompanhe sua
              evolução rumo ao objetivo.
            </p>
          </div>
          <div className="group rounded-2xl border border-[#27272a] bg-[#0f0f12] p-6 transition-colors hover:border-[#facc15]/30">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#facc15]/10 text-[#facc15] transition-colors group-hover:bg-[#facc15]/15">
              <Users className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-[#fafafa]">
              Cadastro de clientes
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#a1a1aa]">
              Mantenha dados de contato, empresa e status de cada cliente. Tudo
              sempre à mão quando precisar.
            </p>
          </div>
          <div className="group rounded-2xl border border-[#27272a] bg-[#0f0f12] p-6 transition-colors hover:border-[#facc15]/30">
            <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl bg-[#facc15]/10 text-[#facc15] transition-colors group-hover:bg-[#facc15]/15">
              <LayoutDashboardIcon className="h-5 w-5" />
            </div>
            <h3 className="text-base font-semibold text-[#fafafa]">
              Dashboard inteligente
            </h3>
            <p className="mt-2 text-sm leading-relaxed text-[#a1a1aa]">
              Visualize receitas, despesas e o progresso das metas em gráficos
              claros e atualizados em tempo real.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
