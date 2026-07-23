"use client";
import { useEffect, useState } from "react";
import { user } from "../types/user";
import { Check, Mail, Shield, Trash2, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { deletarUsuario } from "../services/api";

export default function Perfil() {
  const [usuario, setUsuario] = useState<user | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isOpen, setisOpen] = useState(false);
  const router = useRouter();
  async function handleDeleteAccount() {
    const confirmar = window.confirm(
      "Tem certeza que deseja excluir sua conta? Essa ação é irreversível.",
    );

    if (!confirmar) return;

    const response = await deletarUsuario();

    if (!response) {
      alert("Não foi possível excluir sua conta.");
      return;
    }

    localStorage.removeItem("token");

    router.push("/Login");
  }
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

  return (
    <section className="py-10 px-4 bg-[#09090B] h-screen ">
      <div className="max-w-7xl mx-auto">
        <div>
          <h1 className="text-2xl font-bold font-poppins text-white">Perfil</h1>
          <p className="text-gray-500 text-sm font-inter font-medium">
            Gerencie suas informações pessoais
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-10">
          <div className="flex flex-col gap-6 col-span-2">
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
                  <div className="flex gap-2 text-[#a1a1aa] items-center">
                    <Mail size={18} />
                    <p className="text-sm font-medium">{usuario?.email}</p>
                  </div>

                  <div className="mt-1 flex items-center gap-2">
                    <span
                      className={`inline-flex items-center rounded-lg border px-2.5 py-1 text-[11px] font-semibold ${
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
            <div className="p-6 rounded-xl flex flex-col gap-4 bg-[#0E0E11] border border-[#371316]">
              <div className="flex gap-2 items-center text-[#C92322]">
                <Shield size={18} />
                <h2 className="text-lg font-bold font-poppins">
                  Zona de perigo
                </h2>
              </div>
              <p className="text-sm text-[#a1a1aa]">
                A exclusão da conta é permanente e não pode ser desfeita. Todos
                os seus dados serão removidos.
              </p>
              <button
                onClick={() => setisOpen(!isOpen)}
                className="flex gap-4 font-semibold w-fit text-sm py-3 px-4 border rounded-lg border-[#371316] text-[#C92322] cursor-pointer hover:scale-95 transition ease duration-300 items-center"
              >
                <Trash2 size={18} />
                Excluir conta
              </button>

              {isOpen && (
                <>
                  <p className="text-sm mt-4 mb-4 text-[#a1a1aa]">
                    Você tem certeza que deseja excluir sua conta?
                  </p>
                  <div className="flex gap-4 items-center">
                    <button
                      onClick={handleDeleteAccount}
                      className="flex gap-4 font-semibold w-fit text-sm py-3 px-4 border rounded-lg border-[#371316] text-[#C92322] cursor-pointer hover:scale-95 transition ease duration-300 items-center"
                    >
                      <Check size={18} />
                      Sim
                    </button>
                    <button
                      onClick={() => setisOpen(false)}
                      className="flex gap-4 font-semibold w-fit text-sm py-3 px-4 border rounded-lg border-[#371316] text-[#C92322] cursor-pointer hover:scale-95 transition ease duration-300 items-center"
                    >
                      <X size={18} />
                      Não
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
