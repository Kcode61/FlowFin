import { Wallet } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-[#19181A]">
      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col md:flex-row  gap-4 md:items-center justify-between py-6">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#F9C715] text-[#09090B]">
              <Wallet size={22} />
            </div>

            <h3 className="font-poppins  font-bold leading-none text-white">
              FlowFin
            </h3>
          </div>
          <p className="text-[#a1a1aa]  text-sm  font-inter">
            Feito para organizar sua vida financeira. © 2026 FlowFin.
          </p>
        </div>
      </div>
    </footer>
  );
}
