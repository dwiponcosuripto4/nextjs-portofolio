"use client";

import { useState } from "react";

export default function ContactSection() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const update = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) =>
    setForm((current) => ({
      ...current,
      [event.target.name]: event.target.value,
    }));
  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const name = form.name.trim();
    const email = form.email.trim();
    const message = form.message.trim();
    if (!name || !email || !message) return;
    const subject = `Portfolio Contact from ${name}`;
    const body = `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`;
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=dwiponcosuripto7@gmail.com&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
      "_blank",
      "noopener,noreferrer",
    );
    setForm({ name: "", email: "", message: "" });
  };
  return (
    <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
      <div className="space-y-6">
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h3 className="mb-4 text-xl font-semibold text-white">
            Get In Touch
          </h3>
          <div className="space-y-4 text-neutral-200">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#3FA9C9]/20">
                📧
              </div>
              <div className="min-w-0">
                <p className="text-sm text-neutral-400">Email</p>
                <a href="https://mail.google.com/mail/?view=cm&fs=1&to=dwiponcosuripto7@gmail.com" target="_blank" rel="noopener noreferrer" className="break-all font-medium hover:text-[#3FA9C9]">
                  dwiponcosuripto7@gmail.com
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3FA9C9]/20 p-2">
                <img src="/Images/icons/social.png" alt="Social Icon" className="h-full w-full object-contain" />
              </div>
              <div>
                <p className="text-sm text-neutral-400">Phone</p>
                <a href="https://wa.me/6285891059752" target="_blank" rel="noopener noreferrer" className="font-medium hover:text-[#3FA9C9]">
                  +62 812 7930 6116
                </a>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#3FA9C9]/20">
                📍
              </div>
              <div>
                <p className="text-sm text-neutral-400">Location</p>
                <p className="font-medium">Yogyakarta, Indonesia</p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
          <h3 className="mb-4 text-xl font-semibold text-white">
            Social Media
          </h3>
          <div className="space-y-3 text-neutral-200">
            <a
              href="https://bit.ly/dwiponcosuripto"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg p-3 transition-all hover:bg-white/5"
            >
              <span className="flex h-8 w-8 shrink-0 items-center justify-center"><img src="/Images/icons/linkedin.png" alt="LinkedIn Icon" className="h-full w-full object-contain" /></span>
              <span className="min-w-0 break-all">https://bit.ly/dwiponcosuripto</span>
            </a>
            <a
              href="https://github.com/dwiponcosuripto4"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg p-3 transition-all hover:bg-white/5"
            >
              <span className="flex h-8 w-8 items-center justify-center"><img src="/Images/icons/github (1).png" alt="GitHub Icon" className="h-full w-full object-contain" /></span>
              <span>dwiponcosuripto4</span>
            </a>
            <a
              href="https://www.instagram.com/dwiponcosuripto/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 rounded-lg p-3 transition-all hover:bg-white/5"
            >
              <span className="flex h-8 w-8 items-center justify-center"><img src="/Images/icons/instagram (1).png" alt="Instagram Icon" className="h-full w-full object-contain" /></span>
              <span>@dwiponcosuripto</span>
            </a>
          </div>
        </div>
      </div>
      <div className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur">
        <h3 className="mb-4 text-xl font-semibold text-white">
          Send a Message
        </h3>
        <form className="space-y-4" onSubmit={submit}>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-300">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={form.name}
              onChange={update}
              required
              placeholder="Your name"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-[#3FA9C9] focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-300">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={update}
              required
              placeholder="your.email@example.com"
              className="w-full rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-[#3FA9C9] focus:outline-none"
            />
          </div>
          <div>
            <label className="mb-2 block text-sm font-medium text-neutral-300">
              Message
            </label>
            <textarea
              rows={5}
              name="message"
              value={form.message}
              onChange={update}
              required
              placeholder="Your message..."
              className="w-full resize-none rounded-lg border border-white/10 bg-white/5 px-4 py-2 text-white focus:border-[#3FA9C9] focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-lg bg-gradient-to-r from-[#3FA9C9] to-[#40ffaa] px-6 py-3 font-semibold text-white hover:opacity-90"
          >
            Send Message
          </button>
        </form>
      </div>
    </div>
  );
}
