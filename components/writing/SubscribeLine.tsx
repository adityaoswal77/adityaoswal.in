import { IP_SIGNUP_URL } from "@/lib/data";
import { IS_PRODUCTION, isPlaceholder } from "@/lib/utils";
import { Placeholder } from "@/components/writing/Placeholder";

const label = "I send 5 interesting places every Friday";

export function SubscribeLine() {
  const pending = isPlaceholder(IP_SIGNUP_URL);
  if (pending && IS_PRODUCTION) return null;

  return (
    <p className="mb-0 mt-12 text-[var(--muted)]">
      {pending ? (
        <>
          {label} <span aria-hidden>→</span> <Placeholder>{IP_SIGNUP_URL}</Placeholder>
        </>
      ) : (
        <a
          href={IP_SIGNUP_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-[var(--muted)] underline-offset-4 transition-colors hover:text-[var(--foreground)] hover:decoration-[var(--foreground)]"
        >
          {label} <span aria-hidden>→</span>
          <span className="sr-only"> (opens in new tab)</span>
        </a>
      )}
    </p>
  );
}
