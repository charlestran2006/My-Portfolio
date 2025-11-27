import React from "react";
import ProjectCard from "@/components/portfolio/ProjectCard";

const demoProjects = [
  {
    title: "Portfolio (this)",
    description: "Windows-style portfolio with draggable windows and playful UI.",
    tags: ["Next.js", "React", "Tailwind", "Framer Motion"],
    liveUrl: "https://github.com/charlestran2006",
    githubUrl: "https://github.com/charlestran2006",
  },
  {
    title: "to be added",
    description: "to be added",
    tags: [":P"],
    liveUrl: "https://github.com/charlestran2006",
    githubUrl: "https://github.com/charlestran2006",
  },
];

export default function ProjectsWindow() {
  return (
    <div className="p-4 h-full overflow-auto">
      <h2 className="text-xl font-semibold text-gray-800 mb-4">Projects</h2>
      <div className="grid sm:grid-cols-2 gap-4">
        {demoProjects.map((p, i) => (
          <ProjectCard key={i} project={p} index={i} />
        ))}
      </div>
    </div>
  );
}
