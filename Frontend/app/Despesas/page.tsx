"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";
import { Despesa, DespesaCategoria, DespesaPagamento } from "../types/user";
import {
  adicionarDespesa,
  deletarDespesa,
  listarDespesas,
} from "../services/api";

const categoriaStyle = {
  IMPOSTO: "bg-red-500/10 text-red-500 border border-red-500/20",
  EDUCACAO: "bg-green-500/10 text-green-400 border border-green-500/20",
  EQUIPAMENTO: "bg-violet-500/10 text-violet-400 border border-violet-500/20",
  MARKETING: "bg-orange-500/10 text-orange-400 border border-orange-500/20",
  SOFTWARE: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
  ESCRITORIO: "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20",
  ALIMENTACAO:
    "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
  LAZER: "bg-pink-500/10 text-pink-400 border border-pink-500/20",
};

function categoriaNome(categoria: DespesaCategoria) {
  switch (categoria) {
    case DespesaCategoria.IMPOSTO:
      return "Imposto";
    case DespesaCategoria.EDUCACAO:
      return "Educação";
    case DespesaCategoria.EQUIPAMENTO:
      return "Equipamento";
    case DespesaCategoria.MARKETING:
      return "Marketing";
    case DespesaCategoria.SOFTWARE:
      return "Software";
    case DespesaCategoria.ESCRITORIO:
      return "Escritório";
    case DespesaCategoria.ALIMENTACAO:
      return "Alimentação";
    case DespesaCategoria.LAZER:
      return "Lazer";
  }
}

function pagamentoNome(p: DespesaPagamento) {
  switch (p) {
    case DespesaPagamento.BOLETO:
      return "Boleto";
    case DespesaPagamento.PIX:
      return "Pix";
    case DespesaPagamento.CARTAO:
      return "Cartão";
    case DespesaPagamento.DINHEIRO:
      return "Dinheiro";
  }
}

export default function Despesas() {
  const [despesas, setDespesas] = useState<Despesa[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const [descricao, setDescricao] = useState("");
  const [valor, setValor] = useState(0);
  const [dataInicio, setDataInicio] = useState("");
  const [openCategoria, setOpenCategoria] = useState(false);
  const [categoria, setCategoria] = useState("IMPOSTO");
  const [openPagamento, setOpenPagamento] = useState(false);
  const [pagamento, setPagamento] = useState("PIX");
  const categorias = [
    {
      label: "Software",
      value: "SOFTWARE",
    },
    {
      label: "Equipamento",
      value: "EQUIPAMENTO",
    },
    {
      label: "Marketing",
      value: "MARKETING",
    },
    {
      label: "Imposto",
      value: "IMPOSTO",
    },
    {
      label: "Escritório",
      value: "ESCRITORIO",
    },
    {
      label: "Educação",
      value: "EDUCACAO",
    },
  ];
  const pagamentos = [
    {
      label: "Pix",
      value: "PIX",
    },
    {
      label: "Cartão",
      value: "CARTAO",
    },
    {
      label: "Dinheiro",
      value: "DINHEIRO",
    },
    {
      label: "Boleto",
      value: "BOLETO",
    },
  ];
  useEffect(() => {
    async function carregarDespesas() {
      try {
        setIsLoading(true);
        const data = await listarDespesas();

        if (data) {
          setDespesas(data);
        }
      } catch (err) {
        console.error(err);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    carregarDespesas();
  }, []);
  async function DeletarDespesas(despesa_id: number) {
    setIsLoading(true);
    try {
      const ok = await deletarDespesa(despesa_id);
      if (!ok) {
        setError(true);
        alert("Erro ao excluir");
        return;
      }
      setDespesas((prev) => prev.filter((d) => d.id !== despesa_id));
    } catch (err) {
      console.error(err);
      setError(true);
      alert("Erro ao excluir");
    } finally {
      setIsLoading(false);
    }
  }
  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    try {
      const despesa = await adicionarDespesa(
        descricao,
        valor,
        pagamento,
        categoria,
        dataInicio,
      );

      if (!despesa) return;

      const data = await listarDespesas();
      setDespesas(data);

      console.log("Despesa criada:", despesa);

      setDescricao("");
      setValor(0);
      setPagamento("PIX");
      setCategoria("IMPOSTO");
      setDataInicio("");
      setisOpen(false);
    } catch (err) {
      console.error(err);
      setError(true);
    } finally {
      setIsLoading(false);
    }
  }

  const formularioValido =
    descricao.trim() !== "" &&
    valor > 0 &&
    dataInicio !== "" &&
    categoria !== "" &&
    pagamento !== "";
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
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-xl rounded-2xl border border-[#222225] bg-[#0E0D11] p-6 flex flex-col gap-4">
            <h2 className="font-bold font-poppins text-white text-xl mb-4">
              Nova Despesa
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
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
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
                      setOpenPagamento(false);
                    }}
                    className={`${openCategoria ? "border-[#f9c715]" : ""} flex h-12  w-full text-xs items-center justify-between rounded-xl border border-[#27272A] bg-[#09090B] px-4 text-white`}
                  >
                    {categoriaNome(categoria as DespesaCategoria)}

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
                <div className="relative">
                  <label className="mb-2 block text-sm font-medium text-white">
                    Forma de pagamento
                  </label>

                  <button
                    type="button"
                    onClick={() => {
                      setOpenCategoria(false);
                      setOpenPagamento(!openPagamento);
                    }}
                    className={`${openPagamento ? "border-[#f9c715]" : ""} flex h-12  w-full text-xs items-center justify-between rounded-xl border border-[#27272A] bg-[#09090B] px-4 text-white`}
                  >
                    {pagamentoNome(pagamento as DespesaPagamento)}

                    <svg
                      className={`h-4 w-4 transition ${
                        openPagamento ? "rotate-180" : ""
                      }`}
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                    >
                      <path d="m6 9 6 6 6-6" />
                    </svg>
                  </button>

                  {openPagamento && (
                    <div className="absolute left-0 max-h-40 p-2 overflow-y-auto right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-xl border border-[#27272A] bg-[#111114] shadow-2xl">
                      {pagamentos.map((item) => (
                        <button
                          key={item.value}
                          onClick={() => {
                            setPagamento(item.value);
                            setOpenPagamento(false);
                          }}
                          className={`flex w-full items-center rounded-lg text-xs justify-between px-3 py-2 text-left text-white transition
                    ${pagamento === item.value ? "bg-[#26262B]" : "hover:bg-[#1A1A1F]"}`}
                        >
                          {item.label}

                          {pagamento === item.value && (
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
          <div className="flex flex-col gap-4 justify-between items-start md:flex-row md:items-center mb-8">
            <div>
              <h1 className="text-white text-2xl font-bold">Despesas</h1>

              <p className="text-zinc-500 text-sm mt-1">
                Controle seus gastos e custos operacionais
              </p>
            </div>

            <button
              onClick={() => setisOpen(!isOpen)}
              className="flex cursor-pointer items-center gap-2 bg-[#FACC15] hover:brightness-95 transition rounded-xl px-4 py-3 text-[#201A06] font-medium text-sm"
            >
              <Plus size={17} />
              Nova despesa
            </button>
          </div>

          <div className="hidden md:block overflow-x-auto rounded-xl border border-[#222225]">
            <table className="min-w-full border-collapse">
              <thead className="bg-[#0E0E11]">
                <tr className="border-b border-[#222225]">
                  <th className="text-left px-8 py-3 text-[#a1a1aa] text-sm font-medium">
                    Descrição
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
                    Pagamento
                  </th>
                  <th className="text-left px-8 py-3 text-[#a1a1aa] text-sm font-medium">
                    Deletar
                  </th>
                </tr>
              </thead>

              <tbody>
                {despesas.map((despesa) => (
                  <tr
                    key={despesa.id}
                    className="border-b bg-[#0E0E11] hover:bg-[#111113] border-[#222225] transition"
                  >
                    <td className="px-6 py-5">
                      <span className="font-semibold text-white">
                        {despesa.descricao}
                      </span>
                    </td>

                    <td className="px-6 py-5">
                      <span
                        className={`inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                          categoriaStyle[despesa.categoria]
                        }`}
                      >
                        {categoriaNome(despesa.categoria)}
                      </span>
                    </td>

                    <td className="px-6 py-5 font-bold text-sm text-[#E83F3C] whitespace-nowrap">
                      -{" "}
                      {despesa.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </td>

                    <td className="px-6 py-5 text-sm text-zinc-300 whitespace-nowrap">
                      {new Date(despesa.dataCriacao).toLocaleDateString(
                        "pt-BR",
                      )}
                    </td>

                    <td className="px-6 py-5 text-zinc-300">
                      {pagamentoNome(despesa.despesaPagamento)}
                    </td>
                    <td className="px-6 py-5">
                      <button
                        className=" rounded-full w-10 h-10 cursor-pointer hover:bg-[#222225]/30 transition ease duration-300 flex items-center  justify-center text-[#E83F3C]"
                        onClick={() => DeletarDespesas(despesa.id)}
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

          <div className="flex flex-col gap-3 md:hidden">
            {despesas.map((despesa) => (
              <div
                key={despesa.id}
                className="rounded-xl border border-[#222225] bg-[#0E0E11] p-4"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-white">
                      {despesa.descricao}
                    </p>
                    <span
                      className={`mt-2 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${
                        categoriaStyle[despesa.categoria]
                      }`}
                    >
                      {categoriaNome(despesa.categoria)}
                    </span>
                  </div>

                  <button
                    className="flex h-10 w-10 items-center justify-center rounded-full text-[#E83F3C] transition hover:bg-[#222225]/30"
                    onClick={() => DeletarDespesas(despesa.id)}
                  >
                    <Trash2 size={18} />
                  </button>
                </div>

                <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-[#a1a1aa]">Valor</p>
                    <p className="mt-1 font-bold text-[#E83F3C]">
                      -{" "}
                      {despesa.valor.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </p>
                  </div>
                  <div>
                    <p className="text-[#a1a1aa]">Data</p>
                    <p className="mt-1 text-zinc-300">
                      {new Date(despesa.dataCriacao).toLocaleDateString(
                        "pt-BR",
                      )}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <p className="text-[#a1a1aa]">Pagamento</p>
                    <p className="mt-1 text-zinc-300">
                      {pagamentoNome(despesa.despesaPagamento)}
                    </p>
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
