import { Wallet } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-[#27272a]/60 bg-[#09090B] backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-6">
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#facc15]">
            <Wallet className="h-5 w-5 text-[#0a0a0c]" />
          </div>
          <span className="text-lg font-bold tracking-tight text-[#fafafa]">
            FlowFIn
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link
            href="/Login"
            className="hidden text-sm font-medium text-[#a1a1aa] transition-colors hover:text-[#fafafa] sm:block"
          >
            Entrar
          </Link>
          <Link
            href="/Register"
            className="inline-flex items-center justify-center rounded-lg bg-[#facc15] py-2 hover:scale-95 transition ease-out duration-300 px-8 text-sm font-medium text-[#0a0a0c] hover:bg-[#facc15]/90"
          >
            Criar conta
          </Link>
        </div>
      </div>
    </header>
  );
}
