import { LogIn } from "lucide-react";

export default function Login() {
  return (
    <section className="py-10 px-4 bg-[#09090B] h-screen ">
      <div className="max-w-7xl mx-auto flex flex-col items-center gap-4">
        <div className="w-12 h-12 flex items-center justify-center rounded-lg bg-[#F9C815] text-[#09090B]">
          <LogIn absoluteStrokeWidth size={20} />
        </div>
        <h1 className="text-2xl font-poppins font-semibold text-white">
          Bem-vindo de volta
        </h1>
        <p className="text-lg font-medium font-inter text-[#A1A1AA] ">
          Acesse sua conta
        </p>
      </div>
    </section>
  );
}
