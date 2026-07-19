"use client";
import { useEffect, useState } from "react";
import { user } from "../types/user";

export default function Perfil() {
  const [usuario, setUsuario] = useState<user | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
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
  useEffect(() => {
    setUsuario({
      id: 1,
      nome: "Admin",
      email: "admin@email.com",
      password: "",
      cargo: "ADMIN",
    });
  }, []);
  return (
    <section className="py-10 px-4 bg-[#09090B] h-screen ">
      <div className="max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-white">Perfil</h1>
          <p className="text-gray-500 text-sm font-inter font-medium">
            Gerencie suas informações pessoais
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 py-10">
          <div className="flex flex-col gap-6">
            <div className="relative overflow-hidden rounded-2xl border border-[#222225] bg-[#0E0E11] p-6">
              <div className="pointer-events-none absolute -right-10 -top-10 h-32 w-32 rounded-full bg-[#EBCC15]/[0.04] blur-2xl" />

              <div className="relative flex items-center gap-4">
                <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-[#222225] to-[#1A1D25] text-2xl font-bold uppercase text-white">
                  {usuario?.nome?.charAt(0) ?? "U"}
                </div>

                <div className="flex flex-col gap-1.5">
                  <h2 className="text-lg font-bold text-white">
                    {usuario?.nome}
                  </h2>
                  <p className="text-sm font-medium text-gray-400">
                    {usuario?.email}
                  </p>

                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-semibold ${
                        usuario?.cargo === "ADMIN"
                          ? "border-[#473B12] bg-[#191711] text-[#F2C515]"
                          : usuario?.cargo === "USER"
                            ? "border-[#1D4ED8] bg-[#0F172A] text-[#60A5FA]"
                            : "border-zinc-700 bg-zinc-800 text-zinc-300"
                      }`}
                    >
                      {usuario?.cargo}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
