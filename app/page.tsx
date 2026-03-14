"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import Lanyard from "./components/Lanyard/Lanyard";
import RotatingText from "./components/RotatingText/RotatingText";
import SplitText from "./components/SplitText/SplitText";
import BlurText from "./components/BlurText/BlurText";
import AnimatedContent from "./components/AnimatedContent/AnimatedContent";
import GradientText from "./components/GradientText/GradientText";
import { Timeline } from "./components/Timelines/Timeline";
import LogoLoop from "./components/LogoLoop/LogoLoop";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
} from "react-icons/si";

const techLogos = [
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

// Alternative with image sources
const imageLogos = [
  {
    src: "/logos/company1.png",
    alt: "Company 1",
    href: "https://company1.com",
  },
  {
    src: "/logos/company2.png",
    alt: "Company 2",
    href: "https://company2.com",
  },
  {
    src: "/logos/company3.png",
    alt: "Company 3",
    href: "https://company3.com",
  },
];

const GooeyNav = dynamic(() => import("./components/GooeyNav/GooeyNav"), {
  ssr: false,
});

// update with your own items
const items = [
  { label: "Stack", href: "#stack" },
  { label: "Project", href: "#project" },
  { label: "About", href: "#about" },
  { label: "Certificate", href: "#certificate" },
  { label: "Contact", href: "#contact" },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("About");
  const [hoveredProjectImage, setHoveredProjectImage] = useState<{
    src: string;
    alt: string;
    x: number;
    y: number;
  } | null>(null);
  const [certificateLightboxImage, setCertificateLightboxImage] = useState<{
    src: string;
    alt: string;
  } | null>(null);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const aboutDetails = [
    { title: "Full Name", value: "Dwiponco Suripto" },
    { title: "Education", value: "S1 Teknologi Informasi" },
    { title: "Pekerjaan", value: "Fresh Graduate" },
    { title: "Contact", value: "6281279306116" },
    { title: "Hobi", value: "Jogging, Fishing, Gaming, Badminton" },
    { title: "Alamat", value: "Yogyakarta, Indonesia" },
  ];

  type SkillWithLevel = {
    name: string;
    level: 1 | 2 | 3;
  };

  type StackSection =
    | {
        title: string;
        showLevel: true;
        skills: SkillWithLevel[];
      }
    | {
        title: string;
        showLevel: false;
        skills: string[];
      };

  const stackSections: StackSection[] = [
    {
      title: "Front-end",
      showLevel: true,
      skills: [
        { name: "Next.js", level: 3 },
        { name: "Flutter", level: 2 },
        { name: "React.js", level: 1 },
      ],
    },
    {
      title: "Back-end",
      showLevel: true,
      skills: [
        { name: "Laravel", level: 3 },
        { name: "Next.js", level: 1 },
      ],
    },
    {
      title: "Database",
      showLevel: true,
      skills: [
        { name: "MySQL", level: 3 },
        { name: "SQLite", level: 2 },
      ],
    },
    {
      title: "CSS Framework",
      showLevel: false,
      skills: ["Bootstrap", "Tailwind CSS"],
    },
    {
      title: "Tools & Platform",
      showLevel: false,
      skills: ["Git & GitHub", "VS Code", "Figma", "Postman", "Vercel"],
    },
    {
      title: "Others",
      showLevel: false,
      skills: ["Responsive Design", "Version Control", "Problem Solving"],
    },
  ];

  const getSkillStatus = (level: number) => {
    if (level === 3) {
      return "Advanced";
    }

    if (level === 2) {
      return "Intermediate";
    }

    return "Beginner";
  };

  const getSkillStatusClass = (level: number) => {
    if (level === 3) {
      return "border-sky-300/40 bg-sky-400/20 text-sky-200";
    }

    if (level === 2) {
      return "border-emerald-300/40 bg-emerald-400/20 text-emerald-200";
    }

    return "border-gray-300/40 bg-gray-400/20 text-gray-200";
  };

  const getSkillLevelBarClass = (level: number) => {
    if (level === 3) {
      return "bg-sky-400";
    }

    if (level === 2) {
      return "bg-emerald-400";
    }

    return "bg-gray-400";
  };

  const handleNavClick = (label: string) => {
    setActiveSection(label);
  };

  const handleLearnMoreClick = () => {
    const sectionContainer = document.getElementById("active-section-content");
    sectionContainer?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleProjectImageAnchorClick = (targetId: string) => {
    setHoveredProjectImage(null);
    setActiveSection("About");

    window.setTimeout(() => {
      const target = document.getElementById(targetId);
      target?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 120);
  };

  const handleProjectMouseMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const target = event.target as HTMLElement;
    const image = target.closest("img");

    if (!(image instanceof HTMLImageElement)) {
      if (hoveredProjectImage) {
        setHoveredProjectImage(null);
      }
      return;
    }

    setHoveredProjectImage((prev) => {
      if (prev && prev.src === image.src) {
        return {
          ...prev,
          x: event.clientX,
          y: event.clientY,
        };
      }

      return {
        src: image.src,
        alt: image.alt || "Project preview",
        x: event.clientX,
        y: event.clientY,
      };
    });
  };

  const handleProjectMouseLeave = () => {
    setHoveredProjectImage(null);
  };

  const handleCertificateImageClick = (
    event: React.MouseEvent<HTMLDivElement>,
  ) => {
    const target = event.target as HTMLElement;
    const image = target.closest("img");

    if (!(image instanceof HTMLImageElement)) {
      return;
    }

    setCertificateLightboxImage({
      src: image.src,
      alt: image.alt || "Certificate image",
    });
  };

  const handleContactFormChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setContactForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const name = contactForm.name.trim();
    const email = contactForm.email.trim();
    const message = contactForm.message.trim();

    if (!name || !email || !message) {
      return;
    }

    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;

    const gmailComposeUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=dwiponcosuripto7@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

    window.open(gmailComposeUrl, "_blank", "noopener,noreferrer");

    setContactForm({
      name: "",
      email: "",
      message: "",
    });
  };

  useEffect(() => {
    if (activeSection !== "Project") {
      setHoveredProjectImage(null);
    }
  }, [activeSection]);

  useEffect(() => {
    if (!certificateLightboxImage) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setCertificateLightboxImage(null);
      }
    };

    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [certificateLightboxImage]);

  const activeNavIndex = items.findIndex(
    (item) => item.label === activeSection,
  );

  const renderProjectCardMeta = (year: string) => (
    <div className="mt-3 flex items-end justify-between gap-3">
      <p className="text-sm text-neutral-400">{year}</p>
      <div
        className="h-6 w-[120px] overflow-hidden rounded-sm translate-y-2"
        aria-hidden="true"
      >
        <LogoLoop
          logos={techLogos}
          speed={40}
          direction="left"
          logoHeight={14}
          gap={16}
          hoverSpeed={0}
        />
      </div>
    </div>
  );

  const data = [
    {
      title: "2026",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Mengikuti Bootcamp Fullstack Web Programming Fundamental dari
            Eduwork yang berfokus pada pembelajaran dasar pengembangan web dari
            sisi frontend dan backend. Dalam program ini saya mempelajari konsep
            dasar pengembangan web serta mengimplementasikannya melalui proyek
            pembuatan website portofolio pribadi dan website e-commerce
            sederhana menggunakan PHP Native.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/Images/porto.png"
              id="timeline-porto"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/Images/e-com.png"
              id="timeline-ecom"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
          <p className="mt-8 mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Saya membuat project pribadi berupa website sistem inventaris
            sederhana menggunakan Laravel 12 yang digunakan untuk mencatat dan
            mengelola barang-barang pribadi. Melalui project ini saya
            mengimplementasikan konsep dasar pengembangan web dengan membangun
            fitur untuk menyimpan, menampilkan, dan mengelola data barang secara
            terstruktur.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/Images/inv.png"
              id="timeline-inv"
              alt="startup template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Project skripsi yang merupakan pengembangan lanjutan dari website
            yang sebelumnya dibuat saat kegiatan magang di Dinas Komunikasi dan
            Informatika OKU Timur.
          </p>
          <p className="mb-8 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Website ini dibangun menggunakan Laravel dengan sistem admin yang
            berfungsi untuk mencatat aktivitas pengguna serta memudahkan
            pengelolaan data secara terstruktur. Melalui sistem ini, admin dapat
            memantau aktivitas user, mengelola data yang masuk, serta memastikan
            proses pengelolaan informasi berjalan lebih terorganisir dan
            efisien.
          </p>
          <div className="grid grid-cols-2 gap-4">
            <img
              src="/Images/skrip (1).png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/Images/skrip (2).png"
              alt="feature template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/Images/skrip (3).png"
              id="timeline-skrip-3"
              alt="bento template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/Images/skrip (4).png"
              id="timeline-skrip-4"
              alt="cards template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "End 2024",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Mengembangkan website frontend informasi kost sebagai bagian dari
            tugas akademik capstone yang dikerjakan secara tim. Dalam project
            ini saya berperan dalam membangun tampilan website yang responsif
            menggunakan Laravel, mengimplementasikan sistem routing untuk
            navigasi halaman, serta mengintegrasikan fitur Google Maps dan
            tombol kontak WhatsApp agar calon penyewa dapat dengan mudah
            menemukan lokasi dan menghubungi pemilik kost. Website kemudian
            dideploy ke hosting sehingga dapat diakses secara publik.
          </p>
          <a
            href="https://kost-oemahputriumy1.rf.gd/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-normal text-blue-500 underline md:text-sm dark:text-blue-400"
          >
            https://kost-oemahputriumy1.rf.gd/
          </a>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <img
              src="/Images/kos.png"
              id="timeline-kos"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
    {
      title: "Mid-2024",
      content: (
        <div>
          <p className="mb-4 text-xs font-normal text-neutral-800 md:text-sm dark:text-neutral-200">
            Mengembangkan aplikasi web selama magang di Dinas Komunikasi dan
            Informatika OKU Timur dengan menggunakan framework Laravel dan
            arsitektur MVC. Dalam project ini saya terlibat dalam pembuatan
            serta pengelolaan database, pengembangan fitur CRUD untuk
            pengelolaan konten aplikasi, serta pengembangan backend dan frontend
            framework Laravel secara terintegrasi. Selain itu, saya juga
            melakukan perbaikan dan redesain tampilan aplikasi untuk
            meningkatkan kenyamanan penggunaan.
          </p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <img
              src="/Images/skrip (1).png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/Images/skrip (4).png"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/Images/magang1.jpg"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
            <img
              src="/Images/magang2.jpg"
              alt="hero template"
              width={500}
              height={500}
              className="h-20 w-full rounded-lg object-cover shadow-[0_0_24px_rgba(34,_42,_53,_0.06),_0_1px_1px_rgba(0,_0,_0,_0.05),_0_0_0_1px_rgba(34,_42,_53,_0.04),_0_0_4px_rgba(34,_42,_53,_0.08),_0_16px_68px_rgba(47,_48,_55,_0.05),_0_1px_0_rgba(255,_255,_255,_0.1)_inset] md:h-44 lg:h-60"
            />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="container mx-auto min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-2 sm:gap-4 lg:gap-0">
          <div className="lg:col-span-6 relative h-[48vh] sm:h-[46vh] lg:h-screen touch-none">
            <Lanyard position={[0, 0, 12]} gravity={[0, -40, 0]} />
          </div>
          <div className="lg:col-span-6">
            <div className="flex items-center h-full py-0 sm:py-4 lg:py-0">
              <div className="flex flex-col gap-4 sm:gap-6">
                <AnimatedContent
                  distance={150}
                  direction="horizontal"
                  reverse={false}
                  config={{ tension: 80, friction: 20 }}
                  initialOpacity={0.2}
                  animateOpacity
                  scale={1.1}
                  threshold={0.2}
                >
                  <div className="flex flex-wrap items-center gap-2">
                    <h1 className="text-lg sm:text-xl md:text-2xl text-white font-bold">
                      I'm Ready For Job
                    </h1>
                    <RotatingText
                      texts={["Web Development", "Web Programing"]}
                      mainClassName="px-1.5 sm:px-2 md:px-3 bg-[#47bbde] text-white overflow-hidden py-0.5 sm:py-1 justify-center rounded-lg text-base sm:text-xl md:text-2xl font-bold inline-flex whitespace-nowrap flex-nowrap transition-all"
                      staggerFrom={"last"}
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1 md:pb-1"
                      transition={{
                        type: "spring",
                        damping: 30,
                        stiffness: 400,
                      }}
                      rotationInterval={4000}
                    />
                  </div>
                </AnimatedContent>
                <div className="flex flex-col items-start">
                  <SplitText
                    text="I'm Dwiponco Suripto"
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-start"
                    delay={50}
                    animationFrom={{
                      opacity: 0,
                      transform: "translate3d(0,50px,0)",
                    }}
                    animationTo={{
                      opacity: 1,
                      transform: "translate3d(0,0,0)",
                    }}
                    threshold={0.2}
                    rootMargin="-50px"
                  />
                  <SplitText
                    text="Full Stack Developer"
                    className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-semibold text-start text-[#3FA9C9]"
                    delay={75}
                    animationFrom={{
                      opacity: 0,
                      transform: "translate3d(0,50px,0)",
                    }}
                    animationTo={{
                      opacity: 1,
                      transform: "translate3d(0,0,0)",
                    }}
                    threshold={0.2}
                    rootMargin="-50px"
                  />
                </div>
                <BlurText
                  text="Lulusan baru dari Universitas Muhammadiyah Yogyakarta dengan jurusan Teknologi Informasi. Memiliki minat dalam mengembangkan solusi web yang inovatif serta selalu bersemangat untuk mempelajari teknologi baru."
                  delay={75}
                  animateBy="words"
                  direction="top"
                  className="text-sm sm:text-base md:text-lg lg:text-xl mb-4 sm:mb-6 md:mb-8"
                />
                <div className="flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={handleLearnMoreClick}
                    className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3FA9C9] rounded-lg"
                  >
                    <GradientText
                      colors={[
                        "#40ffaa",
                        "#3FA9C9",
                        "#40ffaa",
                        "#3FA9C9",
                        "#40ffaa",
                      ]}
                      animationSpeed={3}
                      showBorder={false}
                      className="px-4 py-3 sm:px-6 sm:py-4 md:px-8 md:py-6 rounded-lg border text-sm sm:text-base"
                    >
                      Pelajari Lebih Lanjut
                    </GradientText>
                  </button>
                  <a
                    href="/cv-dwiponco-suripto.pdf"
                    download
                    className="inline-flex items-center justify-center rounded-lg border border-[#3FA9C9]/60 bg-[#3FA9C9]/15 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#3FA9C9]/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3FA9C9] sm:px-6 sm:py-2 md:px-8 md:py-6 sm:text-base"
                  >
                    Download CV
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center py-1">
        <GooeyNav
          items={items}
          particleCount={1}
          particleDistances={[90, 10]}
          particleR={0}
          initialActiveIndex={2}
          activeIndex={activeNavIndex >= 0 ? activeNavIndex : 2}
          animationTime={600}
          timeVariance={0}
          colors={[1, 2, 3, 1, 2, 3, 1, 4]}
          onItemClick={handleNavClick}
        />
      </div>

      {/* Content Sections */}
      <div
        id="active-section-content"
        className="px-4 sm:px-6 lg:px-8 pt-8 pb-4 sm:py-8"
      >
        {activeSection === "About" && (
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col items-center mb-12">
              <div className="relative w-48 h-48 mb-6">
                <Image
                  src="/Images/profile.jpg"
                  alt="Dwiponco Suripto"
                  fill
                  className="rounded-full object-cover object-top border-4 border-[#3FA9C9] shadow-xl"
                  priority
                />
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-2">
                Dwiponco Suripto
              </h2>
              <p className="text-xl text-[#3FA9C9] mb-4">
                Full Stack Developer
              </p>
              <p className="text-center text-neutral-200 max-w-2xl">
                Fresh Graduate IT Universitas Muhammadiyah Yogyakarta dengan
                jurusan Teknologi Informasi yang memiliki minat pada
                pengembangan web baik di sisi front-end maupun back-end. Saya
                memiliki pengalaman mengerjakan berbagai proyek akademik yang
                melibatkan analisis sistem, perancangan UI, serta pengembangan
                website, dan saya memiliki semangat untuk terus belajar serta
                berkembang secara profesional.
              </p>
            </div>
            <div className="mb-14">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 items-stretch">
                {aboutDetails.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-lg border border-white/20 bg-white/5 backdrop-blur p-4 text-center h-[130px] md:h-[140px] flex flex-col justify-center"
                  >
                    <h4 className="text-lg md:text-xl font-bold text-white mb-1">
                      {item.title}
                    </h4>
                    <p className="text-sm md:text-base leading-snug text-neutral-200 break-words">
                      {item.value}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            <Timeline data={data} />
          </div>
        )}

        {activeSection === "Stack" && (
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {stackSections.map((section) => (
                <div
                  key={section.title}
                  className="p-6 bg-white/5 rounded-xl backdrop-blur border border-white/10"
                >
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    {section.title}
                  </h3>
                  {section.showLevel ? (
                    <ul className="space-y-4 text-neutral-200">
                      {section.skills.map((skill) => (
                        <li key={skill.name}>
                          <div className="flex items-center justify-between gap-3">
                            <span>{skill.name}</span>
                            <span
                              className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${getSkillStatusClass(skill.level)}`}
                            >
                              {getSkillStatus(skill.level)}
                            </span>
                          </div>
                          <div className="mt-2 flex gap-1.5" aria-hidden="true">
                            {[1, 2, 3].map((levelIndex) => (
                              <span
                                key={levelIndex}
                                className={`h-1.5 flex-1 rounded-full ${
                                  skill.level >= levelIndex
                                    ? getSkillLevelBarClass(skill.level)
                                    : "bg-white/15"
                                }`}
                              />
                            ))}
                          </div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <ul className="space-y-2 text-neutral-200">
                      {section.skills.map((skill) => (
                        <li key={skill}>• {skill}</li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {activeSection === "Project" && (
          <div className="max-w-6xl mx-auto">
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onMouseMove={handleProjectMouseMove}
              onMouseLeave={handleProjectMouseLeave}
            >
              <div className="p-6 bg-white/5 rounded-xl backdrop-blur border border-white/10 hover:border-[#3FA9C9]/50 transition-all">
                <div className="aspect-video rounded-lg mb-4 overflow-hidden bg-black/20 flex items-center justify-center p-2">
                  <a
                    href="#timeline-porto"
                    onClick={(event) => {
                      event.preventDefault();
                      handleProjectImageAnchorClick("timeline-porto");
                    }}
                    className="block h-full w-full"
                  >
                    <img
                      src="/Images/porto.png"
                      alt="Project Porto"
                      className="h-full w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                    />
                  </a>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Bootcamp project : Personal Portfolio Website
                </h3>
                <p className="text-neutral-300 mb-2">
                  Frontend website portofolio menggunakan bootstrap.
                </p>
                {renderProjectCardMeta("2026")}
              </div>
              <div className="p-6 bg-white/5 rounded-xl backdrop-blur border border-white/10 hover:border-[#3FA9C9]/50 transition-all">
                <div className="aspect-video rounded-lg mb-4 overflow-hidden bg-black/20 flex items-center justify-center p-2">
                  <a
                    href="#timeline-ecom"
                    onClick={(event) => {
                      event.preventDefault();
                      handleProjectImageAnchorClick("timeline-ecom");
                    }}
                    className="block h-full w-full"
                  >
                    <img
                      src="/Images/e-com.png"
                      alt="Project E-Commerce"
                      className="h-full w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                    />
                  </a>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Bootcamp project : E-Commerce App
                </h3>
                <p className="text-neutral-300 mb-2">
                  Project e-commerce sederhana menggunakan PHP Native.
                </p>
                {renderProjectCardMeta("2026")}
              </div>
              <div className="p-6 bg-white/5 rounded-xl backdrop-blur border border-white/10 hover:border-[#3FA9C9]/50 transition-all">
                <div className="aspect-video rounded-lg mb-4 overflow-hidden bg-black/20 flex items-center justify-center p-2">
                  <a
                    href="#timeline-inv"
                    onClick={(event) => {
                      event.preventDefault();
                      handleProjectImageAnchorClick("timeline-inv");
                    }}
                    className="block h-full w-full"
                  >
                    <img
                      src="/Images/inv.png"
                      alt="Project Inventaris"
                      className="h-full w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                    />
                  </a>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Personal project : Sistem Inventaris Barang
                </h3>
                <p className="text-neutral-300 mb-2">
                  Website inventaris sederhana berbasis Laravel 12.
                </p>
                {renderProjectCardMeta("2026")}
              </div>
              <div className="p-6 bg-white/5 rounded-xl backdrop-blur border border-white/10 hover:border-[#3FA9C9]/50 transition-all">
                <div className="aspect-video rounded-lg mb-4 overflow-hidden bg-black/20 flex items-center justify-center p-2">
                  <a
                    href="#timeline-skrip-3"
                    onClick={(event) => {
                      event.preventDefault();
                      handleProjectImageAnchorClick("timeline-skrip-3");
                    }}
                    className="block h-full w-full"
                  >
                    <img
                      src="/Images/skrip (3).png"
                      alt="Project Skripsi 3"
                      className="h-full w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                    />
                  </a>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Thesis project : Sistem Admin Pengelolaan Data dan Aktivitas
                  Pengguna
                </h3>
                <p className="text-neutral-300 mb-2">
                  Pengembangan website skripsi berjudul "Implementasi Sistem
                  Admin pada Website Portal Informasi Pemerintah Daerah
                  Kabupaten OKU Timur menggunakan Laravel" berupa fitur admin
                  untuk monitoring aktivitas pengguna dan pengelolaan data.
                </p>
                {renderProjectCardMeta("2025")}
              </div>
              <div className="p-6 bg-white/5 rounded-xl backdrop-blur border border-white/10 hover:border-[#3FA9C9]/50 transition-all">
                <div className="aspect-video rounded-lg mb-4 overflow-hidden bg-black/20 flex items-center justify-center p-2">
                  <a
                    href="#timeline-kos"
                    onClick={(event) => {
                      event.preventDefault();
                      handleProjectImageAnchorClick("timeline-kos");
                    }}
                    className="block h-full w-full"
                  >
                    <img
                      src="/Images/kos.png"
                      alt="Project Website Kost"
                      className="h-full w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                    />
                  </a>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Captone project : Website Informasi Kost
                </h3>
                <p className="text-neutral-300 mb-2">
                  Website frontend informasi kost dengan integrasi maps dan
                  WhatsApp.
                </p>
                {renderProjectCardMeta("2024")}
              </div>
              <div className="p-6 bg-white/5 rounded-xl backdrop-blur border border-white/10 hover:border-[#3FA9C9]/50 transition-all">
                <div className="aspect-video rounded-lg mb-4 overflow-hidden bg-black/20 flex items-center justify-center p-2">
                  <a
                    href="#timeline-skrip-4"
                    onClick={(event) => {
                      event.preventDefault();
                      handleProjectImageAnchorClick("timeline-skrip-4");
                    }}
                    className="block h-full w-full"
                  >
                    <img
                      src="/Images/skrip (4).png"
                      alt="Project Skripsi 4"
                      className="h-full w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                    />
                  </a>
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Internship project : Website Portal Informasi Pemerintah
                  Daerah Kabupaten OKU Timur
                </h3>
                <p className="text-neutral-300 mb-2">
                  Pengembangan website untuk portal informasi pemerintah daerah
                  Kabupaten OKU Timur berbasis laravel.
                </p>
                {renderProjectCardMeta("2025")}
              </div>
            </div>
          </div>
        )}

        {hoveredProjectImage && activeSection === "Project" && (
          <div
            className="pointer-events-none fixed z-[90] hidden md:block"
            style={{
              left: `clamp(16px, ${hoveredProjectImage.x - 320}px, calc(100vw - 736px))`,
              top: `clamp(16px, ${hoveredProjectImage.y - 170}px, calc(100vh - 340px))`,
            }}
          >
            <div className="relative overflow-hidden rounded-sm border border-white/25 bg-white shadow-[0_24px_65px_rgba(0,0,0,0.48)]">
              <img
                src={hoveredProjectImage.src}
                alt={hoveredProjectImage.alt}
                className="h-[320px] w-[720px] object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="flex h-24 w-24 items-center justify-center rounded-full bg-black/90 text-base font-medium tracking-wide text-white shadow-[0_12px_24px_rgba(0,0,0,0.5)]">
                  View
                </span>
              </div>
            </div>
          </div>
        )}

        {activeSection === "Certificate" && (
          <div className="max-w-6xl mx-auto">
            <div
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
              onClick={handleCertificateImageClick}
            >
              <div className="p-6 bg-white/5 rounded-xl backdrop-blur border border-white/10 hover:border-[#3FA9C9]/50 transition-all">
                <div className="aspect-video bg-gradient-to-br from-[#3FA9C9]/20 to-[#40ffaa]/20 rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src="/Images/Sertifikat/bootcamp.jpg"
                    alt="Bootcamp Certificate"
                    className="h-full w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Bootcamp Certificate
                </h3>
                <p className="text-neutral-300 mb-2">Issued by: Eduwork.id</p>
                <p className="text-sm text-neutral-400">Date: 2026</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl backdrop-blur border border-white/10 hover:border-[#3FA9C9]/50 transition-all">
                <div className="aspect-video bg-gradient-to-br from-[#3FA9C9]/20 to-[#40ffaa]/20 rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src="/Images/Sertifikat/bnsp.jpg"
                    alt="BNSP Certificate"
                    className="h-full w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  BNSP Certificate
                </h3>
                <p className="text-neutral-300 mb-2">
                  Issued by: BNSP (Badan Nasional Sertifikasi Profesi)
                </p>
                <p className="text-sm text-neutral-400">Date: 2025</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl backdrop-blur border border-white/10 hover:border-[#3FA9C9]/50 transition-all">
                <div className="aspect-video bg-gradient-to-br from-[#3FA9C9]/20 to-[#40ffaa]/20 rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src="/Images/Sertifikat/train5.jpg"
                    alt="Course Certificate"
                    className="h-full w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Basic GIT Certificate
                </h3>
                <p className="text-neutral-300 mb-2">Issued by: CODEPOLITAN</p>
                <p className="text-sm text-neutral-400">Date: 2025</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl backdrop-blur border border-white/10 hover:border-[#3FA9C9]/50 transition-all">
                <div className="aspect-video bg-gradient-to-br from-[#3FA9C9]/20 to-[#40ffaa]/20 rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src="/Images/Sertifikat/train4.jpg"
                    alt="Course Certificate"
                    className="h-full w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Use Terminal or CMD for Development Certificate
                </h3>
                <p className="text-neutral-300 mb-2">Issued by: CODEPOLITAN</p>
                <p className="text-sm text-neutral-400">Date: 2025</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl backdrop-blur border border-white/10 hover:border-[#3FA9C9]/50 transition-all">
                <div className="aspect-video bg-gradient-to-br from-[#3FA9C9]/20 to-[#40ffaa]/20 rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src="/Images/Sertifikat/train3.jpg"
                    alt="Course Certificate"
                    className="h-full w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Text Editor for Beginners Certificate
                </h3>
                <p className="text-neutral-300 mb-2">Issued by: CODEPOLITAN</p>
                <p className="text-sm text-neutral-400">Date: 2025</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl backdrop-blur border border-white/10 hover:border-[#3FA9C9]/50 transition-all">
                <div className="aspect-video bg-gradient-to-br from-[#3FA9C9]/20 to-[#40ffaa]/20 rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src="/Images/Sertifikat/train2.jpg"
                    alt="Course Certificate"
                    className="h-full w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Basic Algorithms and Programming Certificate
                </h3>
                <p className="text-neutral-300 mb-2">Issued by: CODEPOLITAN</p>
                <p className="text-sm text-neutral-400">Date: 2025</p>
              </div>
              <div className="p-6 bg-white/5 rounded-xl backdrop-blur border border-white/10 hover:border-[#3FA9C9]/50 transition-all">
                <div className="aspect-video bg-gradient-to-br from-[#3FA9C9]/20 to-[#40ffaa]/20 rounded-lg mb-4 flex items-center justify-center">
                  <img
                    src="/Images/Sertifikat/train1.jpg"
                    alt="Course Certificate"
                    className="h-full w-full object-contain cursor-pointer transition-transform duration-300 hover:scale-[1.02]"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">
                  Computer Programming Certificate
                </h3>
                <p className="text-neutral-300 mb-2">Issued by: CODEPOLITAN</p>
                <p className="text-sm text-neutral-400">Date: 2025</p>
              </div>
            </div>
          </div>
        )}

        {certificateLightboxImage && (
          <div
            className="fixed inset-0 z-[120] flex items-center justify-center bg-black/85 px-4 py-8"
            role="dialog"
            aria-modal="true"
            aria-label="Certificate image lightbox"
            onClick={() => setCertificateLightboxImage(null)}
          >
            <button
              type="button"
              onClick={() => setCertificateLightboxImage(null)}
              className="absolute right-4 top-4 rounded-md border border-white/35 bg-black/40 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-black/70"
              aria-label="Close certificate lightbox"
            >
              Close
            </button>
            <div
              className="max-h-[88vh] max-w-[calc(100vw-2rem)] rounded-md border border-white/25 bg-white/95 p-1 shadow-[0_24px_65px_rgba(0,0,0,0.5)] md:max-w-[calc(100vw-4rem)]"
              onClick={(event) => event.stopPropagation()}
            >
              <img
                src={certificateLightboxImage.src}
                alt={certificateLightboxImage.alt}
                className="block h-auto max-h-[calc(88vh-0.5rem)] w-auto max-w-full object-contain"
              />
            </div>
          </div>
        )}

        {activeSection === "Contact" && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div className="p-6 bg-white/5 rounded-xl backdrop-blur border border-white/10">
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    Get In Touch
                  </h3>
                  <div className="space-y-4 text-neutral-200">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#3FA9C9]/20 flex items-center justify-center">
                        📧
                      </div>
                      <div>
                        <p className="text-sm text-neutral-400">Email</p>
                        <a
                          href="https://mail.google.com/mail/?view=cm&fs=1&to=dwiponcosuripto7@gmail.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover:text-[#3FA9C9] transition-colors"
                        >
                          dwiponcosuripto7@gmail.com
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#3FA9C9]/20 flex items-center justify-center p-2">
                        <img
                          src="/Images/icons/social.png"
                          alt="Social Icon"
                          className="h-full w-full object-contain"
                        />
                      </div>
                      <div>
                        <p className="text-sm text-neutral-400">Phone</p>
                        <a
                          href="https://wa.me/6285891059752"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="font-medium hover:text-[#3FA9C9] transition-colors"
                        >
                          +62 858 9105 9752
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#3FA9C9]/20 flex items-center justify-center">
                        📍
                      </div>
                      <div>
                        <p className="text-sm text-neutral-400">Location</p>
                        <p className="font-medium">Yogyakarta, Indonesia</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6 bg-white/5 rounded-xl backdrop-blur border border-white/10">
                  <h3 className="text-xl font-semibold mb-4 text-white">
                    Social Media
                  </h3>
                  <div className="space-y-3">
                    <a
                      href="https://bit.ly/dwiponcosuripto"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all"
                    >
                      <span className="h-8 w-8 flex items-center justify-center">
                        <img
                          src="/Images/icons/linkedin.png"
                          alt="LinkedIn Icon"
                          className="h-full w-full object-contain"
                        />
                      </span>
                      <span className="text-neutral-200">
                        https://bit.ly/dwiponcosuripto
                      </span>
                    </a>
                    <a
                      href="https://github.com/dwiponcosuripto4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all"
                    >
                      <span className="h-8 w-8 flex items-center justify-center">
                        <img
                          src="/Images/icons/github (1).png"
                          alt="GitHub Icon"
                          className="h-full w-full object-contain"
                        />
                      </span>
                      <span className="text-neutral-200">dwiponcosuripto4</span>
                    </a>
                    <a
                      href="https://www.instagram.com/dwiponcosuripto/"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 p-3 rounded-lg hover:bg-white/5 transition-all"
                    >
                      <span className="h-8 w-8 flex items-center justify-center">
                        <img
                          src="/Images/icons/instagram (1).png"
                          alt="Instagram Icon"
                          className="h-full w-full object-contain"
                        />
                      </span>
                      <span className="text-neutral-200">@dwiponcosuripto</span>
                    </a>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white/5 rounded-xl backdrop-blur border border-white/10">
                <h3 className="text-xl font-semibold mb-4 text-white">
                  Send a Message
                </h3>
                <form className="space-y-4" onSubmit={handleContactSubmit}>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactFormChange}
                      required
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#3FA9C9] transition-all text-white"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactFormChange}
                      required
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#3FA9C9] transition-all text-white"
                      placeholder="your.email@example.com"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-300 mb-2">
                      Message
                    </label>
                    <textarea
                      rows={5}
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactFormChange}
                      required
                      className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:border-[#3FA9C9] transition-all text-white resize-none"
                      placeholder="Your message..."
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-gradient-to-r from-[#3FA9C9] to-[#40ffaa] text-white font-semibold rounded-lg hover:opacity-90 transition-all"
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
