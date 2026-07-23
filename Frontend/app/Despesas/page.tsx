import { Plus } from "lucide-react";

export default function Despesas() {
  return (
    <section className="py-10 px-4 bg-[#09090B] overflow-y-auto h-full ">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center flex-col md:flex-row gap-4 justify-between">
          <div>
            <h1 className="text-2xl font-bold font-poppins text-white">
              Despesas
            </h1>
            <p className="text-gray-500 text-sm font-inter font-medium">
              Controle seus gastos e custos operacionais
            </p>
          </div>
          <button className="flex gap-4 items-center rounded-lh py-3 px-4 hover:scale-95 transition ease duration-300 font-inter font-medium text-sm bg-[#F9C815] text-[#241E0C]">
            <Plus size={17} absoluteStrokeWidth />
            Nova despesa
          </button>
        </div>
      </div>
    </section>
  );
}
