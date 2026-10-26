import { useState } from "react";
import { ArrowUpRight, Braces, Database, Layers, Workflow } from "lucide-react";

const skillGroups = {
  Backend: ["PHP", "Laravel", "Django", "CodeIgniter", "Python", "REST APIs", "Webhooks"],
  Frontend: ["JavaScript", "HTML5", "CSS3", "Bootstrap", "Tailwind CSS", "jQuery", "AJAX", "Axios"],
  "Data & tools": ["MySQL", "PostgreSQL", "Git", "GitHub", "Excel exports", "Server management"],
};
const capabilities = [
  { icon: Braces, title: "Web development", text: "Practical interfaces backed by maintainable, reliable code." },
  { icon: Workflow, title: "Workflow automation", text: "Connecting tools and simplifying the work between them." },
  { icon: Database, title: "Business systems", text: "ERP, accounting, and internal tools built around real needs." },
  { icon: Layers, title: "End-to-end thinking", text: "An IT support background. A developer’s eye for the bigger picture." },
];

export const About = () => {
  const [activeGroup, setActiveGroup] = useState("Backend");
  const handleTabKey = (event) => {
    const keys = Object.keys(skillGroups);
    const current = keys.indexOf(activeGroup);
    let next;
    if (event.key === "ArrowRight") next = (current + 1) % keys.length;
    else if (event.key === "ArrowLeft") next = (current - 1 + keys.length) % keys.length;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = keys.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      setActiveGroup(keys[next]);
      document.getElementById(`skill-tab-${next}`)?.focus();
    }
  };

  return (
    <section id="about" className="section-spacing" aria-labelledby="about-title">
      <div className="page-container">
        <div className="section-label" data-reveal><span>01 / ABOUT ME</span><span className="section-label-line" /></div>
        <div className="about-layout">
          <div data-reveal>
            <h2 id="about-title">A developer’s mindset.<br /><span className="text-muted">A problem-solver’s instinct.</span></h2>
            <p className="body-copy about-intro">Good software starts with understanding the people who use it.</p>
            <p className="body-copy">My journey from IT support to software development taught me to look beyond the screen. I build and maintain web systems that help teams manage their operations, connect their tools, and get things done.</p>
            <p className="body-copy">Today, I work with Laravel, PHP, Python, and modern web tools to turn everyday challenges into dependable solutions. There’s always something new to learn, and that’s my favorite part.</p>
            <a href="#experience" className="text-link">Get to know my journey <ArrowUpRight size={16} /></a>
          </div>
          <div className="about-details" data-reveal>
            <div className="capability-grid">{capabilities.map(({ icon: Icon, title, text }) => <div className="capability" key={title}><Icon size={22} strokeWidth={1.5} /><h3>{title}</h3><p>{text}</p></div>)}</div>
            <div className="skills-panel">
              <div className="skills-heading"><span className="eyebrow">THE TOOLS BEHIND THE WORK</span><span className="mono">&lt;/&gt;</span></div>
              <div className="skill-tabs" role="tablist" aria-label="Technology categories" onKeyDown={handleTabKey}>{Object.keys(skillGroups).map((group, index) => <button id={`skill-tab-${index}`} key={group} role="tab" aria-selected={activeGroup === group} aria-controls="skill-panel" tabIndex={activeGroup === group ? 0 : -1} onClick={() => setActiveGroup(group)}>{group}</button>)}</div>
              <div id="skill-panel" role="tabpanel" tabIndex={0} aria-labelledby={`skill-tab-${Object.keys(skillGroups).indexOf(activeGroup)}`} className="skill-tags" key={activeGroup}>{skillGroups[activeGroup].map((skill) => <span className="tag" key={skill}>{skill}</span>)}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
