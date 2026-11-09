import Image from "next/image";
import { iffersPicturesCaseStudy } from "@/content/case-studies/iffers-pictures";

const sizes = {
  maternity: "(min-width: 1100px) 58vw, (min-width: 760px) 62vw, calc(100vw - 40px)",
  family: "(min-width: 1100px) 27vw, (min-width: 760px) 32vw, calc(100vw - 40px)",
  engagement: "(min-width: 1100px) 42vw, (min-width: 760px) 48vw, calc(100vw - 40px)",
  event: "(min-width: 1100px) 23vw, (min-width: 760px) 30vw, calc(100vw - 40px)",
} as const;

export function IffersGallery() {
  return (
    <div
      className="sc-gallery"
      data-reveal-group
      data-reveal-stagger="85"
      id="selected-photography"
    >
      {iffersPicturesCaseStudy.media.images.map((image) => (
        <figure
          className={`sc-photo sc-photo-${image.id}`}
          data-reveal="scale"
          key={image.id}
        >
          <Image
            src={image.src}
            alt={image.alt}
            width={image.width}
            height={image.height}
            loading={image.id === "family" ? "eager" : "lazy"}
            sizes={sizes[image.id]}
            unoptimized={image.id === "family"}
          />
          <figcaption>
            <span>{image.label}</span>
          </figcaption>
        </figure>
      ))}
    </div>
  );
}
