import React from "react";

export default function AboutMeWindow() {
  return (
    <div className="p-4 h-full overflow-auto text-gray-700">
      <h2 className="text-xl font-semibold mb-2">About Me</h2>
      <p className="text-sm leading-relaxed">
        Hello! I'm Charles Tran! I'm a student at Drexel University studying Computer Science and this is my very first portfolio 
        website built to look like Windows 7! I love creating fun and interactive web experiences that bring a smile to people's faces. 
        This portfolio showcases some of my projects and skills, all wrapped up in a nostalgic Windows 7 theme. 

        Kudos to you if you recognize the references!
      </p>
      <ul className="mt-4 text-sm list-disc pl-5 space-y-1">
        <h>Built with VSCode using modern web technologies</h>
        <li>React + Next.js + Tailwind</li>
        <li>Framer Motion animations</li>
        <li>Over 9000 hours of tutorials</li>
      </ul>
    </div>
  );
}
