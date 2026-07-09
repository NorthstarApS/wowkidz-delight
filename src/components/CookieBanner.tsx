import { useEffect, useState } from "react";

const KEY = "wowkidz-consent-v1";

export type ConsentState = "accepted" | "necessary" | null;

/**
 * Consent banner prepared for Consent Suite integration.
 * Tracking scripts must check localStorage "wowkidz-consent-v1" === "accepted"
 * before loading. Replace internals with Consent Suite SDK when ready.
 */
export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(KEY);
    if (!stored) setVisible(true);
  }, []);

  const decide = (state: Exclude<ConsentState, null>) => {
    window.localStorage.setItem(KEY, state);
    window.dispatchEvent(new CustomEvent("wowkidz:consent", { detail: state }));
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookiesamtykke"
      className="fixed inset-x-0 bottom-0 z-[70] border-t-2 border-ink bg-card p-4 md:p-5"
    >
      <div className="container-wk flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <p className="max-w-2xl text-sm">
          Vi bruger cookies til at få shoppen til at fungere og til at forbedre din oplevelse.
          Du vælger selv, hvor meget du vil dele.{" "}
          <a href="/cookiepolitik" className="underline underline-offset-2">
            Læs vores cookiepolitik
          </a>
          .
        </p>
        <div className="flex shrink-0 gap-2">
          <button type="button" onClick={() => decide("necessary")} className="btn-base btn-outline-ink text-xs">
            Kun nødvendige
          </button>
          <button type="button" onClick={() => decide("accepted")} className="btn-base btn-coral text-xs">
            Accepter alle
          </button>
        </div>
      </div>
    </div>
  );
}
