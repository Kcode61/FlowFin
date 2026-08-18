export function StartedSection() {
  return (
    <section className="py-22 border-t border-[#19181A] ">
      <div className="max-w-7xl mx-auto">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-4xl text-white mb-6 font-bold font-poppins">
            Comece em 3 passos
          </h2>
          <p className=" text-[#9A8E91] font-inter">
            Sem complicação. Em poucos minutos você já está no controle.
          </p>
        </div>
        <div className="grid py-15 max-w-6xl mx-auto grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <div className="flex flex-col gap-4 items-center text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#16130B] border-[#5A490D] border ">
              <h3 className="text-lg  font-bold text-[#F9C213]">01</h3>
            </div>
            <p className="text-white font-semibold font-poppins">
              Crie sua conta
            </p>
            <p className=" text-[#9A8E91] font-inter text-sm">
              Cadastro rápido e gratuito, sem cartão de crédito.
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#16130B] border-[#5A490D] border ">
              <h3 className="text-lg  font-bold text-[#F9C213]">02</h3>
            </div>
            <p className="text-white font-semibold font-poppins">
              Cadastre suas finanças
            </p>
            <p className=" text-[#9A8E91] font-inter text-sm">
              Adicione receitas, despesas e projetos.
            </p>
          </div>
          <div className="flex flex-col gap-4 items-center text-center">
            <div className="w-12 h-12 rounded-full flex items-center justify-center bg-[#16130B] border-[#5A490D] border ">
              <h3 className="text-lg  font-bold text-[#F9C213]">03</h3>
            </div>
            <p className="text-white font-semibold font-poppins">
              Acompanhe tudo
            </p>
            <p className=" text-[#9A8E91] font-inter text-sm">
              Veja o resumo da sua vida financeira no dashboard.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
