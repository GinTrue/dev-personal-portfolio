import { ArrowDownRight, ArrowUpRight } from "lucide-react";
import profile from "@/data/profile.json";

const { experiences } = profile;

export const Experience = () => (
  <section id="experience" className="section-spacing" aria-labelledby="experience-title">
    <div className="page-container">
      <div className="section-label" data-reveal><span>03 / THE JOURNEY</span><span className="section-label-line" /></div>
      <div className="section-heading" data-reveal><div><h2 id="experience-title">Always building.<br /><span className="text-muted">Always learning.</span></h2></div><p>From understanding the problem on the support desk to building the systems that solve it.</p></div>
      <div className="experience-list">
        {experiences.map((experience, index) => (
          <details className="experience-item" key={experience.company} open={experience.current} data-reveal>
            <summary>
              <div className="experience-period"><span className={experience.current ? "timeline-dot current" : "timeline-dot"} /><span>{experience.period}</span>{experience.current && <span className="current-badge">CURRENT</span>}</div>
              <div className="experience-position"><h3>{experience.role}</h3><p>{experience.company}</p></div>
              <span className="experience-toggle"><ArrowDownRight size={22} /><span className="sr-only">Toggle role details</span></span>
            </summary>
            <div className="experience-details"><p>{experience.description}</p><div className="skill-tags">{experience.technologies.map((technology) => <span className="tag" key={technology}>{technology}</span>)}</div><span className="experience-index mono">EXPERIENCE / 0{index + 1}</span></div>
          </details>
        ))}
      </div>
      <div className="experience-footer" data-reveal><p>For the full picture, take a look at my résumé.</p><div className="resume-downloads"><a className="text-link" href="/Ronnel_Daryl_Rontos_Resume.pdf" download>Download PDF <ArrowUpRight size={16} /></a><a className="text-link" href="/Ronnel_Daryl_Rontos_Resume.docx" download>Download Word <ArrowUpRight size={16} /></a></div></div>
    </div>
  </section>
);
