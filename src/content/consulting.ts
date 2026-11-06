import { profile } from "./profile.ts";

export const consulting = {
  positioning: "Fractional Technical Lead & Senior Full-Stack Engineer",
  business: "Phil-Stack Coding LLC",
  introduction: "Senior engineering help for the product you’re building next.",
  description: "I help founders, product teams, and agencies build, modernize, and maintain software with hands-on engineering and clear technical direction.",
  offers: [
    {
      id: "implementation",
      name: "Implementation & agency capacity",
      shortName: "Build & ship",
      problem: "You have a roadmap and need experienced hands to move it forward.",
      description: "Focused development for an existing product, a new feature, or an agency delivery gap. I work across React, Next.js, TypeScript, APIs, and PostgreSQL.",
      outputs: ["Working features across interface and backend", "Tests, review, and release support", "A clear handoff to your team"],
      collaboration: "A defined project or agreed blocks of engineering capacity, working with your existing team and tools.",
      boundary: "Deliverables, dependencies, and release responsibilities are agreed before work begins. Additional scope is discussed separately.",
    },
    {
      id: "ownership",
      name: "Ongoing technical ownership",
      shortName: "Keep it moving",
      problem: "Your product needs consistent senior attention beyond the next ticket.",
      description: "Hands-on engineering with the continuity to understand your system, make practical technical decisions, and carry improvements through delivery.",
      outputs: ["A prioritized engineering plan", "Features, maintenance, and modernization", "Documented decisions and regular progress updates"],
      collaboration: "An ongoing engagement with agreed priorities, reserved capacity, and a regular communication rhythm.",
      boundary: "Capacity, response expectations, and support responsibilities are explicit. This is not unlimited support or an on-call service.",
    },
    {
      id: "assessment",
      name: "Bounded technical assessment",
      shortName: "Find the next step",
      problem: "You need clarity before committing to a larger engineering effort.",
      description: "A focused review of an existing application or a specific technical concern, turning observations into a practical path forward.",
      outputs: ["Evidence-backed findings and constraints", "Prioritized recommendations", "A readout and scoped options for follow-on work"],
      collaboration: "A short, separately scoped engagement with agreed questions, access, and a written readout.",
      boundary: "The review is limited to the agreed system and questions. Implementation, certification, and ongoing support are separate engagements.",
    },
  ],
  proof: [
    { projectId: "memx", relevance: "Complex systems, practical delivery", contribution: "Built portal tools and full-stack features at MEMX. My manager established the database-driven market architecture; I built the frontend system around it." },
    { projectId: "domani", relevance: "Ownership beyond launch", contribution: "Co-own Domani with a UX designer. We make product and design decisions together; I carry engineering through development, releases, analytics, and production support." },
    { projectId: "iffers-pictures", relevance: "From discovery to a working site", contribution: "Shaped a photography portfolio from discovery and copy through visual design and development." },
  ],
  process: [
    { title: "Start with the context", description: "Tell me about your product, the problem, and the timing. An informal email is enough to begin." },
    { title: "Find a useful starting point", description: "We discuss fit, constraints, and what success would look like, then agree a bounded scope or capacity arrangement." },
    { title: "Build with a clear rhythm", description: "Work moves through implementation, review, and delivery with visible progress. Any follow-on engagement is agreed separately." },
  ],
  faq: [
    { question: "Do you work on existing products or new builds?", answer: "Both. I can help extend or modernize an existing application, or build a focused new product. We start by agreeing what needs to be delivered and the constraints around it." },
    { question: "Can we work together part time?", answer: "Yes. Project-based and ongoing contract work are both possible. Availability, meeting time, and delivery capacity are confirmed for each engagement." },
    { question: "How do you collaborate?", answer: "I’m based in New Jersey and prefer remote collaboration. Occasional visits can be discussed by agreement, alongside your team’s communication and review process." },
    { question: "How is pricing determined?", answer: "After understanding the work, we agree scope, capacity, fees, and payment terms. An assessment can be a useful first step when the implementation scope is still unclear." },
  ],
} as const;

export type ConsultingOfferId = (typeof consulting.offers)[number]["id"];

export function consultingMailto(offerId?: ConsultingOfferId) {
  const offer = consulting.offers.find((item) => item.id === offerId);
  const subject = offer ? `Consulting: ${offer.name}` : "Let’s discuss a consulting project";
  const body = "Hi Phil,\n\nHere’s a little context about our product and where we need help:\n\nTiming:\nExpected scope or capacity:\n\nThanks,";
  return `mailto:${profile.consulting.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
