import {
  ArrowRight,
  ArrowUpRight,
  BarChart3,
  ChartColumn,
  Check,
  FolderCog2,
  Hand,
  LayoutDashboardIcon,
  LogIn,
  LucideFolderKanban,
  TrendingDown,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { StatusPreviewBox } from "./components/StatusPreviewBox";
import { HandToolsSection } from "./components/handToolsSection";

export default function Home() {
  return (
    <section className="py-32 px-4 bg-[#09090B] overflow-y-auto h-full ">
      <div className="max-w-7xl mx-auto">
        <div className="grid max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <span className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-[#27272a] bg-[#0f0f12] px-4 py-1.5 text-xs font-medium text-[#a1a1aa]">
              <BarChart3 className="h-3.5 w-3.5 text-[#facc15]" />
              Gestão financeira para freelancers
            </span>
            <h1 className="text-4xl mb-4 md:text-6xl text-white font-poppins font-bold ">
              Suas finanças,{" "}
              <span className="text-yellow-400">sob controle.</span>
            </h1>
            <p className="text-xl max-w-xl mb-4 text-[#A2A1AA] font-medium font-inter">
              O FlowFin reúne receitas, despesas, projetos e metas em um só
              lugar. Simples, rápido e feito pra quem trabalha por conta
              própria.
            </p>
            <div className="flex flex-col md:flex-row gap-4 ">
              <button className="py-4 px-8 rounded-xl cursor-pointer flex gap-4 items-center bg-[#F9C715]  group text-[#09090B] font-poppins font-bold hover:scale-95 transition ease duration-300">
                Criar conta grátis
                <ArrowRight
                  size={17}
                  className="group-hover:-translate-x-2 transition-all ease-out duration-500"
                />
              </button>
              <button className="py-4 px-8 hover:bg-[#F9C715]/80   rounded-xl cursor-pointer flex gap-4 hover:text-[#09090B] hover:border-transparent items-center bg-transparent border border-[#27272A]  group text-white font-poppins font-bold hover:scale-95 transition ease duration-300">
                Já tenho conta
              </button>
            </div>
          </div>
          <div className="p-6 rounded-2xl bg-[#0E0D11] border border-[#27272A] flex flex-col gap-4">
            <div className="flex mb-4 justify-between ">
              <div className="flex flex-col">
                <p className="text-xs text-[#9A8E91]">
                  O que você vai poder fazer
                </p>
                <p className="text-sm font-bold text-white font-poppins">
                  Tudo em um só lugar
                </p>
              </div>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center bg-[#261F10] text-[#F9C715]">
                <LayoutDashboardIcon
                  size={24}
                  absoluteStrokeWidth
                  className="fill-[#F9C715]"
                />
              </div>
            </div>
            <div className="py-4 px-6 rounded-2xl bg-[#09090B] border border-[#222225] flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="w-10 flex rounded-xl items-center justify-center bg-[#211B0B] text-[#E8BA14] h-10 ">
                  <TrendingUp size={20} />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-white font-semibold font-poppins ">
                    Registrar receitas
                  </p>
                  <p className="text-xs font-medium font-inter text-[#9A8E91]">
                    Por projeto, cliente e categoria
                  </p>
                </div>
              </div>

              <Check size={18} className="text-[#E8BA14]" absoluteStrokeWidth />
            </div>
            <div className="py-4 px-6 rounded-2xl bg-[#09090B] border border-[#222225] flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="w-10 flex rounded-xl items-center justify-center bg-[#211B0B] text-[#E8BA14] h-10 ">
                  <TrendingDown size={20} />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-white font-semibold font-poppins ">
                    Controlar despesas
                  </p>
                  <p className="text-xs font-medium font-inter text-[#9A8E91]">
                    Recorrentes e pontuais
                  </p>
                </div>
              </div>

              <Check size={18} className="text-[#E8BA14]" absoluteStrokeWidth />
            </div>
            <div className="py-4 px-6 rounded-2xl bg-[#09090B] border border-[#222225] flex items-center justify-between">
              <div className="flex gap-4 items-center">
                <div className="w-10 flex rounded-xl items-center justify-center bg-[#211B0B] text-[#E8BA14] h-10 ">
                  <LucideFolderKanban size={20} />
                </div>
                <div className="flex flex-col">
                  <p className="text-sm text-white font-semibold font-poppins ">
                    Gerir projetos
                  </p>
                  <p className="text-xs font-medium font-inter text-[#9A8E91]">
                    Status, valor e progresso
                  </p>
                </div>
              </div>

              <Check size={18} className="text-[#E8BA14]" absoluteStrokeWidth />
            </div>
            <div className="w-full mb-2 mt-2 bg-[#222225] h-px"></div>
            <div className="flex gap-2 items-center">
              <Users size={15} className="text-[#E8BA14]" />
              <p className="text-xs font-inter text-[#9A8E91] ">
                Cadastre seus clientes e vincule aos projetos
              </p>
            </div>
          </div>
        </div>
        <StatusPreviewBox />
        <HandToolsSection />
      </div>
    </section>
  );
}
