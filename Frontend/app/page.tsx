"use client";
import { useEffect, useState } from "react";
import { user } from "./types/user";
import { LucideIcon } from "lucide-react";
import {
  listarAnalisesDoAno,
  listarDespesas,
  listarProjetos,
  listarReceitas,
} from "./services/api";
import { DashboardStats } from "./components/StatCard";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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

  const [grafico, setGrafico] = useState<Grafico[]>([]);
  useEffect(() => {
    const carregarTotalReceitas = async () => {
      try {
        const receitas = await listarReceitas();

        if (!receitas) return;

        const total = receitas.reduce(
          (acc: number, receita: { status: string; valor: number }) => {
            if (receita.status === "concluida") {
              return acc + receita.valor;
            }
            return acc;
          },
          0,
        );

        setTotalReceitas(total);
      } catch (error) {
        console.error("Erro ao carregar receitas:", error);
      }
    };

    carregarTotalReceitas();
  }, []);
  useEffect(() => {
    const carregarReceitasPendentes = async () => {
      try {
        const receitas = await listarReceitas();

        if (!receitas) return;

        const total = receitas.reduce(
          (acc: number, receita: { status: string }) => {
            if (receita.status === "pendente") {
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
    setUsuario({
      id: 1,
      nome: "Admin",
      email: "admin@email.com",
      password: "",
      cargo: "ADMIN",
      receitas: [
        {
          id: 1,
          descricao: "Desenvolvimento de Landing Page",
          valor: 850.0,
          dataCriacao: "2026-07-19",
          categoria: "SERVICOS",
          clienteNome: "João Silva",
          receitaStatus: "RECEBIDA",
        },
      ],
      projetos: [],
      despesas: [
        {
          id: 1,
          categoria: "ALIMENTACAO",
          despesaPagamento: "PIX",
          dataCriacao: "2026-07-19",
          descricao: "Almoço",
          valor: 42.9,
        },
      ],
    });
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
          `${process.env.NEXT_PUBLIC_API_URL}/api/user/me`,
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
  const data = [
    {
      mes: "Fev",
      receitas: 0,
      despesas: 0,
    },
    {
      mes: "Mar",
      receitas: 7000,
      despesas: 0,
    },
    {
      mes: "Abr",
      receitas: 9500,
      despesas: 0,
    },
    {
      mes: "Mai",
      receitas: 12000,
      despesas: 2500,
    },
    {
      mes: "Jun",
      receitas: 26500,
      despesas: 4570,
    },
    {
      mes: "Jul",
      receitas: 27800,
      despesas: 15000,
    },
  ];
  return (
    <section className="py-10 px-4 bg-[#09090B] h-screen ">
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
        <div className="h-80 w-full rounded-xl bg-[#1A1A1A] p-6">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={grafico}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="mes" />
              <YAxis />
              <Tooltip />
              <Line dataKey="receitas" stroke="#FFD600" type="monotone" />

              <Line dataKey="despesas" stroke="#FF3B3B" type="monotone" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </section>
  );
}
