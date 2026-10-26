import { ArrowDownRight, ArrowUpRight } from "lucide-react";

const experiences = [
    {
        period: "February 2026 – Present",
        role: "System Engineer",
        company: "Inaveit Systems Technologies Inc.",
        description:
            "Leading Laravel-based web systems development with PHP and MySQL, structuring reusable backend modules, and building jQuery/AJAX-driven interfaces. Implemented API and webhook integrations, automated service workflows, and developed Python-powered scraping and report generation pipelines that extract MySQL data and convert it into Excel-ready exports. Provides L1/L2 support and root directory setup/configuration for application deployments.",
        technologies: [
            "Laravel",
            "PHP",
            "MySQL",
            "Python",
            "jQuery",
            "AJAX",
            "API",
            "Webhooks",
            "Excel Export",
            "Git",
            "Bootstrap"
        ],
        current: true
    },
    {
        period: "April 2025 – January 2026",
        role: "Full Stack Web Developer",
        company: "Exponential Technologies",
        description:
            "Developed and maintained a digital accounting software product. Built backend features using Django and PostgreSQL, integrated REST APIs with Axios, and implemented responsive frontend functionality using jQuery, AJAX, and Bootstrap. Optimized system performance and collaborated with the team to deliver new accounting modules.",
        technologies: [
            "Django",
            "Python",
            "PostgreSQL",
            "JavaScript",
            "jQuery",
            "AJAX",
            "Bootstrap",
            "REST API",
            "Axios",
            "Git"
        ],
        current: false
    },
    {
        period: "February 2022 – April 2025",
        role: "IT Assistant",
        company: "Antz Insurance and Services Inc.",
        description:
            "Provided IT support and maintained company infrastructure while developing and automating in-house business processes. Built internal web systems using CodeIgniter and MySQL, developed REST APIs, handled server management, and ensured system reliability, security, and performance.",
        technologies: [
            "PHP",
            "CodeIgniter",
            "MySQL",
            "JavaScript",
            "jQuery",
            "AJAX",
            "Bootstrap",
            "REST API",
            "Axios",
            "Git"
        ],
        current: false
    },
    {
        period: "October 2021 – February 2022",
        role: "Customer Service Representative / Case Manager",
        company: "INFOCOM",
        description:
            "Handled inbound customer calls for a local telecommunications account, resolving service issues, managing customer cases, and ensuring timely follow-ups. Used Excel spreadsheets and internal case management tools to track concerns, document resolutions, and coordinate with internal teams to improve customer satisfaction.",
        technologies: [
            "Microsoft Excel",
            "In-House Case Management Tools",
            "CRM Systems"
        ],
        current: false
    }
];


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
      <div className="experience-footer" data-reveal><p>For the full picture, take a look at my résumé.</p><a className="text-link" href="/Ronnel_Daryl_Rontos_Resume.pdf" download>Download résumé <ArrowUpRight size={16} /></a></div>
    </div>
  </section>
);
