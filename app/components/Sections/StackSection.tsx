"use client";

const sections = [
  {
    title: "Front-end",
    skills: [
      ["Next.js", 3],
      ["Flutter", 2],
      ["React.js", 1],
    ],
  },
  {
    title: "Back-end",
    skills: [
      ["Laravel", 3],
      ["Next.js", 1],
    ],
  },
  {
    title: "Database",
    skills: [
      ["MySQL", 3],
      ["SQLite", 2],
    ],
  },
  {
    title: "CSS Framework",
    skills: [
      ["Bootstrap", 0],
      ["Tailwind CSS", 0],
    ],
  },
  {
    title: "Tools & Platform",
    skills: [
      ["Git & GitHub", 0],
      ["VS Code", 0],
      ["Figma", 0],
      ["Postman", 0],
      ["Vercel", 0],
    ],
  },
  {
    title: "Others",
    skills: [
      ["Responsive Design", 0],
      ["Version Control", 0],
      ["Problem Solving", 0],
    ],
  },
] as const;
const labels = ["", "Beginner", "Intermediate", "Advanced"];
export default function StackSection() {
  return (
    <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
      {sections.map((section) => (
        <div
          key={section.title}
          className="rounded-xl border border-white/10 bg-white/5 p-6 backdrop-blur"
        >
          <h3 className="mb-4 text-xl font-semibold text-white">
            {section.title}
          </h3>
          <ul className="space-y-4 text-neutral-200">
            {section.skills.map(([name, level]) => (
              <li key={name}>
                <div className="flex items-center justify-between gap-3">
                  <span>{level === 0 && "• "}{name}</span>
                  {level > 0 && (
                    <span
                      className={`rounded-full border px-2 py-0.5 text-[11px] ${level === 3 ? "border-sky-300/40 bg-sky-400/20 text-sky-200" : level === 2 ? "border-emerald-300/40 bg-emerald-400/20 text-emerald-200" : "border-gray-300/40 bg-gray-400/20 text-gray-200"}`}
                    >
                      {labels[level]}
                    </span>
                  )}
                </div>
                {level > 0 && (
                  <div className="mt-2 flex gap-1.5">
                    {[1, 2, 3].map((index) => (
                      <span
                        key={index}
                        className={`h-1.5 flex-1 rounded-full ${level >= index ? (level === 3 ? "bg-sky-400" : level === 2 ? "bg-emerald-400" : "bg-gray-400") : "bg-white/15"}`}
                      />
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
