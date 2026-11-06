import type { Metadata } from "next";
import Link from "next/link";
import { SiteHeader } from "@/components/site-header";
import { profile } from "@/content/profile";

export const metadata: Metadata = {
  title: "Contact",
  description: "Contact Phil Arfuso about full-stack development for web and mobile products.",
};

const channels = [
  {
    label: "Email",
    value: profile.email,
    href: `mailto:${profile.email}`,
    external: false,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/phil-arfuso",
    href: profile.linkedIn,
    external: true,
  },
  {
    label: "GitHub",
    value: "github.com/parfuso-pvs",
    href: profile.github,
    external: true,
  },
] as const;

export default function ContactPage() {
  return (
    <main className="contact-page" id="main-content">
      <section className="contact-shell" aria-labelledby="contact-title">
        <SiteHeader current="contact" />

        <div className="contact-layout" data-reveal-group data-reveal-stagger="110">
          <div className="contact-intro" data-reveal="left" data-reveal-group>
            <h1 id="contact-title" data-reveal="soft">Say hello</h1>
            <p data-reveal="soft">{profile.contact.intro}</p>
            <div className="contact-consulting" data-reveal="soft">
              <p>Looking for senior engineering help?</p>
              <Link href="/consulting">Explore consulting services <span aria-hidden="true">→</span></Link>
              <a href={`mailto:${profile.consulting.email}`}>{profile.consulting.email}</a>
            </div>
          </div>

          <div
            className="contact-channels"
            data-reveal="right"
            data-reveal-group
            data-reveal-stagger="75"
            aria-label="Contact channels"
          >
            {channels.map((channel) => (
              <a
                className="contact-channel"
                data-reveal="soft"
                href={channel.href}
                key={channel.label}
                rel={channel.external ? "noopener noreferrer" : undefined}
                target={channel.external ? "_blank" : undefined}
                aria-label={
                  channel.external
                    ? `${channel.label}: ${channel.value} (opens in a new tab)`
                    : undefined
                }
              >
                <span className="contact-channel-label">{channel.label}</span>
                <span className="contact-channel-value">{channel.value}</span>
                <span className="contact-channel-arrow" aria-hidden="true">↗</span>
                <span className="contact-channel-foreground" aria-hidden="true">
                  <span className="contact-channel-label">{channel.label}</span>
                  <span className="contact-channel-value">{channel.value}</span>
                  <span className="contact-channel-arrow">↗</span>
                </span>
              </a>
            ))}
          </div>
        </div>

        <footer className="contact-footer" data-reveal-group data-reveal-stagger="65">
          <p data-reveal="soft">{profile.location}</p>
          <p data-reveal="soft">{profile.contact.note}</p>
          <Link data-reveal="soft" href="/">Back home</Link>
        </footer>
      </section>
    </main>
  );
}
