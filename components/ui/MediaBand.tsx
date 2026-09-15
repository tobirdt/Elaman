import Image from "next/image";

type MediaBandTone = "paper" | "navy";

type MediaBandProps = {
  src: string;
  alt: string;
  /** Object-fit and filter classes for the photograph itself. */
  imageClassName: string;
  /**
   * `navy` sets the house colour behind the photograph and lays a light tint
   * over it. No text sits on a media band, so the tint stays a tint: enough
   * to keep the systems page cool in character, not a scrim that dulls the
   * picture.
   */
  tone?: MediaBandTone;
  preload?: boolean;
};

const toneClasses: Record<MediaBandTone, string> = {
  paper: "bg-[var(--surface-paper-soft)]",
  navy: "bg-navy",
};

/**
 * The photograph that follows a page header, full width and at a fixed share
 * of the viewport. Every subpage that carries an image carries it here, so
 * the opening reads the same way on all of them.
 */
export function MediaBand({
  src,
  alt,
  imageClassName,
  tone = "paper",
  preload = false,
}: MediaBandProps) {
  return (
    <div
      className={`hero-image-enter relative h-[var(--media-band-h)] w-full overflow-hidden border-b border-[var(--border-hairline)] ${toneClasses[tone]}`}
    >
      <Image
        src={src}
        alt={alt}
        fill
        preload={preload}
        sizes="100vw"
        className={imageClassName}
      />
      {tone === "navy" ? (
        <div className="absolute inset-0 bg-navy/20" aria-hidden="true" />
      ) : null}
    </div>
  );
}
