import Image from "next/image";

type ConsultingProofVisualProps = {
  projectId: string;
};

export function ConsultingProofVisual({ projectId }: ConsultingProofVisualProps) {
  if (projectId === "memx") {
    return (
      <figure className="consulting-proof-visual consulting-proof-visual-memx">
        <div className="studio-market-composition" aria-hidden="true">
          <span className="studio-market-orbit studio-market-orbit-one" />
          <span className="studio-market-orbit studio-market-orbit-two" />
          <p>One platform.<br /><strong>Many markets.</strong></p>
          <div className="studio-market-tools">
            <span>Member tools</span>
            <span>Trading tools</span>
            <span>Operations tools</span>
          </div>
        </div>
        <figcaption>Conceptual platform illustration</figcaption>
      </figure>
    );
  }

  if (projectId === "domani") {
    return (
      <figure className="consulting-proof-visual consulting-proof-visual-domani">
        <div className="studio-domani-halo" aria-hidden="true" />
        <Image
          className="studio-domani-screen"
          src="/images/domani/today-screen.png"
          alt="Domani’s Today screen, with daily progress, a top priority, and a short task list."
          width={1008}
          height={2126}
          sizes="(max-width: 760px) 170px, 210px"
        />
        <figcaption>Domani · production app</figcaption>
      </figure>
    );
  }

  if (projectId === "iffers-pictures") {
    return (
      <figure className="consulting-proof-visual consulting-proof-visual-iffers">
        <div className="studio-iffers-window">
          <div className="studio-iffers-toolbar" aria-hidden="true">
            <span className="studio-iffers-dots"><i /><i /><i /></span>
            <span>ifferspictures.com</span>
          </div>
          <div className="studio-iffers-page">
            <Image
              src="/images/iffers-pictures/maternity-session.jpg"
              alt="Photography displayed within a framed Iffer’s Pictures website composition."
              width={1080}
              height={720}
              sizes="(max-width: 760px) 80vw, 40vw"
            />
            <div className="studio-iffers-site-copy" aria-hidden="true">
              <span>Iffer’s Pictures</span>
              <p>Heartfelt moments,<br />beautifully captured.</p>
            </div>
          </div>
        </div>
        <figcaption>Client website · design and development</figcaption>
      </figure>
    );
  }

  return null;
}
