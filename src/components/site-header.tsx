import Link from "next/link";

type SiteHeaderProps = {
  current?: "work" | "resume" | "consulting" | "contact";
  tone?: "dark" | "paper";
};

const navigation = [
  { id: "work", label: "Work", href: "/work" },
  { id: "resume", label: "Resume", href: "/resume" },
  { id: "consulting", label: "Consulting", href: "/consulting" },
  { id: "contact", label: "Contact", href: "/contact" },
] as const;

export function SiteHeader({ current, tone = "dark" }: SiteHeaderProps) {
  return (
    <header className={`site-header site-header-${tone}`} data-reveal="soft">
      <Link className="wordmark" href="/" aria-label="Phil Arfuso, home">
        <span>Phil Arfuso</span>
        <span className="wordmark-role">Full-stack developer</span>
      </Link>

      <nav className="desktop-nav" aria-label="Primary navigation">
        {navigation.map((item) => (
          <Link
            aria-current={current === item.id ? "page" : undefined}
            key={item.label}
            href={item.href}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <details className="mobile-nav">
        <summary aria-label="Open primary navigation">Menu</summary>
        <nav aria-label="Mobile navigation">
          {navigation.map((item) => (
            <Link
              aria-current={current === item.id ? "page" : undefined}
              key={item.label}
              href={item.href}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </details>
    </header>
  );
}
