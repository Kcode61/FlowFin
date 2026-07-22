"use client";
import { LogIn, Mail, Lock, User, UserCircle2 } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { loginResponse, registrarResponse } from "../services/api";

export default function Register() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [nome, setNome] = useState("");
  const [Error, setError] = useState(false);
  const router = useRouter();

  async function fazerRegistro(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(false);

    try {
      await registrarResponse(email, senha, nome);

      const token = await loginResponse(email, senha);

      localStorage.setItem("token", token);

      router.push("/");
    } catch {
      setError(true);
    }
  }
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      router.push("/");
    }
  }, []);
  return (
    <section className="min-h-screen bg-[#09090B] flex items-center justify-center px-4">
      <div className="w-full max-w-md">
        <div className="flex flex-col items-center gap-4 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-[#F9C815] flex items-center justify-center">
            <User className="text-[#09090B]" size={28} strokeWidth={2.5} />
          </div>

          <div className="text-center">
            <h1 className="text-3xl font-semibold text-white font-poppins">
              Crie sua conta
            </h1>

            <p className="text-[#A1A1AA] mt-2 font-inter">
              Cadastre-se para começar
            </p>
          </div>
        </div>

        <div className="rounded-2xl border border-[#232326] bg-[#0D0D10] p-8">
          <div className="flex items-center gap-4 my-4">
            <div className="flex-1 h-px bg-[#2A2A2F]" />

            <span className="text-[#71717A] text-sm">Faça login</span>

            <div className="flex-1 h-px bg-[#2A2A2F]" />
          </div>

          <form className="space-y-5" onSubmit={fazerRegistro}>
            <div>
              <label className="block text-white mb-2 font-medium">Nome</label>

              <div className="relative">
                <UserCircle2
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]"
                />

                <input
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  type="text"
                  placeholder="Seu nome"
                  className="w-full h-14 rounded-xl bg-transparent border border-[#2A2A2F] pl-12 pr-4 text-white placeholder:text-[#71717A] outline-none focus:border-[#F9C815] transition"
                />
              </div>
            </div>
            <div>
              <label className="block text-white mb-2 font-medium">Email</label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]"
                />

                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="voce@email.com"
                  className="w-full h-14 rounded-xl bg-transparent border border-[#2A2A2F] pl-12 pr-4 text-white placeholder:text-[#71717A] outline-none focus:border-[#F9C815] transition"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-[#71717A]"
                />

                <input
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="w-full h-14 rounded-xl bg-transparent border border-[#2A2A2F] pl-12 pr-4 text-white placeholder:text-[#71717A] outline-none focus:border-[#F9C815] transition"
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full h-12 cursor-pointer rounded-xl bg-[#F9C815] font-semibold text-[#09090B] transition hover:bg-[#ffd53b] mt-2"
            >
              Criar conta
            </button>
          </form>
        </div>

        <div className="mt-8 text-center">
          <p className="text-[#A1A1AA]">
            Ja possui uma conta?{" "}
            <a
              href="/Login"
              className="text-[#F9C815] font-medium hover:underline"
            >
              Faça login
            </a>
          </p>
          {Error && (
            <p className="text-red-400 font-bold text-sm mt-3">
              Erro ao logar, verifique o email ou a senha
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
