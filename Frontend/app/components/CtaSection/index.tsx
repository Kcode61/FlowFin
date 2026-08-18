import { ArrowRight } from "lucide-react";
import Link from "next/link";

export function CtaSection() {
  return (
    <section className="py-22 border-t border-[#19181A] ">
      <div className="max-w-7xl mx-auto">
        <div className="mx-auto flex max-w-4xl flex-col items-center gap-6 rounded-3xl border border-[#27272A] bg-[#0E0D11] px-8 py-14 text-center sm:px-12">
          <span className="rounded-full border border-[#F9C715]/20 bg-[#F9C715]/5 px-3 py-1 font-inter text-xs font-semibold uppercase tracking-wider text-[#F9C715]">
            Comece agora
          </span>

          <div className="space-y-3">
            <h2 className="font-poppins text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Pronto pra assumir o controle?
            </h2>

            <p className="mx-auto max-w-xl font-inter text-sm font-medium leading-6 text-[#A1A1AA] sm:text-base">
              Crie sua conta agora e comece a organizar sua vida financeira hoje
              mesmo.
            </p>
          </div>

          <Link
            href="/Register"
            className="group inline-flex items-center gap-3 rounded-xl bg-[#F9C715] px-7 py-3.5 font-poppins text-sm font-bold text-[#09090B] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#FFD83D]"
          >
            Criar conta grátis
            <ArrowRight
              size={17}
              className="transition-transform duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
