import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import heroImg from "@/assets/hero-skyline.jpg";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Sign in — LuxeHaven" }] }),
  component: Page,
});

function Page() {
  return (
    <section className="grid lg:grid-cols-2 min-h-[100svh]">
      <div className="relative hidden lg:block bg-ink">
        <img
          src={heroImg}
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-ink/40 via-ink/20 to-ink/80" />
        <div className="relative h-full p-12 flex flex-col justify-between text-surface">
          <div className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-surface text-ink text-sm font-bold">
              L
            </span>
            <span className="text-lg font-semibold tracking-tight">LuxeHaven</span>
          </div>
          <div>
            <div className="eyebrow text-surface/70">— Member</div>
            <div className="mt-4 text-4xl font-semibold tracking-tight max-w-md">
              Save searches. Track visits. Talk to advisors.
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col justify-center px-6 md:px-16 py-32 max-w-xl w-full mx-auto">
        <Link
          to="/"
          className="lg:hidden mb-12 inline-flex items-center gap-2 text-[13px] text-muted-foreground"
        >
          ← LuxeHaven
        </Link>
        <div className="eyebrow text-muted-foreground">— Sign in</div>
        <h1 className="mt-4 display-lg !text-[clamp(2.25rem,5vw,3.5rem)]">Welcome back.</h1>
        <p className="mt-4 text-ink-soft">Use the email or mobile linked to your account.</p>

        <form className="mt-10 space-y-6">
          <label className="block">
            <div className="text-[12px] font-medium text-muted-foreground">Email or mobile</div>
            <input className="mt-2 w-full border-b border-line bg-transparent py-3 text-[15px] outline-none focus:border-ink transition" />
          </label>
          <label className="block">
            <div className="text-[12px] font-medium text-muted-foreground">Password</div>
            <input
              type="password"
              className="mt-2 w-full border-b border-line bg-transparent py-3 text-[15px] outline-none focus:border-ink transition"
            />
          </label>
          <button
            type="button"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-ink py-4 text-[14px] font-medium text-surface hover:bg-accent-blue transition"
          >
            Continue <ArrowUpRight className="h-4 w-4" />
          </button>
        </form>

        <div className="mt-8 text-[13px] text-muted-foreground">
          New here? <span className="text-accent-blue">Create an account</span>
        </div>
      </div>
    </section>
  );
}
