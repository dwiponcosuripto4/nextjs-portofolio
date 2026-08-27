"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import AnimatedContent from "./components/AnimatedContent/AnimatedContent";
import BlurText from "./components/BlurText/BlurText";
import GradientText from "./components/GradientText/GradientText";
import Lanyard from "./components/Lanyard/Lanyard";
import RotatingText from "./components/RotatingText/RotatingText";
import SplitText from "./components/SplitText/SplitText";
import AboutSection from "./components/Sections/AboutSection";
import CertificateSection from "./components/Sections/CertificateSection";
import ContactSection from "./components/Sections/ContactSection";
import ProjectSection from "./components/Sections/ProjectSection";
import StackSection from "./components/Sections/StackSection";

const GooeyNav = dynamic(() => import("./components/GooeyNav/GooeyNav"), {
  ssr: false,
});
const items = ["Stack", "Project", "About", "Certificate", "Contact"].map(
  (label) => ({ label, href: `#${label.toLowerCase()}` }),
);

export default function Home() {
  const [activeSection, setActiveSection] = useState("About");
  const activeNavIndex = items.findIndex(
    (item) => item.label === activeSection,
  );
  const showContent = () =>
    document
      .getElementById("active-section-content")
      ?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <div className="min-h-screen overflow-x-hidden">
      <div className="container mx-auto min-h-screen px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-2 sm:gap-4 lg:grid-cols-12 lg:gap-0">
          <div className="relative h-[48vh] touch-none sm:h-[46vh] lg:col-span-6 lg:h-screen">
            <Lanyard position={[0, 0, 10]} gravity={[0, -40, 0]} />
          </div>
          <div className="lg:col-span-6">
            <div className="flex h-full items-center py-0 sm:py-4 lg:py-0">
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
                  <div className="flex flex-wrap items-center gap-2 max-sm:flex-nowrap max-sm:gap-1">
                    <h1 className="text-lg font-bold text-white max-sm:whitespace-nowrap max-sm:text-base sm:text-xl md:text-2xl">
                      I&apos;m Ready For Job
                    </h1>
                    <RotatingText
                      texts={["Web Development", "Web Programing"]}
                      mainClassName="inline-flex w-[10rem] shrink-0 flex-nowrap justify-center overflow-hidden rounded-lg bg-[#47bbde] px-1.5 py-0.5 text-base font-bold text-white max-sm:text-sm sm:w-auto sm:px-2 sm:py-1 sm:text-xl md:px-3 md:text-2xl"
                      staggerFrom="last"
                      initial={{ y: "100%" }}
                      animate={{ y: 0 }}
                      exit={{ y: "-120%" }}
                      staggerDuration={0.025}
                      splitLevelClassName="overflow-hidden pb-0.5 sm:pb-1"
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
                    className="text-start text-3xl font-semibold max-[366px]:whitespace-nowrap max-[366px]:text-[1.65rem] sm:text-4xl md:text-5xl lg:text-6xl"
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
                    className="text-start text-3xl font-semibold text-[#3FA9C9] max-[366px]:whitespace-nowrap max-[366px]:text-[1.65rem] sm:text-4xl md:text-5xl lg:text-6xl"
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
                  className="mb-4 text-sm sm:mb-6 sm:text-base md:mb-8 md:text-lg lg:text-xl"
                />
                <div className="flex flex-wrap items-center gap-3 max-[366px]:flex-nowrap max-[366px]:gap-1">
                  <button
                    type="button"
                    onClick={showContent}
                    className="shrink-0 rounded-lg whitespace-nowrap focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3FA9C9]"
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
                      className="rounded-lg border px-4 py-3 text-sm sm:px-6 sm:py-4 sm:text-base md:px-8 md:py-6"
                    >
                      Pelajari Lebih Lanjut
                    </GradientText>
                  </button>
                  <a
                    href="/cv-dwiponco-suripto.pdf"
                    download
                    className="inline-flex shrink-0 items-center justify-center rounded-lg whitespace-nowrap border border-[#3FA9C9]/60 bg-[#3FA9C9]/15 px-4 py-3 text-sm font-semibold text-white transition-all hover:bg-[#3FA9C9]/30 sm:px-6 sm:py-2 sm:text-base md:px-8 md:py-6"
                  >
                    Download CV
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center justify-center py-1">
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
          onItemClick={setActiveSection}
        />
      </div>
      <div
        id="active-section-content"
        className="px-4 pb-4 pt-8 sm:px-6 sm:py-8 lg:px-8"
      >
        {activeSection === "About" && <AboutSection />}
        {activeSection === "Stack" && <StackSection />}
        {activeSection === "Project" && (
          <ProjectSection onBackToAbout={() => setActiveSection("About")} />
        )}
        {activeSection === "Certificate" && <CertificateSection />}
        {activeSection === "Contact" && <ContactSection />}
      </div>
    </div>
  );
}
