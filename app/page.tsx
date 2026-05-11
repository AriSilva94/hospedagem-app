"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/cn";

const MOCK_EMAIL = "teste@teste.com.br";
const MOCK_PASSWORD = "Teste123**";

export default function Home() {
  const router = useRouter();
  const [tab, setTab] = useState<"signup" | "signin">("signup");
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    if (email.trim().toLowerCase() === MOCK_EMAIL && password === MOCK_PASSWORD) {
      router.push("/boas-vindas");
      return;
    }
    setError("E-mail ou senha incorretos. Tente novamente.");
  }

  return (
    <div className="flex flex-1 flex-col bg-bg">
      <Header />

      <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-12 px-6 py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:px-10 lg:py-24">
        {/* Hero */}
        <section className="flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-ink" />
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-2">
              Para anfitriões com história
            </span>
          </div>

          <h1 className="mt-6 font-serif text-[64px] leading-[1.05] tracking-tight text-ink">
            A operação{" "}
            <span className="italic text-accent">se cuida.</span> Você recebe.
          </h1>

          <p className="mt-6 max-w-lg text-[17px] leading-[1.55] text-ink-2">
            Da chave ao check-out, tudo orquestrado. Aja é o sistema operacional
            dos anfitriões que tratam hospedar como ofício.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-5">
            <button className="inline-flex h-12 items-center gap-2 rounded-full bg-accent px-6 text-[15px] font-medium text-white shadow-sm transition-colors hover:bg-accent-hover">
              Comece grátis <span aria-hidden>→</span>
            </button>
            <button className="inline-flex items-center gap-2 text-[15px] font-medium text-ink hover:text-accent">
              Ver demonstração <span aria-hidden>▸</span>
            </button>
          </div>

          <div className="mt-10 h-px w-full max-w-xl bg-line" />

          <dl className="mt-8 flex flex-wrap gap-10">
            <Stat value="2.400+" label="imóveis ativos" />
            <Stat value="38%" label="de ocupação extra" />
            <Stat value="7 dias" label="para sair do papel" />
          </dl>
        </section>

        {/* Auth card */}
        <section className="flex items-start justify-center lg:justify-end">
          <div className="w-full max-w-md rounded-3xl border border-line bg-bg-card p-7 shadow-lg">
            {/* Tabs */}
            <div className="flex rounded-full bg-accent-soft p-1">
              <TabButton active={tab === "signup"} onClick={() => setTab("signup")}>
                Criar conta
              </TabButton>
              <TabButton active={tab === "signin"} onClick={() => setTab("signin")}>
                Entrar
              </TabButton>
            </div>

            <h2 className="mt-6 font-serif text-[26px] leading-tight text-ink">
              Comece em minutos.
            </h2>
            <p className="mt-1 text-[13.5px] text-ink-3">
              Sem cartão de crédito. Cancele quando quiser.
            </p>

            <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
              <Field label="E-mail profissional">
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@suacasa.com.br"
                  className="h-11 w-full rounded-xl border border-line-strong bg-bg-card px-4 text-[14px] text-ink outline-none placeholder:text-ink-4 focus:border-accent focus:ring-4 focus:ring-accent-soft"
                />
              </Field>

              <Field label={tab === "signup" ? "Crie uma senha" : "Senha"}>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    className="h-11 w-full rounded-xl border border-line-strong bg-bg-card px-4 pr-20 text-[14px] text-ink outline-none placeholder:text-ink-4 focus:border-accent focus:ring-4 focus:ring-accent-soft"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[13px] font-medium text-ink-2 hover:text-accent"
                  >
                    {showPassword ? "Ocultar" : "Mostrar"}
                  </button>
                </div>
              </Field>

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-err-soft bg-err-soft px-3 py-2.5 text-[13px] text-err-ink"
                >
                  {error}
                </div>
              )}

              <button
                type="submit"
                className="mt-2 inline-flex h-12 items-center justify-center gap-2 rounded-full bg-accent text-[15px] font-medium text-white shadow-sm transition-colors hover:bg-accent-hover"
              >
                {tab === "signup" ? "Criar minha conta" : "Entrar"}{" "}
                <span aria-hidden>→</span>
              </button>
            </form>

            <div className="my-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-ink-3">
              <div className="h-px flex-1 bg-line" />
              <span>ou</span>
              <div className="h-px flex-1 bg-line" />
            </div>

            <div className="flex flex-col gap-3">
              <button className="inline-flex h-12 items-center justify-center gap-3 rounded-full border border-line-strong bg-bg-card text-[14px] font-medium text-ink hover:bg-panel">
                <GoogleIcon />
                Continuar com Google
              </button>
              <button className="inline-flex h-12 items-center justify-center gap-2 rounded-full border border-line-strong bg-bg-card text-[14px] font-medium text-ink hover:bg-panel">
                <span aria-hidden className="text-accent">✦</span>
                Receber link mágico por e-mail
              </button>
            </div>

            <p className="mt-5 text-center text-[12px] leading-relaxed text-ink-3">
              Ao criar conta, você concorda com nossos{" "}
              <a className="font-medium text-accent-ink underline-offset-2 hover:underline" href="#">
                Termos
              </a>{" "}
              e{" "}
              <a className="font-medium text-accent-ink underline-offset-2 hover:underline" href="#">
                Política de Privacidade
              </a>
              .
            </p>
          </div>
        </section>
      </main>
    </div>
  );
}

function Header() {
  return (
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-6 py-5 lg:px-10">
      <a href="#" className="flex items-center gap-2">
        <span className="grid h-8 w-8 place-items-center rounded-full bg-accent text-[15px] font-semibold text-white">
          A
        </span>
        <span className="font-serif text-[20px] tracking-tight text-ink">Aja</span>
      </a>

      <nav className="hidden gap-8 text-[14px] text-ink-2 md:flex">
        <a href="#" className="hover:text-ink">Produto</a>
        <a href="#" className="hover:text-ink">Histórias</a>
        <a href="#" className="hover:text-ink">Preços</a>
        <a href="#" className="hover:text-ink">Contato</a>
      </nav>

      <button className="inline-flex h-10 items-center gap-2 rounded-full bg-ink px-5 text-[14px] font-medium text-bg-card hover:bg-ink-2">
        Entrar <span aria-hidden>→</span>
      </button>
    </header>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col">
      <span className="font-serif text-[30px] leading-none text-accent">{value}</span>
      <span className="mt-2 text-[13px] text-ink-3">{label}</span>
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "flex-1 rounded-full px-4 py-2.5 text-[14px] font-medium transition-colors",
        active
          ? "bg-bg-card text-ink shadow-sm ring-1 ring-line"
          : "text-ink-3 hover:text-ink"
      )}
    >
      {children}
    </button>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-2">
      <span className="text-[11px] font-medium uppercase tracking-[0.12em] text-ink-3">
        {label}
      </span>
      {children}
    </label>
  );
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" aria-hidden>
      <path d="M17.64 9.2c0-.64-.06-1.25-.16-1.84H9v3.48h4.84a4.14 4.14 0 0 1-1.8 2.72v2.26h2.92c1.7-1.57 2.68-3.88 2.68-6.62Z" fill="#4285F4" />
      <path d="M9 18c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7H.92v2.33A9 9 0 0 0 9 18Z" fill="#34A853" />
      <path d="M3.97 10.72A5.4 5.4 0 0 1 3.68 9c0-.6.1-1.18.29-1.72V4.95H.92A9 9 0 0 0 0 9c0 1.45.35 2.83.92 4.05l3.05-2.33Z" fill="#FBBC05" />
      <path d="M9 3.58c1.32 0 2.5.45 3.44 1.35l2.58-2.58C13.46.89 11.42 0 9 0A9 9 0 0 0 .92 4.95L3.97 7.28C4.68 5.16 6.66 3.58 9 3.58Z" fill="#EA4335" />
    </svg>
  );
}
