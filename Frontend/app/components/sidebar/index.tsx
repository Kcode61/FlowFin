"use client";

import { user } from "@/app/types/user";
import {
  adicionarListenerMudancaDeAuth,
  emitirMudancaDeAuth,
  removerListenerMudancaDeAuth,
} from "@/app/utils/auth-events";
import {
  FolderKanban,
  LogOut,
  Menu,
  TrendingDown,
  TrendingUp,
  User,
  WalletIcon,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function Sidebar() {
  const [usuario, setUsuario] = useState<user | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const carregarUsuario = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setUsuario(null);
        setError(false);
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/me`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        if (!response.ok) {
          throw new Error("Failed to fetch user data");
        }

        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        setUsuario(null);
        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    carregarUsuario();

    const handleAuthChange = () => {
      carregarUsuario();
    };

    adicionarListenerMudancaDeAuth(handleAuthChange);
    return () => {
      removerListenerMudancaDeAuth(handleAuthChange);
    };
  }, []);

  const router = useRouter();
  function handleLogout() {
    localStorage.removeItem("token");
    emitirMudancaDeAuth();
    router.push("/Login");
  }
  const menuLinks: {
    href: string;
    icon: React.ReactNode;
    label: string;
  }[] = [
    {
      href: "/",
      icon: <WalletIcon className="w-5 h-5" />,
      label: "Dashboard",
    },
    {
      href: "/Projetos",
      icon: <FolderKanban className="w-5 h-5" />,
      label: "Projetos",
    },
    {
      href: "/Receitas",
      icon: <TrendingUp className="w-5 h-5" />,
      label: "Receitas",
    },
    {
      href: "/Despesas",
      icon: <TrendingDown className="w-5 h-5" />,
      label: "Despesas",
    },
    {
      href: "/Perfil",
      icon: <User className="w-5 h-5" />,
      label: "Perfil",
    },
  ];

  const pathname = usePathname();

  if (isLoading) {
    return (
      <div className="hidden h-full w-64 flex-col border-r border-[#222225] bg-[#09090B] py-5 lg:flex">
        <div className="flex items-center gap-4 px-4">
          <div className="h-10 w-10 animate-pulse rounded-xl bg-[#222225]" />
          <div className="h-5 w-24 animate-pulse rounded-full bg-[#222225]" />
        </div>

        <div className="mb-4 mt-4 h-px w-full bg-[#222225]" />

        <div className="flex-1 px-4">
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-10 animate-pulse rounded-xl bg-[#1A1D25]"
              />
            ))}
          </div>
        </div>

        <div className="flex items-center gap-4 border-t border-[#222225] px-4 py-5">
          <div className="h-10 w-10 animate-pulse rounded-full bg-[#222225]" />

          <div className="flex-1 space-y-2">
            <div className="h-3 w-20 animate-pulse rounded-full bg-[#222225]" />
            <div className="h-3 w-32 animate-pulse rounded-full bg-[#222225]" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <aside className="hidden h-full w-64 flex-col border-r border-[#222225] bg-[#09090B] py-5 lg:flex">
        <div className="flex items-center gap-4 px-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FACC15]">
            <WalletIcon
              absoluteStrokeWidth
              className="h-6 w-6 text-[#09090B]"
            />
          </div>

          <h2 className="font-poppins text-lg font-bold text-white">FlowFin</h2>
        </div>

        <div className="mb-4 mt-4 h-px w-full bg-[#222225]" />

        <div className="flex-1 px-4">
          <nav>
            <ul className="space-y-2">
              {menuLinks.map((link) => (
                <Link
                  href={link.href}
                  key={link.href}
                  className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200 ease-out ${
                    pathname === link.href
                      ? "bg-[#1A1D25] text-[#EBCC15]"
                      : "text-[#8A93A3] hover:bg-[#15171E] hover:text-white"
                  }`}
                >
                  {pathname === link.href && (
                    <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-[#EBCC15]" />
                  )}

                  <span
                    className={`shrink-0 transition-colors duration-200 ${
                      pathname === link.href
                        ? "text-[#EBCC15]"
                        : "text-[#8A93A3] group-hover:text-white"
                    }`}
                  >
                    {link.icon}
                  </span>

                  {link.label}
                </Link>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4 border-t border-[#222225] px-4 py-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#222225] font-poppins text-lg font-bold text-white">
            {usuario?.nome?.charAt(0).toUpperCase()}
          </div>

          <div className="flex-1">
            <p className="text-sm font-medium text-white">{usuario?.nome}</p>

            <p className="max-w-40 truncate text-xs font-medium text-[#8A93A3]">
              {usuario?.email}
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="text-[#8A93A3] transition-colors hover:text-[#EBCC15]"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>

      <header className="flex w-full items-center justify-between border-b border-[#222225] bg-[#09090B] px-4 py-5 lg:hidden">
        <div className="flex items-center gap-4">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FACC15]">
            <WalletIcon
              absoluteStrokeWidth
              className="h-6 w-6 text-[#09090B]"
            />
          </div>

          <h2 className="font-poppins text-lg font-bold text-white">FlowFin</h2>
        </div>

        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="flex h-10 w-10 items-center justify-center rounded-xl text-[#8A93A3] transition-colors hover:bg-[#15171E] hover:text-white"
          aria-label="Abrir menu"
        >
          <Menu size={22} />
        </button>
      </header>

      <div
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-black/70 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen
            ? "pointer-events-auto opacity-100"
            : "pointer-events-none opacity-0"
        }`}
      />

      <aside
        className={`fixed right-0 top-0 z-50 flex h-screen w-[280px] flex-col border-l border-[#222225] bg-[#09090B] transition-transform duration-300 ease-in-out lg:hidden ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-[#222225] px-5 py-5">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#FACC15]">
              <WalletIcon className="h-6 w-6 text-[#09090B]" />
            </div>

            <h2 className="font-poppins text-lg font-bold text-white">
              FlowFin
            </h2>
          </div>

          <button
            onClick={() => setIsOpen(false)}
            className="flex h-9 w-9 items-center justify-center rounded-xl text-[#8A93A3] transition-colors hover:bg-[#15171E] hover:text-white"
            aria-label="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 px-4 py-5">
          <ul className="space-y-2">
            {menuLinks.map((link) => (
              <Link
                href={link.href}
                key={link.href}
                onClick={() => setIsOpen(false)}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${
                  pathname === link.href
                    ? "bg-[#1A1D25] text-[#EBCC15]"
                    : "text-[#8A93A3] hover:bg-[#15171E] hover:text-white"
                }`}
              >
                {pathname === link.href && (
                  <span className="absolute left-0 top-1/2 h-6 w-1 -translate-y-1/2 rounded-r-full bg-[#EBCC15]" />
                )}

                <span
                  className={
                    pathname === link.href
                      ? "text-[#EBCC15]"
                      : "text-[#8A93A3] transition-colors group-hover:text-white"
                  }
                >
                  {link.icon}
                </span>

                {link.label}
              </Link>
            ))}
          </ul>
        </nav>

        <div className="border-t border-[#222225] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#222225] font-poppins font-bold text-white">
              {usuario?.nome?.charAt(0).toUpperCase()}
            </div>

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-medium text-white">
                {usuario?.nome}
              </p>

              <p className="truncate text-xs text-[#8A93A3]">
                {usuario?.email}
              </p>
            </div>

            <Link
              href="/Login"
              onClick={handleLogout}
              className="flex h-9 w-9 items-center justify-center rounded-xl text-[#8A93A3] transition-colors hover:bg-[#15171E] hover:text-[#EBCC15]"
            >
              <LogOut size={18} />
            </Link>
          </div>
        </div>
      </aside>
    </>
  );
}
