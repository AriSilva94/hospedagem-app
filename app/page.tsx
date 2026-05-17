"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Chip, Field, Input, Stat } from "@/components/ui";
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
      router.push("/dashboard");
      return;
    }
    setError("E-mail ou senha incorretos. Tente novamente.");
  }

  return (
    <div className="flex flex-1 flex-col bg-bg">
      <Header />

      <main className="mx-auto grid w-full max-w-7xl flex-1 grid-cols-1 gap-8 px-4 py-10 sm:gap-12 sm:px-6 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20 lg:px-10 lg:py-24">
        <section className="flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-ink" />
            <span className="text-[11px] font-medium uppercase tracking-[0.14em] text-ink-2">
              Para anfitriões com história
            </span>
          </div>

          <h1 className="mt-6 font-serif text-[40px] leading-[1.1] tracking-tight text-ink sm:text-[52px] lg:text-[64px] lg:leading-[1.05]">
            A operação{" "}
            <span className="italic text-accent">se cuida.</span> Você recebe.
          </h1>

          <p className="mt-5 max-w-lg text-[15px] leading-[1.55] text-ink-2 sm:mt-6 sm:text-[17px]">
            Da chave ao check-out, tudo orquestrado. Aja é o sistema operacional
            dos anfitriões que tratam hospedar como ofício.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4 sm:mt-8 sm:gap-5">
            <Button size="lg">
              Comece grátis <span aria-hidden>→</span>
            </Button>
            <Button variant="ghost" size="md" className="text-ink hover:text-accent hover:bg-transparent">
              Ver demonstração <span aria-hidden>▸</span>
            </Button>
          </div>

          <div className="mt-10 h-px w-full max-w-xl bg-line" />

          <dl className="mt-8 flex flex-wrap gap-6 sm:gap-10">
            <Stat value="2.400+" label="imóveis ativos" valueTone="accent" valueSize="lg" layout="value-top" />
            <Stat value="38%" label="de ocupação extra" valueTone="accent" valueSize="lg" layout="value-top" />
            <Stat value="7 dias" label="para sair do papel" valueTone="accent" valueSize="lg" layout="value-top" />
          </dl>
        </section>

        <section className="flex items-start justify-center lg:justify-end">
          <div className="w-full max-w-md rounded-2xl border border-line bg-bg-card p-5 shadow-lg sm:rounded-3xl sm:p-7">
            <div className="flex rounded-full bg-accent-soft p-1">
              <Chip
                selected={tab === "signup"}
                onClick={() => setTab("signup")}
                className={cn(
                  "flex-1 justify-center rounded-full border-0",
                  tab === "signup"
                    ? "bg-bg-card text-ink shadow-sm ring-1 ring-line"
                    : "bg-transparent text-ink-3 hover:bg-transparent hover:text-ink"
                )}
              >
                Criar conta
              </Chip>
              <Chip
                selected={tab === "signin"}
                onClick={() => setTab("signin")}
                className={cn(
                  "flex-1 justify-center rounded-full border-0",
                  tab === "signin"
                    ? "bg-bg-card text-ink shadow-sm ring-1 ring-line"
                    : "bg-transparent text-ink-3 hover:bg-transparent hover:text-ink"
                )}
              >
                Entrar
              </Chip>
            </div>

            <h2 className="mt-6 font-serif text-[26px] leading-tight text-ink">
              Comece em minutos.
            </h2>
            <p className="mt-1 text-[13.5px] text-ink-3">
              Sem cartão de crédito. Cancele quando quiser.
            </p>

            <form className="mt-6 flex flex-col gap-4" onSubmit={handleSubmit}>
              <Field label="E-mail profissional">
                <Input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="voce@suacasa.com.br"
                />
              </Field>

              <Field label={tab === "signup" ? "Crie uma senha" : "Senha"}>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Mínimo 8 caracteres"
                    className="pr-20"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                    aria-pressed={showPassword}
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

              <Button type="submit" size="lg" className="mt-2">
                {tab === "signup" ? "Criar minha conta" : "Entrar"}{" "}
                <span aria-hidden>→</span>
              </Button>
            </form>

            <div className="my-5 flex items-center gap-3 text-[11px] font-medium uppercase tracking-widest text-ink-3">
              <div className="h-px flex-1 bg-line" />
              <span>ou</span>
              <div className="h-px flex-1 bg-line" />
            </div>

            <div className="flex flex-col gap-3">
              <Button variant="outline" size="lg">
                <GoogleIcon />
                Continuar com Google
              </Button>
              <Button variant="outline" size="lg">
                <span aria-hidden className="text-accent">✦</span>
                Receber link mágico por e-mail
              </Button>
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
    <header className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5 lg:px-10">
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

      <Button size="sm" className="bg-ink text-bg-card hover:bg-ink-2">
        Entrar <span aria-hidden>→</span>
      </Button>
    </header>
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
