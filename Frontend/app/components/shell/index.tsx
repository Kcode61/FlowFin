"use client";

import { useEffect, useState } from "react";

import { Sidebar } from "../sidebar";

export function Shell({ children }: { children: React.ReactNode }) {
  const [isLogged, setIsLogged] = useState<boolean | null>(null);

  useEffect(() => {
    const syncAuth = () => {
      setIsLogged(Boolean(localStorage.getItem("token")));
    };

    syncAuth();

    window.addEventListener("auth-change", syncAuth);

    return () => {
      window.removeEventListener("auth-change", syncAuth);
    };
  }, []);

  if (isLogged === null) {
    return <main className="flex-1">{children}</main>;
  }

  return (
    <>
      {isLogged ? <Sidebar /> : null}
      <main className="flex-1">{children}</main>
    </>
  );
}
