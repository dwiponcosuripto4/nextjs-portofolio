"use client";

import { useState } from "react";
import LogoLoop from "../LogoLoop/LogoLoop";
import {
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
  SiTypescript,
} from "react-icons/si";

const logos = [
  { node: <SiReact />, title: "React", href: "https://react.dev" },
  { node: <SiNextdotjs />, title: "Next.js", href: "https://nextjs.org" },
  {
    node: <SiTypescript />,
    title: "TypeScript",
    href: "https://www.typescriptlang.org",
  },
  {
    node: <SiTailwindcss />,
    title: "Tailwind CSS",
    href: "https://tailwindcss.com",
  },
];
const projects = [
  [
    "/Images/porto.png",
    "Project Porto",
    "Bootcamp project : Personal Portfolio Website",
    "Frontend website portofolio menggunakan bootstrap.",
    "2026",
    "timeline-porto",
  ],
  [
    "/Images/e-com.png",
    "Project E-Commerce",
    "Bootcamp project : E-Commerce App",
    "Project e-commerce sederhana menggunakan PHP Native.",
    "2026",
    "timeline-ecom",
  ],
  [
    "/Images/inv.png",
    "Project Inventaris",
    "Personal project : Sistem Inventaris Barang",
    "Website inventaris sederhana berbasis Laravel 12.",
    "2026",
    "timeline-inv",
  ],
  [
    "/Images/skrip (3).png",
    "Project Skripsi",
    "Thesis project : Sistem Admin Pengelolaan Data dan Aktivitas Pengguna",
    "Pengembangan website skripsi berupa fitur admin untuk monitoring aktivitas pengguna dan pengelolaan data.",
    "2025",
    "timeline-skrip-3",
  ],
  [
    "/Images/kos.png",
    "Project Website Kost",
    "Capstone project : Website Informasi Kost",
    "Website frontend informasi kost dengan integrasi maps dan WhatsApp.",
    "2024",
    "timeline-kos",
  ],
  [
    "/Images/skrip (4).png",
    "Project Internship",
    "Internship project : Website Portal Informasi Pemerintah Daerah Kabupaten OKU Timur",
    "Pengembangan website untuk portal informasi pemerintah daerah Kabupaten OKU Timur berbasis Laravel.",
    "2025",
    "timeline-skrip-4",
  ],
] as const;

export default function ProjectSection({
  onBackToAbout,
}: {
  onBackToAbout: () => void;
}) {
  const [preview, setPreview] = useState<{
    src: string;
    alt: string;
    x: number;
    y: number;
  } | null>(null);
  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const image = (event.target as HTMLElement).closest("img");
    if (!(image instanceof HTMLImageElement)) {
      setPreview(null);
      return;
    } 
    setPreview({
      src: image.src,
      alt: image.alt || "Project preview",
      x: event.clientX,
      y: event.clientY,
    });
  };
  return (
    <div className="mx-auto max-w-6xl">
      <div
        className="grid grid-cols-1 gap-6 md:grid-cols-2"
        onMouseMove={handleMove}
        onMouseLeave={() => setPreview(null)}
      >
        {projects.map(([src, alt, title, description, year, targetId]) => (
          <div
            key={title}
            className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all hover:border-[#3FA9C9]/50"
          >
            <div className="mb-4 flex aspect-video items-center justify-center overflow-hidden rounded-lg bg-black/20 p-2">
              <button
                type="button"
                onClick={() => {
                  onBackToAbout();
                  window.setTimeout(
                    () =>
                      document
                        .getElementById(targetId)
                        ?.scrollIntoView({
                          behavior: "smooth",
                          block: "center",
                        }),
                    120,
                  );
                }}
                className="block h-full w-full"
              >
                <img
                  src={src}
                  alt={alt}
                  className="h-full w-full object-contain transition-transform duration-300 hover:scale-[1.02]"
                />
              </button>
            </div>
            <h3 className="mb-2 text-xl font-semibold text-white">{title}</h3>
            <p className="mb-2 text-neutral-300">{description}</p>
            <div className="mt-3 flex items-end justify-between gap-3">
              <p className="text-sm text-neutral-400">{year}</p>
              <div
                className="h-6 w-[120px] translate-y-2 overflow-hidden rounded-sm"
                aria-hidden="true"
              >
                <LogoLoop
                  logos={logos}
                  speed={40}
                  direction="left"
                  logoHeight={14}
                  gap={16}
                  hoverSpeed={0}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
      {preview && (
        <div
          className="pointer-events-none fixed z-[90] hidden md:block"
          style={{
            left: `clamp(16px, ${preview.x - 320}px, calc(100vw - 736px))`,
            top: `clamp(16px, ${preview.y - 170}px, calc(100vh - 340px))`,
          }}
        >
          <div className="relative overflow-hidden rounded-sm border border-white/25 bg-white shadow-[0_24px_65px_rgba(0,0,0,0.48)]">
            <img
              src={preview.src}
              alt={preview.alt}
              className="h-[320px] w-[720px] object-cover"
            />
            <span className="absolute inset-0 flex items-center justify-center">
              <span className="flex h-24 w-24 items-center justify-center rounded-full bg-black/90 text-base text-white">
                View
              </span>
            </span>
          </div>
        </div>
      )}
    </div>
  );
}
