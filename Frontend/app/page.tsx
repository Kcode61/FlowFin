"use client";
import { useEffect, useState } from "react";
import { Receita, ReceitaStatus, user } from "./types/user";
import {
  ArrowUpRight,
  CalendarArrowDown,
  DollarSign,
  LucideIcon,
} from "lucide-react";
import {
  listarAnalisesDoAno,
  listarDespesas,
  listarProjetos,
  listarReceitas,
} from "./services/api";
import { DashboardStats } from "./components/StatCard";
import {
  Area,
  AreaChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { useRouter } from "next/navigation";
type Grafico = {
  mes: string;
  receitas: number;
  despesas: number;
};

export default function Home() {
  const [usuario, setUsuario] = useState<user | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [receitasPendentes, setReceitasPendentes] = useState(0);
  const [totalDespesas, setTotalDespesas] = useState(0);
  const [totalReceitas, setTotalReceitas] = useState(0);
  const [totalProjetos, setTotalProjetos] = useState(0);
  const [pagamentosPendentes, setPagamentosPendentes] = useState(0);
  const [receitas, setReceitas] = useState<Receita[]>([]);

  const [grafico, setGrafico] = useState<Grafico[]>([]);
  useEffect(() => {
    async function carregarReceitas() {
      try {
        setIsLoading(true);
        const dados = await listarReceitas();

        if (dados === false) {
          setError(true);
        } else {
          setReceitas(dados);
        }
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    carregarReceitas();
  }, []);
  useEffect(() => {
    async function carregarReceitas() {
      try {
        setIsLoading(true);
        const dados = await listarReceitas();

        if (dados === false) {
          setError(true);
        } else {
          setReceitas(dados);
        }
      } catch (err) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    }

    carregarReceitas();
  }, []);

  useEffect(() => {
    const carregarReceitasPendentes = async () => {
      try {
        const receitas = await listarReceitas();

        if (!receitas) return;

        const total = receitas.reduce(
          (acc: number, receita: { status: string }) => {
            if (receita.status === "AGUARDANDO") {
              return acc + 1;
            }
            return acc;
          },
          0,
        );

        setReceitasPendentes(total);
      } catch (error) {
        console.error("Erro ao carregar receitas pendentes:", error);
      }
    };

    carregarReceitasPendentes();
  }, []);
  useEffect(() => {
    const carregarTotalDespesas = async () => {
      try {
        const despesas = await listarDespesas();

        if (!despesas) return;

        const total = despesas.reduce(
          (acc: number, despesa: { valor: number }) => acc + despesa.valor,
          0,
        );

        setTotalDespesas(total);
      } catch (error) {
        console.error("Erro ao carregar despesas:", error);
      }
    };

    carregarTotalDespesas();
  }, []);

  useEffect(() => {
    const carregarTotalProjetos = async () => {
      try {
        const projetos = await listarProjetos();

        if (!projetos) return;
        const total = projetos.length;

        setTotalProjetos(total);
      } catch (error) {
        console.error("Erro ao carregar projetos:", error);
      }
    };

    carregarTotalProjetos();
  }, []);
  useEffect(() => {
    const carregarAnalisesDoAno = async () => {
      try {
        const dados = await listarAnalisesDoAno();

        if (!dados) return;

        setGrafico(dados);
      } catch (error) {
        console.error("Erro ao carregar Analises:", error);
      }
    };

    carregarAnalisesDoAno();
  }, []);

  useEffect(() => {
    const pagamentosPendentes = async () => {
      try {
        const projetos = await listarDespesas();

        if (!projetos) return;
        const total = projetos.length;

        setPagamentosPendentes(total);
      } catch (error) {
        console.error("Erro ao carregar pagamentos:", error);
      }
    };

    pagamentosPendentes();
  }, []);
  useEffect(() => {
    const carregarUsuario = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }
        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    carregarUsuario();
  }, []);

  const router = useRouter();
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      router.push("/Login");
    }
  }, []);
  const receitasAguardando = receitas.filter(
    (receita) => receita.receitaStatus === ReceitaStatus.AGUARDANDO,
  );
  return (
    <section className="py-10 px-4 bg-[#09090B] overflow-y-auto h-full ">
      <div className="max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-white">
            Dashboard
          </h1>
          <p className="text-gray-500 text-sm font-inter font-medium">
            Visão geral das suas finanças
          </p>
        </div>
        <div className="py-10">
          <DashboardStats
            totalReceitas={totalReceitas}
            totalDespesas={totalDespesas}
            totalContasReceber={receitasPendentes}
            totalProjetosAtivos={totalProjetos}
            pagamentosPendentes={pagamentosPendentes}
          />
        </div>

        <div className="h-96 w-full rounded-2xl border border-zinc-800 bg-[#0c0c0e] p-6">
          <h2 className="mb-4 text-xl font-poppins font-bold text-white">
            Receitas vs Despesas
          </h2>

          <ResponsiveContainer width="100%" height="85%">
            <AreaChart
              data={grafico}
              margin={{
                top: 10,
                right: 10,
                left: -10,
                bottom: 0,
              }}
            >
              <defs>
                <linearGradient id="receitasGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#eab308" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#eab308" stopOpacity={0.0} />
                </linearGradient>

                <linearGradient id="despesasGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.45} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0.0} />
                </linearGradient>
              </defs>

              <CartesianGrid
                stroke="#27272a"
                strokeDasharray="2 2"
                vertical={true}
                horizontal={true}
              />

              <XAxis
                dataKey="mes"
                tick={{ fill: "#a1a1aa", fontSize: 14 }}
                tickLine={false}
                axisLine={{ stroke: "#27272a" }}
                dy={10}
              />

              <YAxis
                tickFormatter={(v) => `R$${v / 1000}k`}
                tick={{ fill: "#a1a1aa", fontSize: 14 }}
                tickLine={false}
                axisLine={{ stroke: "#27272a" }}
                domain={[0, 28000]}
                ticks={[0, 7000, 14000, 21000, 28000]}
              />

              <Tooltip
                contentStyle={{
                  background: "#18181b",
                  border: "1px solid #27272a",
                  borderRadius: "8px",
                  color: "#fff",
                }}
              />

              <Area
                type="monotone"
                dataKey="receitas"
                stroke="#facc15"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#receitasGrad)"
                dot={false}
                activeDot={{ r: 5, fill: "#facc15" }}
              />

              <Area
                type="monotone"
                dataKey="despesas"
                stroke="#ef4444"
                strokeWidth={2.5}
                fillOpacity={1}
                fill="url(#despesasGrad)"
                dot={false}
                activeDot={{ r: 5, fill: "#EF4444" }}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
        <div className="py-10 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-6 h-96 overflow-y-auto border col-span-2 bg-[#0E0E11] border-[#222225] rounded-2xl">
            <h2 className="mb-4 text-lg flex gap-2 items-center font-poppins font-bold text-white">
              <DollarSign className="text-yellow-400" size={18} />
              Últimas receitas
            </h2>
            {receitas.length > 0 ? (
              <ul>
                {receitas.map((receita) => (
                  <div className="flex items-center gap-3 py-2.5 border-b border-border last:border-0">
                    <div className="w-9 h-9 rounded-lg flex items-center justify-center bg-green-500/10 text-green-500">
                      <ArrowUpRight className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium truncate">
                        Pagamento {receita.receitaStatus} - {receita.categoria}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {receita.dataCriacao}
                      </p>
                    </div>
                    <span className="text-sm font-semibold text-green-500">
                      +R$ {receita.valor}
                    </span>
                  </div>
                ))}
              </ul>
            ) : (
              <div className="flex  items-center justify-center text-center">
                <p className="text-sm font-medium mt-22 font-inter text-[#A1A1AA]">
                  Você ainda não possui nenhuma receita registrada
                </p>
              </div>
            )}
          </div>
          <div className="p-6 h-96 overflow-y-auto border  bg-[#0E0E11] border-[#222225] rounded-2xl">
            <h2 className="mb-4 flex gap-2 items-center text-lg font-poppins font-bold text-white">
              <CalendarArrowDown className="text-yellow-400" size={18} />{" "}
              Próximos pagamentos
            </h2>
            {receitasAguardando.length > 0 ? (
              <ul>
                {receitasAguardando.map((receita) => (
                  <div className="flex items-center justify-between text-sm">
                    <span className="truncate mr-2">
                      Pagamento pendente - {receita.categoria}
                    </span>
                    <span className="font-semibold text-primary">
                      R$ {receita.valor}
                    </span>
                  </div>
                ))}
              </ul>
            ) : (
              <div className="flex  items-center justify-center text-center">
                <p className="text-sm font-medium mt-22 font-inter text-[#A1A1AA]">
                  Você ainda não possui nenhuma pagamento proximo
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
