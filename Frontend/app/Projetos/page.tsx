"use client";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { Projeto, ProjetoStatus } from "../types/user";
import { adicionarProjeto, listarProjetos } from "../services/api";

export default function Projetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [isOpen, setisOpen] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [nome, setNome] = useState("");
  const [prazoFinalizacao, setPrazoFinalizacao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [status, setStatus] = useState<ProjetoStatus>(
    ProjetoStatus.EM_ANDAMENTO,
  );
  const [openStatus, setOpenStatus] = useState(false);
  function statusNome(status: ProjetoStatus) {
    switch (status) {
      case ProjetoStatus.CONCLUIDO:
        return "Concluido";
      case ProjetoStatus.EM_ANDAMENTO:
        return "Em andamento";
    }
  }
  const statusList = [
    {
      label: "Concluido",
      value: ProjetoStatus.CONCLUIDO,
    },
    {
      label: "Em andamento",
      value: ProjetoStatus.EM_ANDAMENTO,
    },
  ];
  useEffect(() => {
    async function carregarProjetos() {
      const data = await listarProjetos();
      console.log("RETORNO API:", data);
      if (data) {
        setProjetos(data);
      }
    }

    carregarProjetos();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const projeto = await adicionarProjeto(
        nome,
        descricao,
        valor,
        prazoFinalizacao,
        dataInicio,
        status,
      );

      if (!projeto) return;

      const data = await listarProjetos();

      setProjetos(data);

      console.log("Receita criada:", projeto);

      setDescricao("");
      setValor(0);
      setStatus(ProjetoStatus.CONCLUIDO);
      setDataInicio("");
      setisOpen(false);
    } catch (error) {
      console.error(error);
    }
  }
  const inputDesign = `
  h-12
                w-full
                rounded-[10px]
                border
                border-[#2A2A2F]
                bg-[#09090b]
                px-4
                text-xs
                text-white
                outline-none
                transition
                placeholder:text-[#6B7280]
                focus:border-[#f9c715]`;
  const statusStyle = {
    CONCLUIDO: "bg-green-500/10 text-green-400 border border-green-500/20",
    EM_ANDAMENTO:
      "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  };
  const formularioValido =
    descricao.trim() !== "" &&
    nome.trim() !== "" &&
    valor > 0 &&
    dataInicio !== "" &&
    prazoFinalizacao !== "" &&
    status !== undefined;
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-xl rounded-2xl border border-[#222225] bg-[#0E0D11] p-6 flex flex-col gap-4">
            <h2 className="font-bold font-poppins text-white text-xl mb-4">
              Nova Projeto
            </h2>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="descricao"
                  className="mb-2   block text-sm  font-medium text-[#F5F5F5]"
                >
                  Descrição <span className="text-white ">*</span>
                </label>

                <input
                  id="descricao"
                  value={descricao}
                  placeholder="Descrição do projeto"
                  type="text"
                  className={inputDesign}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>
              <div>
                <label
                  htmlFor="valor"
                  className="mb-2 block text-sm  font-medium text-[#F5F5F5]"
                >
                  Valor (R$) <span>*</span>
                </label>

                <div className="flex gap-4 items-center">
                  <input
                    value={valor == 0 ? "" : valor}
                    id="valor"
                    onChange={(e) => setValor(Number(e.target.value))}
                    type="number"
                    placeholder="R$"
                    className={inputDesign}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="data"
                    className="mb-2 block text-sm  font-medium text-[#F5F5F5]"
                  >
                    Data de início
                  </label>

                  <input
                    id="data"
                    type="date"
                    className={inputDesign}
                    onChange={(e) => setDataInicio(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="data_fim"
                    className="mb-2 block text-sm  font-medium text-[#F5F5F5]"
                  >
                    Data de fim
                  </label>

                  <input
                    id="data_fim"
                    type="date"
                    className={inputDesign}
                    onChange={(e) => setPrazoFinalizacao(e.target.value)}
                  />
                </div>
              </div>

              <div className="relative">
                <label className="mb-2 block text-sm font-medium text-white">
                  Status
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setOpenStatus(!openStatus);
                  }}
                  className={`${openStatus ? "border-[#f9c715]" : ""} flex h-12 w-full text-xs items-center justify-between rounded-xl border border-[#27272A] bg-[#09090B] px-4 text-white`}
                >
                  {statusNome(status)}

                  <svg
                    className={`h-4 w-4 transition ${
                      openStatus ? "rotate-180" : ""
                    }`}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="m6 9 6 6 6-6" />
                  </svg>
                </button>

                {openStatus && (
                  <div className="absolute left-0 max-h-40 p-2 overflow-y-auto right-0 top-[calc(100%+6px)] z-50 rounded-xl border border-[#27272A] bg-[#111114] shadow-2xl">
                    {statusList.map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => {
                          setStatus(item.value);
                          setOpenStatus(false);
                        }}
                        className={`flex w-full items-center rounded-lg text-xs justify-between px-3 py-2 text-left text-white transition ${
                          status === item.value
                            ? "bg-[#26262B]"
                            : "hover:bg-[#1A1A1F]"
                        }`}
                      >
                        {item.label}

                        {status === item.value && (
                          <svg
                            className="h-4 w-4"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                          >
                            <path d="m5 13 4 4L19 7" />
                          </svg>
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <button
                  onClick={() => setisOpen(false)}
                  className=" w-full rounded-lg bg-[#09090B] font-poppins font-bold  cursor-pointer border border-[#27272A] flex justify-center text-xs px-3 py-2 text-left text-white transition"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSubmit}
                  disabled={!formularioValido}
                  className={`w-full font-poppins font-bold rounded-lg border flex justify-center text-xs px-3 py-2 text-left transition ${
                    formularioValido
                      ? "cursor-pointer bg-[#F9C715] border-[#F9C715] text-[#09090B]"
                      : "cursor-not-allowed bg-zinc-700 border-zinc-700 text-zinc-400"
                  }`}
                >
                  Criar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      <section className="bg-[#09090B] h-full overflow-y-auto px-5 py-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-white text-2xl font-bold">Projetos</h1>

              <p className="text-zinc-500 text-sm mt-1">
                Acompanhe seus projetos e entregas
              </p>
            </div>

            <button
              onClick={() => setisOpen(!isOpen)}
              className="flex cursor-pointer items-center gap-2 bg-[#FACC15] hover:brightness-95 transition rounded-xl px-4 py-3 text-[#201A06] font-medium text-sm"
            >
              <Plus size={17} />
              Novo Projeto
            </button>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {projetos.map((projeto) => (
              <div
                className="p-6 rounded-2xl border bg-[#0E0D11] flex flex-col"
                key={projeto.id}
              >
                <p className="text-lg font-semibold text-white font-poppins">
                  {projeto.nome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
