"use client";
import { user } from "@/app/types/user";
import {
  FolderKanban,
  LogOut,
  TrendingDown,
  TrendingUp,
  User,
  WalletIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export function Sidebar() {
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
      href: "/projetos",
      icon: <FolderKanban className="w-5 h-5" />,
      label: "Projetos",
    },
    {
      href: "/receitas",
      icon: <TrendingUp className="w-5 h-5" />,
      label: "Receitas",
    },
    {
      href: "/despesas",
      icon: <TrendingDown className="w-5 h-5" />,
      label: "Despesas",
    },
    {
      href: "/perfil",
      icon: <User className="w-5 h-5" />,
      label: "Perfil",
    },
  ];

  const pathname = usePathname();

  if (isLoading) {
    return (
      <div className="hidden md:flex w-64 flex-col h-full py-5 bg-[#09090B] border-r border-[#222225]">
        <div className="px-4 flex gap-4 items-center">
          <div className="w-10 h-10 rounded-xl animate-pulse bg-[#222225]" />
          <div className="h-5 w-24 rounded-full bg-[#222225] animate-pulse" />
        </div>
        <div className="h-px w-full bg-[#222225] mt-4 mb-4" />
        <div className="px-4 flex-1">
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
                className="h-10 rounded-xl bg-[#1A1D25] animate-pulse"
              />
            ))}
          </div>
        </div>
        <div className="px-4 py-5 border-t border-[#222225] flex gap-4 items-center">
          <div className="w-10 h-10 rounded-full bg-[#222225] animate-pulse" />
          <div className="flex-1 space-y-2">
            <div className="h-3 w-20 rounded-full bg-[#222225] animate-pulse" />
            <div className="h-3 w-32 rounded-full bg-[#222225] animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  /*{  if (!usuario || error) {
    return null;
  }}*/

  return (
    <div className="hidden md:flex w-64 flex-col h-full py-5 bg-[#09090B] border-r border-[#222225]">
      <div className="px-4 flex gap-4 items-center">
        <div className="w-10 h-10 rounded-xl items-center justify-center flex bg-[#FACC15]">
          <WalletIcon absoluteStrokeWidth className="w-6 h-6 text-[#09090B]" />
        </div>
        <h2 className="text-lg font-poppins font-bold text-white">FlowFin</h2>
      </div>
      <div className="h-px w-full bg-[#222225] mt-4 mb-4"></div>
      <div className="px-4 flex-1">
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
      <div className="px-4 py-5 border-t border-[#222225] flex gap-4 items-center">
        <div className="w-10 h-10 rounded-full flex items-center bg-[#222225] justify-center text-white font-bold font-poppins text-lg">
          {usuario?.nome?.charAt(0).toUpperCase()}
        </div>

        <div className="flex-1">
          <p className="text-sm font-medium text-white">{usuario?.nome}</p>
          <p className="max-w-40 text-xs font-medium text-[#8A93A3] truncate">
            {usuario?.email}
          </p>
        </div>
        <Link href="/login" className="text-[#8A93A3] hover:text-[#EBCC15]">
          <LogOut size={16} />
        </Link>
      </div>
    </div>
  );
}
