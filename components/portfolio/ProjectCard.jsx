import React, { useState } from "react";
import { motion } from "framer-motion";
import { ExternalLink, Github, Sparkles } from "lucide-react";

export default function ProjectCard({ project, index }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="p-4 border rounded-lg bg-white shadow hover:shadow-lg transition cursor-pointer"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      <div className="flex items-center gap-2 mb-2">
        <Sparkles className="w-5 h-5 text-yellow-500" />
        <h3 className="text-lg font-semibold text-gray-800">
          {project.title}
        </h3>
      </div>

      <p className="text-sm text-gray-600 mb-4">{project.description}</p>

      <div className="flex flex-wrap gap-2 mb-4">
        {project.tags?.map((tag, i) => (
          <span
            key={i}
            className="px-2 py-1 bg-gray-200 text-gray-700 text-xs rounded"
          >
            {tag}
          </span>
        ))}
      </div>

      <div className="flex gap-3">
        {project.liveUrl && (
          <a
            href={project.liveUrl}
            target="_blank"
            className="flex items-center gap-1 text-sm text-blue-600 hover:text-blue-800"
          >
            <ExternalLink className="w-4 h-4" /> Live
          </a>
        )}

        {project.githubUrl && (
          <a
            href={project.githubUrl}
            target="_blank"
            className="flex items-center gap-1 text-sm text-gray-800 hover:text-black"
          >
            <Github className="w-4 h-4" /> Code
          </a>
        )}
      </div>
    </motion.div>
  );
}
