import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";

export default function NotFound() {
  return (
    <main className="relative flex min-h-screen flex-col overflow-hidden bg-[#09090B] text-white">
      <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-7 md:px-10">
        <Link
          href="/"
          className="font-poppins text-lg font-bold tracking-normal text-white"
          aria-label="FlowFin, página inicial"
        >
          Flow<span className="text-[#F9C715]">Fin</span>
        </Link>
        <span className="font-inter text-[10px] font-medium uppercase tracking-[0.18em] text-[#71717A]">
          Navegação <span className="px-2 text-[#3F3F46]">/</span> 404
        </span>
      </header>

      <section className="mx-auto grid w-full max-w-7xl flex-1 items-center gap-14 px-6 py-12 md:grid-cols-[1fr_0.9fr] md:px-10 md:py-16">
        <div className="max-w-xl">
          <div className="mb-7 flex items-center gap-3 font-inter text-xs font-semibold uppercase tracking-[0.16em] text-[#A1A1AA]">
            <span className="h-px w-8 bg-[#F9C715]" />
            Fluxo interrompido
          </div>

          <h1 className="font-poppins text-4xl font-bold leading-[1.12] text-white sm:text-5xl md:text-6xl">
            Esse caminho
            <br />
            <span className="text-[#F9C715]">não fecha.</span>
          </h1>

          <p className="mt-6 max-w-md font-inter text-base leading-7 text-[#A1A1AA]">
            A página que você procurou não está neste balanço. Confira o
            endereço ou volte para uma área conhecida.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link
              href="/"
              className="group inline-flex min-h-12 items-center gap-3 bg-[#F9C715] px-5 font-poppins text-sm font-bold text-[#09090B] transition-colors hover:bg-[#FFDA4A] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F9C715]"
            >
              <ArrowLeft size={17} aria-hidden="true" />
              Voltar ao início
            </Link>
            <Link
              href="/Projetos"
              className="inline-flex min-h-12 items-center gap-2 font-inter text-sm font-medium text-[#D4D4D8] transition-colors hover:text-[#F9C715] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#F9C715]"
            >
              Ver projetos
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>

        <div
          className="relative mx-auto w-full max-w-lg border-y border-[#27272A] py-8 md:py-10"
          aria-label="Ilustração de um fluxo financeiro interrompido"
          role="img"
        >
          <div className="mb-4 flex items-center justify-between font-inter text-[10px] font-medium uppercase tracking-[0.16em] text-[#71717A]">
            <span>Registro de rota</span>
            <span>FF—404</span>
          </div>

          <div className="relative overflow-hidden">
            <span className="block font-poppins text-[clamp(8rem,25vw,15rem)] font-bold leading-[0.82] text-[#F9C715]">
              404
            </span>
            <div className="absolute inset-x-0 bottom-2 flex items-center gap-3">
              <span className="h-px flex-1 bg-[#3F3F46]" />
              <span className="h-2 w-2 rounded-full bg-[#F9C715]" />
              <span className="h-px w-8 bg-[#F9C715]" />
              <span className="h-2 w-2 border border-dashed border-[#71717A]" />
              <span className="h-px flex-1 border-t border-dashed border-[#3F3F46]" />
            </div>
          </div>

          <div className="mt-7 flex items-end justify-between gap-6">
            <p className="max-w-52 font-inter text-xs leading-5 text-[#71717A]">
              Nenhum lançamento encontrado para este endereço.
            </p>
            <span className="shrink-0 font-inter text-[10px] font-medium uppercase tracking-[0.14em] text-[#A1A1AA]">
              Fim do percurso
            </span>
          </div>
        </div>
      </section>

      <footer className="mx-auto flex w-full max-w-7xl items-center justify-between border-t border-[#18181B] px-6 py-5 font-inter text-[10px] uppercase tracking-[0.14em] text-[#52525B] md:px-10">
        <span>FlowFin</span>
        <span>Organize o que vem a seguir.</span>
      </footer>
    </main>
  );
}
