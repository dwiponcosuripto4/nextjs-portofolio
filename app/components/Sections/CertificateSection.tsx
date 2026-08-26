"use client";

import { useEffect, useState } from "react";

const certificates = [
  [
    "/Images/Sertifikat/bootcamp.jpg",
    "Bootcamp Certificate",
    "Eduwork.id",
    "2026",
  ],
  [
    "/Images/Sertifikat/bnsp.jpg",
    "BNSP Certificate",
    "BNSP (Badan Nasional Sertifikasi Profesi)",
    "2025",
  ],
  [
    "/Images/Sertifikat/train5.jpg",
    "Basic GIT Certificate",
    "CODEPOLITAN",
    "2025",
  ],
  [
    "/Images/Sertifikat/train4.jpg",
    "Use Terminal or CMD for Development Certificate",
    "CODEPOLITAN",
    "2025",
  ],
  [
    "/Images/Sertifikat/train3.jpg",
    "Text Editor for Beginners Certificate",
    "CODEPOLITAN",
    "2025",
  ],
  [
    "/Images/Sertifikat/train2.jpg",
    "Basic Algorithms and Programming Certificate",
    "CODEPOLITAN",
    "2025",
  ],
  [
    "/Images/Sertifikat/train1.jpg",
    "Computer Programming Certificate",
    "CODEPOLITAN",
    "2025",
  ],
] as const;

export default function CertificateSection() {
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(
    null,
  );
  useEffect(() => {
    if (!lightbox) return;
    const close = (event: KeyboardEvent) =>
      event.key === "Escape" && setLightbox(null);
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", close);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", close);
    };
  }, [lightbox]);
  return (
    <div className="mx-auto max-w-6xl">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {certificates.map(([src, title, issuer, date]) => (
          <div
            key={src}
            className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all hover:border-[#3FA9C9]/50"
          >
            <button
              type="button"
              onClick={() => setLightbox({ src, alt: title })}
              className="mb-4 flex aspect-video w-full items-center justify-center rounded-lg bg-gradient-to-br from-[#3FA9C9]/20 to-[#40ffaa]/20"
            >
              <img
                src={src}
                alt={title}
                className="h-full w-full object-contain transition-transform duration-300 hover:scale-[1.02]"
              />
            </button>
            <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
            <p className="mb-2 text-neutral-300">Issued by: {issuer}</p>
            <p className="text-sm text-neutral-400">Date: {date}</p>
          </div>
        ))}
      </div>
      {lightbox && (
        <div
          className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 px-4 py-8"
          role="dialog"
          aria-modal="true"
          aria-label="Certificate image lightbox"
          onClick={() => setLightbox(null)}
        >
          <button
            type="button"
            onClick={() => setLightbox(null)}
            className="absolute right-4 top-4 rounded-md border border-white/35 bg-black/40 px-3 py-1.5 text-sm font-medium text-white hover:bg-black/70"
            aria-label="Close certificate lightbox"
          >
            Close
          </button>
          <div
            className="max-h-[88vh] max-w-[calc(100vw-2rem)] rounded-md border border-white/25 bg-white/95 p-1 md:max-w-[calc(100vw-4rem)]"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={lightbox.src}
              alt={lightbox.alt}
              className="block h-auto max-h-[calc(88vh-0.5rem)] max-w-full object-contain"
            />
          </div>
        </div>
      )}
    </div>
  );
}
