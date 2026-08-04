"use client";

import {
  Ban,
  Calendar,
  CheckCircle2,
  CircleDashed,
  Menu,
  Plus,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Projeto, ProjetoStatus } from "../types/user";
import {
  adicionarProjeto,
  atualizarProjeto,
  deletarProjeto,
  listarProjetos,
} from "../services/api";

export default function Projetos() {
  const [projetos, setProjetos] = useState<Projeto[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [nome, setNome] = useState("");
  const [prazoFinalizacao, setPrazoFinalizacao] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [status, setStatus] = useState<ProjetoStatus>(
    ProjetoStatus.EM_ANDAMENTO,
  );

  const [openStatus, setOpenStatus] = useState(false);

  function statusNome(status: ProjetoStatus) {
    switch (status) {
      case ProjetoStatus.CONCLUIDO:
        return "Concluído";

      case ProjetoStatus.EM_ANDAMENTO:
        return "Em andamento";

      default:
        return "Desconhecido";
    }
  }

  const statusList = [
    {
      label: "Concluído",
      value: ProjetoStatus.CONCLUIDO,
    },
    {
      label: "Em andamento",
      value: ProjetoStatus.EM_ANDAMENTO,
    },
  ];

  const statusStyle: Record<ProjetoStatus, string> = {
    [ProjetoStatus.CONCLUIDO]:
      "bg-green-500/10 text-green-400 border border-green-500/20",

    [ProjetoStatus.EM_ANDAMENTO]:
      "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
  };

  useEffect(() => {
    async function carregarProjetos() {
      try {
        const data = await listarProjetos();

        console.log("RETORNO API:", data);

        if (data) {
          setProjetos(data);
        }
      } catch (error) {
        console.error("Erro ao carregar projetos:", error);
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

      console.log("Projeto criado:", projeto);

      setNome("");
      setDescricao("");
      setValor(0);
      setStatus(ProjetoStatus.EM_ANDAMENTO);
      setDataInicio("");
      setPrazoFinalizacao("");
      setOpenStatus(false);
      setIsOpen(false);
    } catch (error) {
      console.error("Erro ao criar projeto:", error);
    }
  }
  async function handleStatusChange(id: number, status: ProjetoStatus) {
    const projetoAtualizado = await atualizarProjeto(id, status);

    if (!projetoAtualizado) {
      console.error("Erro ao atualizar projeto");
      return;
    }

    setProjetos((projetosAtuais) =>
      projetosAtuais.map((projeto) =>
        projeto.id === id ? projetoAtualizado : projeto,
      ),
    );
  }
  async function handleDelectProject(projeto_id: number) {
    const ok = await deletarProjeto(projeto_id);

    if (!ok) {
      console.error("Erro ao deletar projeto");
      return;
    }
    setProjetos((prev) => prev.filter((d) => d.id !== projeto_id));
  }
  const inputDesign = `     h-12
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
    focus:border-[#f9c715]
  `;

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
          <div className="flex w-full max-w-xl flex-col gap-4 rounded-2xl border border-[#222225] bg-[#0E0D11] p-6">
            <h2 className="mb-4 font-poppins text-xl font-bold text-white">
              Novo Projeto{" "}
            </h2>
            <div className="space-y-5">
              <div>
                <label
                  htmlFor="descricao"
                  className="mb-2 block text-sm font-medium text-[#F5F5F5]"
                >
                  Descrição <span className="text-white">*</span>
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
                  htmlFor="nome"
                  className="mb-2 block text-sm font-medium text-[#F5F5F5]"
                >
                  Nome <span className="text-white">*</span>
                </label>

                <input
                  id="nome"
                  value={nome}
                  placeholder="Nome do projeto"
                  type="text"
                  className={inputDesign}
                  onChange={(e) => setNome(e.target.value)}
                />
              </div>

              <div>
                <label
                  htmlFor="valor"
                  className="mb-2 block text-sm font-medium text-[#F5F5F5]"
                >
                  Valor (R$) <span>*</span>
                </label>

                <input
                  id="valor"
                  value={valor === 0 ? "" : valor}
                  onChange={(e) => setValor(Number(e.target.value))}
                  type="number"
                  placeholder="R$"
                  className={inputDesign}
                />
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div>
                  <label
                    htmlFor="data"
                    className="mb-2 block text-sm font-medium text-[#F5F5F5]"
                  >
                    Data de início
                  </label>

                  <input
                    id="data"
                    type="date"
                    value={dataInicio}
                    className={inputDesign}
                    onChange={(e) => setDataInicio(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="data_fim"
                    className="mb-2 block text-sm font-medium text-[#F5F5F5]"
                  >
                    Data de fim
                  </label>

                  <input
                    id="data_fim"
                    type="date"
                    value={prazoFinalizacao}
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
                  onClick={() => setOpenStatus(!openStatus)}
                  className={`${
                    openStatus ? "border-[#f9c715]" : ""
                  } flex h-12 w-full items-center justify-between rounded-xl border border-[#27272A] bg-[#09090B] px-4 text-xs text-white`}
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
                  <div className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 max-h-40 overflow-y-auto rounded-xl border border-[#27272A] bg-[#111114] p-2 shadow-2xl">
                    {statusList.map((item) => (
                      <button
                        key={item.value}
                        type="button"
                        onClick={() => {
                          setStatus(item.value);
                          setOpenStatus(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2 text-left text-xs text-white transition ${
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
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex w-full cursor-pointer justify-center rounded-lg border border-[#27272A] bg-[#09090B] px-3 py-2 text-left text-xs font-bold text-white transition"
                >
                  Cancelar
                </button>

                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!formularioValido}
                  className={`flex w-full justify-center rounded-lg border px-3 py-2 text-left text-xs font-bold transition ${
                    formularioValido
                      ? "cursor-pointer border-[#F9C715] bg-[#F9C715] text-[#09090B]"
                      : "cursor-not-allowed border-zinc-700 bg-zinc-700 text-zinc-400"
                  }`}
                >
                  Criar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <section className="h-full overflow-y-auto bg-[#09090B] px-5 py-10">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-white">Projetos</h1>

              <p className="mt-1 text-sm text-[#939DAA]">
                Acompanhe seus projetos e entregas
              </p>
            </div>

            <button
              onClick={() => setIsOpen(!isOpen)}
              className="flex cursor-pointer items-center gap-2 rounded-xl bg-[#FACC15] px-4 py-3 text-sm font-medium text-[#201A06] transition hover:brightness-95"
            >
              <Plus size={17} />
              Novo Projeto
            </button>
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projetos.map((projeto) => (
              <div
                key={projeto.id}
                className="group flex min-h-[260px] flex-col rounded-2xl border border-[#222225] bg-[#0E0D11] p-6 transition-all duration-200 hover:-translate-y-1 hover:border-[#34343A] hover:bg-[#101014]"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="min-w-0">
                    <p className="truncate font-poppins text-lg font-semibold text-white">
                      {projeto.nome}
                    </p>

                    <p className="mt-1 text-xs font-medium text-[#6B7280]">
                      Projeto
                    </p>
                  </div>
                  <div className="flex relative gap-6 items-center">
                    <span
                      className={`shrink-0 rounded-full border px-3 py-1 font-poppins text-[11px] font-semibold ${
                        statusStyle[projeto.status]
                      }`}
                    >
                      {statusNome(projeto.status)}
                    </span>
                    <button
                      onClick={() =>
                        setOpenMenuId(
                          openMenuId === projeto.id ? null : projeto.id,
                        )
                      }
                      className="flex items-center cursor-pointer justify-center rounded-full w-8 h-8 hover:bg-[#18181B] transition-all"
                    >
                      <Menu size={18} className="text-[#939DAA] " />
                    </button>
                    {openMenuId === projeto.id && (
                      <div className="absolute top-10 right-0 z-50 w-52 rounded-xl border border-[#222225] bg-[#09090B] p-2 shadow-xl">
                        <button
                          onClick={() => (
                            setOpenMenuId(null),
                            handleStatusChange(
                              projeto.id,
                              ProjetoStatus.EM_ANDAMENTO,
                            )
                          )}
                          className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#A1A1AA] transition-all hover:bg-[#18181B] hover:text-white"
                        >
                          <CircleDashed size={18} className="text-yellow-400" />
                          Em andamento
                        </button>

                        <button
                          onClick={() => (
                            setOpenMenuId(null),
                            handleStatusChange(
                              projeto.id,
                              ProjetoStatus.CONCLUIDO,
                            )
                          )}
                          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#A1A1AA] transition-all hover:bg-[#18181B] hover:text-white"
                        >
                          <CheckCircle2
                            size={18}
                            className="text-emerald-500"
                          />
                          Concluído
                        </button>
                        <button
                          onClick={() => (
                            handleDelectProject(projeto.id),
                            setOpenMenuId(null)
                          )}
                          className="mt-1 flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-[#A1A1AA] transition-all hover:bg-[#18181B] hover:text-white"
                        >
                          <Ban size={18} className="text-red-500" />
                          Excluir Projeto
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <p className="mt-5 line-clamp-2 min-h-[40px] font-inter text-sm font-medium leading-5 text-[#939DAA]">
                  {projeto.descricao}
                </p>

                <div className="mt-6 rounded-xl border border-[#222225] bg-[#09090B] px-4 py-3">
                  <span className="block font-inter text-xs font-medium text-[#6B7280]">
                    Valor do projeto
                  </span>

                  <span className="mt-1 block font-poppins text-xl font-bold text-yellow-400">
                    R${" "}
                    {projeto.valor.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </span>
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-[#222225] pt-4">
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#18181C]">
                      <Calendar size={15} className="text-[#939DAA]" />
                    </div>

                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wide text-[#5F636B]">
                        Início
                      </p>

                      <p className="mt-0.5 text-xs font-medium text-[#D1D5DB]">
                        {projeto.dataCriacao}
                      </p>
                    </div>
                  </div>
                  <div className="h-px w-6 bg-[#34343A]" />
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#18181C]">
                      <Calendar size={15} className="text-[#939DAA]" />
                    </div>

                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-wide text-[#5F636B]">
                        Entrega
                      </p>

                      <p className="mt-0.5 text-xs font-medium text-[#D1D5DB]">
                        {projeto.prazoFinalizacao}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
