"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import {
  adicionarReceita,
  deletarReceita,
  listarReceitas,
} from "../services/api";
import { Receita, ReceitaCategoria, ReceitaStatus } from "../types/user";

const categoriaStyle = {
  PROJETO: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
  RECORRENTE: "bg-green-500/10 text-green-400 border border-green-500/20",
  CONSULTORIA: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
};
function categoriaNome(categoria: ReceitaCategoria) {
  switch (categoria) {
    case ReceitaCategoria.RECORRENTE:
      return "Recorrente";
    case ReceitaCategoria.PROJETO:
      return "Projeto";
    case ReceitaCategoria.CONSULTORIA:
      return "Consultoria";
  }
}

function statusNome(p: ReceitaStatus) {
  switch (p) {
    case ReceitaStatus.AGUARDANDO:
      return "Aguardando";
    case ReceitaStatus.ATRASADO:
      return "Atrasado";
    case ReceitaStatus.RECEBIDO:
      return "Recebido";
  }
}

export default function Receitas() {
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [isOpen, setisOpen] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [status, setStatus] = useState<ReceitaStatus>(ReceitaStatus.RECEBIDO);
  const [openStatus, setOpenStatus] = useState(false);
  const [categoria, setCategoria] = useState<ReceitaCategoria>(
    ReceitaCategoria.PROJETO,
  );
  const [clienteNome, setClienteNome] = useState("");
  const [dataInicio, setDataInicio] = useState("");
  const [openCategoria, setOpenCategoria] = useState(false);
  const categorias = [
    {
      label: "Projeto",
      value: ReceitaCategoria.PROJETO,
    },
    {
      label: "Recorrente",
      value: ReceitaCategoria.RECORRENTE,
    },
    {
      label: "Consultoria",
      value: ReceitaCategoria.CONSULTORIA,
    },
  ];
  const statusList = [
    {
      label: "Recebido",
      value: ReceitaStatus.RECEBIDO,
    },
    {
      label: "Aguardando",
      value: ReceitaStatus.AGUARDANDO,
    },
    {
      label: "Atrasado",
      value: ReceitaStatus.ATRASADO,
    },
  ];
  useEffect(() => {
    async function carregarReceitas() {
      const data = await listarReceitas();
      console.log("RETORNO API:", data);
      if (data) {
        setReceitas(data);
      }
    }

    carregarReceitas();
  }, []);
  async function DeletarReceita(receita_id: number) {
    const ok = await deletarReceita(receita_id);
    if (!ok) {
      alert("Erro ao excluir");
      return;
    }
    setReceitas((prev) => prev.filter((d) => d.id !== receita_id));
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    try {
      const receita = await adicionarReceita(
        descricao,
        valor,
        clienteNome,
        categoria,
        dataInicio,
        status,
      );

      if (!receita) return;

      const data = await listarReceitas();

      setReceitas(data);

      console.log("Receita criada:", receita);

      setDescricao("");
      setValor(0);
      setClienteNome("");
      setCategoria(ReceitaCategoria.PROJETO);
      setStatus(ReceitaStatus.RECEBIDO);
      setDataInicio("");
      setisOpen(false);
    } catch (error) {
      console.error(error);
    }
  }
  const formularioValido =
    descricao.trim() !== "" &&
    clienteNome.trim() !== "" &&
    valor > 0 &&
    dataInicio !== "" &&
    categoria !== undefined &&
    status !== undefined;
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
    RECEBIDO: "bg-green-500/10 text-green-400 border border-green-500/20",
    AGUARDANDO: "bg-yellow-500/10 text-yellow-400 border border-yellow-500/20",
    ATRASADO: "bg-red-500/10 text-red-400 border border-red-500/20",
  };
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-xl rounded-2xl border border-[#222225] bg-[#0E0D11] p-6 flex flex-col gap-4">
            <h2 className="font-bold font-poppins text-white text-xl mb-4">
              Nova Receita
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
                  placeholder="Descrição da despesa"
                  type="text"
                  className={inputDesign}
                  onChange={(e) => setDescricao(e.target.value)}
                />
              </div>
              <div className="grid grid-cols-2 gap-6">
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

                <div>
                  <label
                    htmlFor="data"
                    className="mb-2 block text-sm  font-medium text-[#F5F5F5]"
                  >
                    Data
                  </label>

                  <input
                    id="data"
                    type="date"
                    className={inputDesign}
                    onChange={(e) => setDataInicio(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="relative">
                  <label className="mb-2 block text-sm font-medium text-white">
                    Categoria
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setOpenCategoria(!openCategoria);
                    }}
                    className={`${openCategoria ? "border-[#f9c715]" : ""} flex h-12  w-full text-xs items-center justify-between rounded-xl border border-[#27272A] bg-[#09090B] px-4 text-white`}
                  >
                    {categoriaNome(categoria)}

                    <svg
                      className={`h-4 w-4 transition ${
                        openCategoria ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {openCategoria && (
                    <div className="absolute left-0 max-h-40 p-2 overflow-y-auto right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-xl border border-[#27272A] bg-[#111114] shadow-2xl">
                      {categorias.map((item) => (
                        <button
                          key={item.value}
                          onClick={() => {
                            setCategoria(item.value);
                            setOpenCategoria(false);
                          }}
                          className={`flex w-full items-center rounded-lg text-xs justify-between px-3 py-2 text-left text-white transition
                    ${categoria === item.value ? "bg-[#26262B]" : "hover:bg-[#1A1A1F]"}`}
                        >
                          {item.label}

                          {categoria === item.value && (
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
                <div>
                  <label className="mb-2 block text-sm font-medium text-white">
                    Cliente
                  </label>

                  <input
                    value={clienteNome}
                    onChange={(e) => setClienteNome(e.target.value)}
                    placeholder="Nome do cliente"
                    className={inputDesign}
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
                    setOpenCategoria(false);
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
              <h1 className="text-white text-2xl font-bold">Receitas</h1>

              <p className="text-zinc-500 text-sm mt-1">
                Controle seus gastos e custos operacionais
              </p>
            </div>

            <button
              onClick={() => setisOpen(!isOpen)}
              className="flex cursor-pointer items-center gap-2 bg-[#FACC15] hover:brightness-95 transition rounded-xl px-4 py-3 text-[#201A06] font-medium text-sm"
            >
              <Plus size={17} />
              Nova receita
            </button>
          </div>

          <div className="overflow-x-auto rounded-xl border border-[#222225]">
            <table className="w-full border-collapse">
              <thead className="bg-[#0E0E11]">
                <tr className="border-b border-[#222225]">
                  <th className="text-left px-8 py-3 text-[#a1a1aa] text-sm font-medium">
                    Descrição
                  </th>
                  <th className="text-left px-8 py-3 text-[#a1a1aa] text-sm font-medium">
                    cliente
                  </th>
                  <th className="text-left px-8 py-3 text-[#a1a1aa] text-sm font-medium">
                    Categoria
                  </th>

                  <th className="text-left px-8 py-3 text-[#a1a1aa] text-sm font-medium">
                    Valor
                  </th>

                  <th className="text-left px-8 py-3 text-[#a1a1aa] text-sm font-medium">
                    Data
                  </th>

                  <th className="text-left px-8 py-3 text-[#a1a1aa] text-sm font-medium">
                    Status
                  </th>
                  <th className="text-left px-8 py-3 text-[#a1a1aa] text-sm font-medium">
                    Deletar
                  </th>
                </tr>
              </thead>

              <tbody>
                {receitas.map((receita) => (
                  <tr
                    key={receita.id}
                    className="border-b bg-[#0E0E11] hover:bg-[#111113] border-[#222225] transition"
                  >
                    <td className="px-6 py-5">
                      <span className="font-semibold text-white">
                        {receita.descricao}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className="font-semibold text-sm text-zinc-300">
                        {receita.clienteNome}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          categoriaStyle[receita.categoria]
                        }`}
                      >
                        {categoriaNome(receita.categoria)}
                      </span>
                    </td>

                    <td className="px-6 py-5 font-bold text-sm text-green-400 whitespace-nowrap">
                      +{" "}
                      {receita.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>

                    <td className="px-6 py-5 text-sm text-zinc-300 whitespace-nowrap">
                      {new Date(receita.dataCriacao).toLocaleDateString(
                        "pt-BR",
                      )}
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          statusStyle[receita.receitaStatus]
                        }`}
                      >
                        {statusNome(receita.receitaStatus)}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <button
                        className=" rounded-full w-10 h-10 cursor-pointer hover:bg-[#222225]/30 transition ease duration-300 flex items-center  justify-center text-[#E83F3C]"
                        onClick={() => DeletarReceita(receita.id)}
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-[#0E0E11] w-full px-6 py-5"></div>
          </div>
        </div>
      </section>
    </>
  );
}
