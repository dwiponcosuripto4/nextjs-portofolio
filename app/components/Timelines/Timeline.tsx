"use client";
import { useScroll, useTransform, motion } from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [hoveredImage, setHoveredImage] = useState<{
    src: string;
    alt: string;
    x: number;
    y: number;
  } | null>(null);
  const [lightboxImage, setLightboxImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  useEffect(() => {
    if (!lightboxImage) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setLightboxImage(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [lightboxImage]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 10%", "end 50%"],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  const handleTimelineMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const image = target.closest("img");

    if (!(image instanceof HTMLImageElement)) {
      if (hoveredImage) {
        setHoveredImage(null);
      }
      return;
    }

    setHoveredImage((prev) => {
      if (prev && prev.src === image.src) {
        return {
          ...prev,
          x: event.clientX,
          y: event.clientY,
        };
      }

      return {
        src: image.src,
        alt: image.alt || "Image preview",
        x: event.clientX,
        y: event.clientY,
      };
    });
  };

  const handleTimelineMouseLeave = () => {
    setHoveredImage(null);
  };

  const handleTimelineClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const image = target.closest("img");

    if (!(image instanceof HTMLImageElement)) {
      return;
    }

    event.preventDefault();
    event.stopPropagation();

    setLightboxImage({
      src: image.src,
      alt: image.alt || "Image preview",
    });
  };

  return (
    <section
      ref={containerRef}
      className="w-full font-sans md:px-6 lg:px-10"
      style={{
        background:
          "linear-gradient(180deg, rgba(11, 28, 45, 0.78) 0%, rgba(11, 28, 45, 0.9) 100%)",
      }}
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 lg:px-10 pt-14 pb-10">
        <p className="text-xs md:text-sm uppercase tracking-[0.2em] text-[#3FA9C9] mb-3">
          Journey
        </p>
        <h2 className="text-2xl md:text-4xl mb-3 text-[#EAF6FF] font-bold max-w-4xl">
          Work Experience
        </h2>
        <p className="text-[#EAF6FF]/80 text-sm md:text-base max-w-2xl leading-relaxed">
          Showcase dan perjalanan project yang pernah saya kerjakan, mulai dari
          project akademik hingga project pribadi.
        </p>
      </div>

      <div ref={ref} className="relative max-w-7xl mx-auto pb-16">
        {data.map((item, index) => (
          <div
            key={index}
            className="flex justify-start pt-8 md:pt-14 md:gap-8"
          >
            <div className="sticky flex flex-col md:flex-row z-30 items-center top-28 self-start max-w-xs lg:max-w-sm md:w-full">
              <div className="h-10 absolute left-3 md:left-3 w-10 rounded-full bg-[#0B1C2D] border border-[#3FA9C9]/40 shadow-[0_0_0_6px_rgba(11,28,45,0.75)] flex items-center justify-center">
                <div className="h-3 w-3 rounded-full bg-[#3FA9C9]" />
              </div>
              <h3 className="hidden md:block text-xl md:pl-20 md:text-4xl font-bold text-[#EAF6FF]/45">
                {item.title}
              </h3>
            </div>

            <div className="relative pl-20 pr-4 md:pl-4 w-full">
              <h3 className="md:hidden block text-xl mb-4 text-left font-bold text-[#EAF6FF]/60">
                {item.title}
              </h3>
              <div
                className="rounded-2xl border border-[#3FA9C9]/30 bg-[#EAF6FF]/8 backdrop-blur-sm p-4 md:p-6 shadow-[0_16px_40px_rgba(11,28,45,0.35)] [&_p]:text-[#EAF6FF]/85 [&_p]:leading-relaxed [&_a]:text-[#3FA9C9] [&_a]:underline [&_a]:underline-offset-4 [&_img]:rounded-xl [&_img]:border [&_img]:border-[#3FA9C9]/25 [&_img]:shadow-[0_12px_26px_rgba(11,28,45,0.35)] [&_img]:cursor-pointer [&_img]:transition-transform [&_img]:duration-300 [&_img:hover]:scale-[1.02]"
                onMouseMove={handleTimelineMouseMove}
                onMouseLeave={handleTimelineMouseLeave}
                onClick={handleTimelineClick}
              >
                {item.content}
              </div>
            </div>
          </div>
        ))}
        <div
          style={{
            height: height + "px",
          }}
          className="absolute md:left-8 left-8 top-0 overflow-hidden w-[2px] bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))] from-transparent from-[0%] via-[#EAF6FF]/30 to-transparent to-[99%] [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]"
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="absolute inset-x-0 top-0 w-[2px] bg-gradient-to-t from-[#3FA9C9] via-[#EAF6FF] to-transparent from-[0%] via-[12%] rounded-full"
          />
        </div>

        {hoveredImage && (
          <div
            className="pointer-events-none fixed z-[90] hidden md:block"
            style={{
              left: `clamp(16px, ${hoveredImage.x - 350}px, calc(100vw - 790px))`,
              top: `clamp(16px, ${hoveredImage.y - 180}px, calc(100vh - 376px))`,
            }}
          >
            <div className="relative overflow-hidden rounded-sm border border-white/25 bg-white shadow-[0_24px_65px_rgba(0,0,0,0.48)]">
              <img
                src={hoveredImage.src}
                alt={hoveredImage.alt}
                className="h-[360px] w-[790px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-28 w-28 items-center justify-center rounded-full bg-black/95 text-lg font-medium tracking-wide text-white shadow-[0_12px_24px_rgba(0,0,0,0.5)]">
                  View
                </span>
              </div>
            </div>
          </div>
        )}

        {lightboxImage && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 px-4 py-8"
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
            onClick={() => setLightboxImage(null)}
          >
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute right-4 top-4 rounded-md border border-white/35 bg-black/40 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-black/70"
              aria-label="Close lightbox"
            >
              Close
            </button>
            <div
              className="max-h-[88vh] max-w-[calc(100vw-2rem)] rounded-md border border-white/25 bg-white/95 p-1 shadow-[0_24px_65px_rgba(0,0,0,0.5)] md:max-w-[calc(100vw-4rem)]"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={lightboxImage.src}
                alt={lightboxImage.alt}
                className="block h-auto max-h-[calc(88vh-0.5rem)] w-auto max-w-full object-contain"
              />
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
