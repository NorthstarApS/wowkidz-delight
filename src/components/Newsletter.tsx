import { useState } from "react";
import { Mail } from "lucide-react";

export function Newsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);

  return (
    <section aria-label="Nyhedsbrev" className="bg-sun">
      <div className="container-wk flex flex-col items-center gap-4 py-12 text-center md:py-16">
        <Mail className="h-8 w-8" aria-hidden />
        <h2 className="max-w-xl text-2xl md:text-3xl">
          Få gaveidéer, skolestartstips og nye familiefund
        </h2>
        <p className="max-w-md text-sm text-sun-foreground/80">
          Kort og hyggeligt — kun når vi har noget, der gør hverdagen nemmere. Afmeld når som
          helst.
        </p>
        {done ? (
          <p className="font-display font-bold">Tak! Du hører fra os snart. 🎈</p>
        ) : (
          <form
            className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault();
              if (email.includes("@")) setDone(true);
            }}
          >
            <label htmlFor="newsletter-email" className="sr-only">
              Din e-mail
            </label>
            <input
              id="newsletter-email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Din e-mail"
              className="min-h-12 flex-1 border-2 border-ink bg-card px-4 text-sm outline-none focus:border-sky"
            />
            <button type="submit" className="btn-base btn-ink min-h-12">
              Tilmeld
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
