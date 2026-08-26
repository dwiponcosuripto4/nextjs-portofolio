"use client";

import Image from "next/image";
import { Timeline } from "../Timelines/Timeline";

const details = [
  ["Full Name", "Dwiponco Suripto"],
  ["Education", "S1 Teknologi Informasi"],
  ["Pekerjaan", "Fresh Graduate"],
  ["Contact", "6281279306116"],
  ["Hobi", "Jogging, Fishing, Gaming, Badminton"],
  ["Alamat", "Yogyakarta, Indonesia"],
] as const;

const image = (src: string, id?: string) => (
  <img
    src={src}
    id={id}
    alt="Project preview"
    width={500}
    height={500}
    className="h-20 w-full rounded-lg object-cover md:h-44 lg:h-60"
  />
);

const data = [
  {
    title: "2026",
    content: (
      <div>
        <p className="mb-8 text-xs text-neutral-800 md:text-sm dark:text-neutral-200">
          Mengikuti Bootcamp Fullstack Web Programming Fundamental dari Eduwork
          yang berfokus pada pembelajaran dasar pengembangan web dari sisi
          frontend dan backend. Dalam program ini saya mempelajari konsep dasar
          pengembangan web serta mengimplementasikannya melalui proyek pembuatan
          website portofolio pribadi dan website e-commerce sederhana
          menggunakan PHP Native sampai versi yang dikembangkan menggunakan
          Laravel.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {image("/Images/porto.png", "timeline-porto")}
          {image("/Images/e-com.png", "timeline-ecom")}
          {image("/Images/laravel.png")}
          {image("/Images/laravel2.png")}
        </div>
        <p className="mb-8 mt-8 text-xs text-neutral-800 md:text-sm dark:text-neutral-200">
          Saya membuat project pribadi berupa website sistem inventaris
          sederhana menggunakan Laravel 12 yang digunakan untuk mencatat dan
          mengelola barang-barang pribadi.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {image("/Images/inv.png", "timeline-inv")}
        </div>
      </div>
    ),
  },
  {
    title: "2025",
    content: (
      <div>
        <p className="mb-8 text-xs text-neutral-800 md:text-sm dark:text-neutral-200">
          Project skripsi yang merupakan pengembangan lanjutan dari website yang
          sebelumnya dibuat saat kegiatan magang di Dinas Komunikasi dan
          Informatika OKU Timur. Website ini dibangun menggunakan Laravel dengan
          sistem admin untuk mencatat aktivitas pengguna serta memudahkan
          pengelolaan data secara terstruktur.
        </p>
        <div className="grid grid-cols-2 gap-4">
          {image("/Images/skrip (1).png")}
          {image("/Images/skrip (2).png")}
          {image("/Images/skrip (3).png", "timeline-skrip-3")}
          {image("/Images/skrip (4).png", "timeline-skrip-4")}
        </div>
      </div>
    ),
  },
  {
    title: "End 2024",
    content: (
      <div>
        <p className="mb-4 text-xs text-neutral-800 md:text-sm dark:text-neutral-200">
          Mengembangkan website frontend informasi kost sebagai bagian dari
          tugas akademik capstone yang dikerjakan secara tim menggunakan
          Laravel, Google Maps, dan tombol kontak WhatsApp.
        </p>
        <a
          href="https://kost-oemahputriumy1.rf.gd/"
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-blue-500 underline md:text-sm"
        >
          https://kost-oemahputriumy1.rf.gd/
        </a>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {image("/Images/kos.png", "timeline-kos")}
        </div>
      </div>
    ),
  },
  {
    title: "Mid-2024",
    content: (
      <div>
        <p className="mb-4 text-xs text-neutral-800 md:text-sm dark:text-neutral-200">
          Mengembangkan aplikasi web selama magang di Dinas Komunikasi dan
          Informatika OKU Timur dengan framework Laravel dan arsitektur MVC,
          termasuk database, CRUD, backend, frontend, dan redesain tampilan.
        </p>
        <div className="mt-4 grid grid-cols-2 gap-4">
          {image("/Images/skrip (1).png")}
          {image("/Images/skrip (4).png")}
          {image("/Images/magang1.jpg")}
          {image("/Images/magang2.jpg")}
        </div>
      </div>
    ),
  },
];

export default function AboutSection() {
  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-12 flex flex-col items-center">
        <div className="relative mb-6 h-48 w-48">
          <Image
            src="/Images/profile.jpg"
            alt="Dwiponco Suripto"
            fill
            className="rounded-full border-4 border-[#3FA9C9] object-cover object-top shadow-xl"
            priority
          />
        </div>
        <h2 className="mb-2 text-3xl font-bold text-white md:text-4xl">
          Dwiponco Suripto
        </h2>
        <p className="mb-4 text-xl text-[#3FA9C9]">Full Stack Developer</p>
        <p className="max-w-2xl text-center text-neutral-200">
          Fresh Graduate IT Universitas Muhammadiyah Yogyakarta dengan jurusan
          Teknologi Informasi yang memiliki minat pada pengembangan web baik di
          sisi front-end maupun back-end.
        </p>
      </div>
      <div className="mb-14 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        {details.map(([title, value]) => (
          <div
            key={title}
            className="flex h-[130px] flex-col justify-center rounded-lg border border-white/20 bg-white/5 p-4 text-center backdrop-blur md:h-[140px]"
          >
            <h4 className="mb-1 text-lg font-bold text-white md:text-xl">
              {title}
            </h4>
            <p className="break-words text-sm leading-snug text-neutral-200 md:text-base">
              {value}
            </p>
          </div>
        ))}
      </div>
      <Timeline data={data} />
    </div>
  );
}
